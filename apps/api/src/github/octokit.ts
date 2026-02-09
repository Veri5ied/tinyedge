import { Octokit as CoreOctokit } from "@octokit/core";
import { paginateRest } from "@octokit/plugin-paginate-rest";
import { restEndpointMethods } from "@octokit/plugin-rest-endpoint-methods";

export const OctokitWithRest = CoreOctokit.plugin(restEndpointMethods, paginateRest);
export type OctokitWithRest = InstanceType<typeof OctokitWithRest>;
