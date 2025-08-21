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
  private lastCleanup: number = 0;
  private readonly CLEANUP_INTERVAL = 5 * 60 * 1000; // Cleanup every 5 minutes

  constructor(namespace: string, defaultTtl: number = 10 * 60 * 1000) { // 10 minutes default
    this.namespace = namespace;
    this.defaultTtl = defaultTtl;
    
    // Only cleanup if enough time has passed to avoid hot-reload issues
    this.scheduleCleanup();
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
   * Clean expired entries (with throttling to prevent excessive cleanup during development)
   */
  cleanExpired(): void {
    const now = Date.now();
    
    // Only cleanup if enough time has passed (prevents hot-reload spam)
    if (now - this.lastCleanup < this.CLEANUP_INTERVAL) {
      return;
    }
    
    const expiredKeys: string[] = [];

    for (const [key, item] of this.cache.entries()) {
      if (now > item.expiry) {
        expiredKeys.push(key);
      }
    }

    expiredKeys.forEach(key => this.cache.delete(key));
    this.lastCleanup = now;
  }

  /**
   * Schedule cleanup to run periodically
   */
  private scheduleCleanup(): void {
    // Clean up immediately if cache is getting large
    if (this.cache.size > 100) {
      this.cleanExpired();
    }
  }

  /**
   * Get cache statistics for debugging
   */
  getStats(): { size: number; namespace: string; lastCleanup: number } {
    return {
      size: this.cache.size,
      namespace: this.namespace,
      lastCleanup: this.lastCleanup
    };
  }
}

// Global client cache instances
export const playlistCache = new ClientCacheService('playlists', 10 * 60 * 1000); // 10 minutes
export const videoCache = new ClientCacheService('videos', 5 * 60 * 1000); // 5 minutes