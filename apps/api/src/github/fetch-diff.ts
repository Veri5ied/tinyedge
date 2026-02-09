import { OctokitWithRest } from "./octokit";

export async function fetchDiff(
  octokit: OctokitWithRest,
  owner: string,
  repo: string,
  pullNumber: number,
): Promise<string> {
  const response = await octokit.request(
    "GET /repos/{owner}/{repo}/pulls/{pull_number}",
    {
      owner,
      repo,
      pull_number: pullNumber,
      headers: {
        accept: "application/vnd.github.v3.diff",
      },
    },
  );

  if (typeof response.data !== "string") {
    throw new Error("GitHub diff response was not a string");
  }

  return response.data;
}
