/**
 * Simple client-side cache service for browser-side API responses
 */
interface ClientCacheItem<T = unknown> {
  data: T;
  expiry: number;
}

export class ClientCacheService {
  private cache: Map<string, ClientCacheItem> = new Map();
  private namespace: string;
  private defaultTtl: number;

  constructor(namespace: string, defaultTtl: number = 10 * 60 * 1000) { // 10 minutes default
    this.namespace = namespace;
    this.defaultTtl = defaultTtl;
  }

  /**
   * Get item from cache
   */
  get<T>(key: string): T | null {
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
  set<T>(key: string, data: T, ttl?: number): void {
    const fullKey = `${this.namespace}:${key}`;
    const expiry = Date.now() + (ttl || this.defaultTtl);
    
    this.cache.set(fullKey, { data, expiry });
  }

  /**
   * Delete item from cache
   */
  delete(key: string): void {
    const fullKey = `${this.namespace}:${key}`;
    this.cache.delete(fullKey);
  }

  /**
   * Clear all items in namespace
   */
  clear(): void {
    const keysToDelete = Array.from(this.cache.keys()).filter(key => 
      key.startsWith(`${this.namespace}:`)
    );
    
    keysToDelete.forEach(key => this.cache.delete(key));
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

// Global client cache instances
export const playlistCache = new ClientCacheService('playlists', 10 * 60 * 1000); // 10 minutes
export const videoCache = new ClientCacheService('videos', 5 * 60 * 1000); // 5 minutes