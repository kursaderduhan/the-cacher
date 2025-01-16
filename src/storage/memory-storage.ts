import { StorageStrategy, CacheItem } from '../types'

export class MemoryStorage<T> implements StorageStrategy<T> {
  private storage = new Map<string, CacheItem<T>>()

  async get (key: string): Promise<CacheItem<T> | null> {
    return this.storage.get(key) || null
  }

  async set (key: string, item: CacheItem<T>): Promise<void> {
    this.storage.set(key, item)
  }

  async delete (key: string): Promise<boolean> {
    return this.storage.delete(key)
  }

  async clear (): Promise<void> {
    this.storage.clear()
  }

  async size (): Promise<number> {
    return this.storage.size
  }

  async keys (): Promise<string[]> {
    return Array.from(this.storage.keys())
  }
}
