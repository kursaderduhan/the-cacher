## 🔍 Extra Infos

### Storage Options

#### In-Memory Storage (Default)

- Fastest possible performance as data is stored in application memory
- Perfect for single-server applications
- No additional setup or dependencies required
- Automatically included and ready to use
- Memory usage is limited by your application's available RAM

#### Redis Storage (Optional)

- Distributed caching support for multi-server applications
- Data persistence across application restarts
- Built-in pub/sub capabilities for real-time updates
- Scalable solution for larger applications
- **Completely optional** - Redis integration is only activated if you choose to use it

### Performance Comparisons

| Feature      | Memory Storage   | Redis Storage      |
| ------------ | ---------------- | ------------------ |
| Read Speed   | Fastest (~0.1ms) | Fast (~1-2ms)      |
| Write Speed  | Fastest (~0.1ms) | Fast (~1-2ms)      |
| Scalability  | Single Server    | Multiple Servers   |
| Persistence  | No               | Yes                |
| Memory Limit | Application RAM  | Redis Server Limit |

### Cache Strategies

#### Time-based Expiration (TTL)

```typescript
// Items automatically expire after the specified time
await cache.set('key', value, 3600000); // 1 hour TTL

### Manual Control
``
// Store without expiration
await cache.set('key', value);

// Manual deletion when needed
await cache.delete('key');
``
### Batch Operations for Better Performance

// Multiple operations in a single batch
await cache.batch()
  .set('user:1', userData1)
  .set('user:2', userData2)
  .set('user:3', userData3)
  .execute();

```

# ❓ Frequently Asked Questions

## Is Redis Required?

### No, Redis is completely optional. The package works perfectly fine with just in-memory storage:

// Simple in-memory usage without Redis

`const cache = new CacheManager();`

# When Should I Use Redis Storage?

## Consider using Redis when you:

<ul>
  <li>Have multiple server instances</li>
  <li>Need data persistence</li>
  <li>Require larger storage capacity</li>
  <li>Want better scalability</li>
</ul>

## Is Redis Free?

### Redis itself is open-source and free to use you can:

<ul>
  <li>Run Redis locally (free)</li>
  <li>Self-host on your own servers (infrastructure costs only)</li>
  <li>Third item</li>
  <li>Fourth item</li>
</ul>

### Use managed Redis services (paid, various providers):

<ul>
  <li>Redis Cloud</li>
  <li>AWS ElastiCache</li>
  <li>Azure Cache for Redis</li>
  <li>Google Cloud Memorystore</li>
</ul>

# How to Keep Using In-Memory Storage Only?

## Simply use the default configuration:

`// This uses only in-memory storage
const cache = new CacheManager({
maxSize: 1000 // Optional: set maximum items
});`

# Memory Storage vs Redis Comparison

## Memory Storage Advantages

<ul>
  <li>Zero additional setup</li>
  <li>No external dependencies</li>
  <li>Fastest possible performance</li>
  <li>Perfect for development and small applicationse</li>
</ul>

### Redis Storage Advantages

<ul>
  <li>Data persistence</li>
  <li>Distributed caching</li>
  <li>Better for production and large applications</li>
  <li>Built-in monitoring and analytics</li>
</ul>
