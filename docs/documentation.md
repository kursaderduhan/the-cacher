## 📚 Documentation

### Storage Strategies

#### Memory Storage (Default)

## ✨ Features

- 🚀 Multiple storage strategies (Memory, Redis)
- 📝 Full TypeScript support
- 🎯 Event system for monitoring
- 📊 Comprehensive statistics
- 🔄 Batch operations
- ⏰ TTL support
- 🔌 Extensible storage interface

```typescript
const cache = new CacheManager<string>();
```

#### Redis Storage

```typescript
const cache = new CacheManager<string>({
  storage: "redis",
  redisConfig: {
    host: "localhost",
    port: 6379,
    password: "optional",
  },
});
```

### Event System

```typescript
// Available events: 'set', 'get', 'expired', 'evict'
cache.events.on("get", ({ key, hit }) => {
  console.log(`Cache ${hit ? "hit" : "miss"} for ${key}`);
});
```

### Statistics

```typescript
const stats = await cache.getStats();
console.log(stats);
// {
//   hits: 10,
//   misses: 2,
//   size: 5,
//   hitRate: 0.833
// }
```

### Batch Operations

```typescript
await cache
  .batch()
  .set("user:1", userData1)
  .set("user:2", userData2)
  .delete("user:3")
  .execute();
```

## 🔧 Configuration Options

```typescript
interface CacheOptions {
  maxSize?: number; // Maximum items in cache
  storage?: "memory" | "redis";
  redisConfig?: {
    host: string;
    port: number;
    password?: string;
  };
}
```
