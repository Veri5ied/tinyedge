import { OctokitWithRest } from "./octokit";

export async function postComment(
  octokit: OctokitWithRest,
  owner: string,
  repo: string,
  issueNumber: number,
  body: string,
  commentId?: number | null,
): Promise<void> {
  if (commentId) {
    await octokit.rest.issues.updateComment({
      owner,
      repo,
      comment_id: commentId,
      body,
    });
    return;
  }

  await octokit.rest.issues.createComment({
    owner,
    repo,
    issue_number: issueNumber,
    body,
  });
}
