import { OctokitWithRest } from "./octokit";
import { parseResult } from "../core/parse-result";

export async function findExistingComment(
  octokit: OctokitWithRest,
  owner: string,
  repo: string,
  issueNumber: number,
): Promise<number | null> {
  const preferredLogin = process.env.TINYEDGE_BOT_LOGIN;
  const comments = await octokit.paginate(octokit.rest.issues.listComments, {
    owner,
    repo,
    issue_number: issueNumber,
    per_page: 100,
  });

  for (let i = comments.length - 1; i >= 0; i -= 1) {
    const comment = comments[i];
    if (preferredLogin && comment.user?.login !== preferredLogin) {
      continue;
    }

    if (typeof comment.body !== "string") {
      continue;
    }

    try {
      parseResult(comment.body);
      return comment.id;
    } catch (error) {
      continue;
    }
  }

  return null;
}
