import { CacheOptions, CacheItem, CacheStats, StorageStrategy } from './types'
import { MemoryStorage } from './storage/memory-storage'
import { RedisStorage } from './storage/redis-storage'
import { CacheEventEmitter } from './events'

export class CacheManager<T> {
  private static DEFAULT_MAX_SIZE = 20
  private storage: StorageStrategy<T>
  private maxSize: number
  private stats: CacheStats
  public events: CacheEventEmitter

  constructor (options: CacheOptions = {}) {
    this.maxSize = options.maxSize || CacheManager.DEFAULT_MAX_SIZE
    this.storage = this.initializeStorage(options)
    this.events = new CacheEventEmitter()
    this.stats = {
      hits: 0,
      misses: 0,
      size: 0,
      hitRate: 0
    }
  }

  private initializeStorage (options: CacheOptions): StorageStrategy<T> {
    if (options.storage === 'redis') {
      return new RedisStorage(options.redisConfig)
    }
    return new MemoryStorage()
  }

  private updateStats (hit: boolean): void {
    if (hit) {
      this.stats.hits++
    } else {
      this.stats.misses++
    }
    this.stats.hitRate = this.stats.hits / (this.stats.hits + this.stats.misses)
  }

  async set (key: string, value: T, ttl?: number): Promise<void> {
    const size = await this.storage.size()

    if (size >= this.maxSize) {
      const keys = await this.storage.keys()
      const oldestKey = keys[0]
      await this.delete(oldestKey)
      this.events.emitEvict(oldestKey)
    }

    const item: CacheItem<T> = {
      value,
      expiredAt: ttl ? Date.now() + ttl : null,
      createdAt: Date.now(),
      hits: 0
    }

    await this.storage.set(key, item)
    this.events.emitSet(key)
  }

  async get (key: string): Promise<T | null> {
    const item = await this.storage.get(key)

    if (!item) {
      this.updateStats(false)
      this.events.emitGet(key, false)
      return null
    }

    if (item.expiredAt && item.expiredAt < Date.now()) {
      await this.delete(key)
      this.events.emitExpired(key)
      this.updateStats(false)
      return null
    }

    item.hits++
    await this.storage.set(key, item)
    this.updateStats(true)
    this.events.emitGet(key, true)
    return item.value
  }

  async delete (key: string): Promise<boolean> {
    return this.storage.delete(key)
  }

  async clear (): Promise<void> {
    await this.storage.clear()
    this.stats = {
      hits: 0,
      misses: 0,
      size: 0,
      hitRate: 0
    }
  }

  async getStats (): Promise<CacheStats> {
    const size = await this.storage.size()
    return {
      ...this.stats,
      size
    }
  }

  async batch (): Promise<BatchOperations<T>> {
    return new BatchOperations(this)
  }
}

class BatchOperations<T> {
  private operations: Array<() => Promise<void>> = []
  private cache: CacheManager<T>

  constructor (cache: CacheManager<T>) {
    this.cache = cache
  }

  set (key: string, value: T, ttl?: number): BatchOperations<T> {
    this.operations.push(() => this.cache.set(key, value, ttl))
    return this
  }

  delete (key: string): BatchOperations<T> {
    this.operations.push(() => this.cache.delete(key).then(() => {}))
    return this
  }

  async execute (): Promise<void> {
    await Promise.all(this.operations.map(op => op()))
  }
}

export default CacheManager
