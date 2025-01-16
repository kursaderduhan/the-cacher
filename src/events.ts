import { EventEmitter } from 'events'

export class CacheEventEmitter extends EventEmitter {
  emitSet (key: string): void {
    this.emit('set', key)
  }

  emitGet (key: string, hit: boolean): void {
    this.emit('get', { key, hit })
  }

  emitExpired (key: string): void {
    this.emit('expired', key)
  }

  emitEvict (key: string): void {
    this.emit('evict', key)
  }
}
