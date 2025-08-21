/**
 * Simple in-memory cache service for API responses
 * In production, consider using Redis or similar for distributed caching
 */
interface CacheItem<T = unknown> {
  data: T;
  expiry: number;
}

export class CacheService {
  private cache: Map<string, CacheItem> = new Map();
  private namespace: string;
  private defaultTtl: number;

  constructor(namespace: string, defaultTtl: number = 15 * 60 * 1000) {
    this.namespace = namespace;
    this.defaultTtl = defaultTtl;
  }

  /**
   * Get item from cache
   */
  async get<T>(key: string): Promise<T | null> {
    const fullKey = `${this.namespace}:${key}`;
    const item = this.cache.get(fullKey);
    
    if (!item) {
      return null;
    }

    if (Date.now() > item.expiry) {
      this.cache.delete(fullKey);
      return null;
    }

    return item.data as T;
  }

  /**
   * Set item in cache
   */
  async set<T>(key: string, data: T, ttl?: number): Promise<void> {
    const fullKey = `${this.namespace}:${key}`;
    const expiry = Date.now() + (ttl || this.defaultTtl);
    
    this.cache.set(fullKey, { data, expiry });
  }

  /**
   * Delete item from cache
   */
  async delete(key: string): Promise<void> {
    const fullKey = `${this.namespace}:${key}`;
    this.cache.delete(fullKey);
  }

  /**
   * Clear all items in namespace
   */
  async clear(): Promise<void> {
    const keysToDelete = Array.from(this.cache.keys()).filter(key => 
      key.startsWith(`${this.namespace}:`)
    );
    
    keysToDelete.forEach(key => this.cache.delete(key));
  }

  /**
   * Get cache size for this namespace
   */
  size(): number {
    return Array.from(this.cache.keys()).filter(key => 
      key.startsWith(`${this.namespace}:`)
    ).length;
  }

  /**
   * Clean expired entries
   */
  cleanExpired(): void {
    const now = Date.now();
    const expiredKeys: string[] = [];

    for (const [key, item] of this.cache.entries()) {
      if (now > item.expiry) {
        expiredKeys.push(key);
      }
    }

    expiredKeys.forEach(key => this.cache.delete(key));
  }
}
