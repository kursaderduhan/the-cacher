## 🌟 Examples

### Basic Cache Usage

```typescript
const cache = new CacheManager<User>();

// Store user data
await cache.set("user:123", userData, 3600000); // 1 hour TTL

// Retrieve user data
const user = await cache.get("user:123");
```

### With Redis and Events

```typescript
const cache = new CacheManager<User>({
  storage: "redis",
  redisConfig: {
    host: "localhost",
    port: 6379,
  },
});

cache.events.on("expired", (key) => {
  logger.info(`Cache item ${key} has expired`);
});

cache.events.on("evict", (key) => {
  logger.info(`Cache item ${key} was evicted`);
});
```
