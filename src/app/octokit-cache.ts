import { App } from "@octokit/app";
import { Octokit } from "octokit";

type CacheEntry = {
  octokit: Octokit;
  expiresAt: number;
};

export function createOctokitCache(app: App, ttlMs: number) {
  const entries = new Map<number, CacheEntry>();

  return async function getInstallationOctokit(installationId: number): Promise<Octokit> {
    const now = Date.now();
    const cached = entries.get(installationId);
    if (cached && cached.expiresAt > now) {
      return cached.octokit;
    }

    const octokit = await app.getInstallationOctokit(installationId);
    entries.set(installationId, { octokit, expiresAt: now + ttlMs });

    if (entries.size > 500) {
      for (const [id, entry] of entries) {
        if (entry.expiresAt <= now) {
          entries.delete(id);
        }
      }
    }

    return octokit;
  };
}
