import { App } from "@octokit/app";

export function createGitHubApp(): App {
  const appId = process.env.GITHUB_APP_ID;
  const privateKey = process.env.GITHUB_PRIVATE_KEY;

  if (!appId) {
    throw new Error("GITHUB_APP_ID is required");
  }

  if (!privateKey) {
    throw new Error("GITHUB_PRIVATE_KEY is required");
  }

  const normalizedKey = privateKey.replace(/\\n/g, "\n");

  return new App({
    appId,
    privateKey: normalizedKey,
  });
}
