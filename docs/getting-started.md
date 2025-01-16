## 🚀 Installation

```bash
npm install the-cacher
```

or

```bash
yarn add the-cacher
```

## 💡 Quick Start

```typescript
import CacheManager from "the-cacher";

// Create a cache instance
const cache = new CacheManager<string>();

// Basic usage
await cache.set("key", "value", 1000); // 1 second TTL
const value = await cache.get("key");

// Using Redis storage
const redisCache = new CacheManager<string>({
  storage: "redis",
  redisConfig: {
    host: "localhost",
    port: 6379,
  },
});

// Event handling
cache.events.on("expired", (key) => {
  console.log(`Cache item ${key} has expired`);
});

// Batch operations
await cache
  .batch()
  .set("key1", "value1")
  .set("key2", "value2")
  .delete("key3")
  .execute();
```
