import Redis from 'ioredis'
import { StorageStrategy, CacheItem, CacheOptions } from '../types'

export class RedisStorage<T> implements StorageStrategy<T> {
  private client: Redis

  constructor (config: CacheOptions['redisConfig']) {
    this.client = new Redis({
      host: config?.host || 'localhost',
      port: config?.port || 6379,
      password: config?.password
    })
  }

  async get (key: string): Promise<CacheItem<T> | null> {
    const data = await this.client.get(key)
    return data ? JSON.parse(data) : null
  }

  async set (key: string, item: CacheItem<T>): Promise<void> {
    await this.client.set(key, JSON.stringify(item))
  }

  async delete (key: string): Promise<boolean> {
    const result = await this.client.del(key)
    return result === 1
  }

  async clear (): Promise<void> {
    await this.client.flushdb()
  }

  async size (): Promise<number> {
    return this.client.dbsize()
  }

  async keys (): Promise<string[]> {
    return this.client.keys('*')
  }
}
