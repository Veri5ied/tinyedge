import { App } from "@octokit/app";
import { OctokitWithRest } from "../github/octokit";

type CacheEntry = {
  octokit: OctokitWithRest;
  expiresAt: number;
};

export function createOctokitCache(app: App, ttlMs: number) {
  const entries = new Map<number, CacheEntry>();

  return async function getInstallationOctokit(
    installationId: number,
  ): Promise<OctokitWithRest> {
    const now = Date.now();
    const cached = entries.get(installationId);
    if (cached && cached.expiresAt > now) {
      return cached.octokit;
    }

    const auth = await app.octokit.auth({
      type: "installation",
      installationId,
    });
    const token = typeof auth === "string" ? auth : auth.token;
    const octokit = new OctokitWithRest({ auth: token });
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
