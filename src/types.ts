export interface CacheOptions {
  maxSize?: number
  storage?: 'memory' | 'redis'
  redisConfig?: {
    host: string
    port: number
    password?: string
  }
}

export interface CacheItem<T> {
  value: T
  expiredAt: number | null
  createdAt: number
  hits: number
}

export interface CacheStats {
  hits: number
  misses: number
  size: number
  hitRate: number
}

export interface StorageStrategy<T> {
  get(key: string): Promise<CacheItem<T> | null>
  set(key: string, item: CacheItem<T>): Promise<void>
  delete(key: string): Promise<boolean>
  clear(): Promise<void>
  size(): Promise<number>
  keys(): Promise<string[]>
}
