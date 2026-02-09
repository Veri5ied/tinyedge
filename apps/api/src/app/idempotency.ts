export type DeliveryCache = {
  has: (id: string) => boolean;
  add: (id: string) => void;
};

export function createDeliveryCache(ttlMs: number): DeliveryCache {
  const entries = new Map<string, number>();

  function sweep(now: number): void {
    for (const [id, expiresAt] of entries) {
      if (expiresAt <= now) {
        entries.delete(id);
      }
    }
  }

  return {
    has(id: string): boolean {
      const now = Date.now();
      const expiresAt = entries.get(id);
      if (!expiresAt) return false;
      if (expiresAt <= now) {
        entries.delete(id);
        return false;
      }
      return true;
    },
    add(id: string): void {
      const now = Date.now();
      entries.set(id, now + ttlMs);
      if (entries.size > 1000) {
        sweep(now);
      }
    },
  };
}
