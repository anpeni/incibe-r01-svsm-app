import { createApiRef } from '@backstage/core-plugin-api';
import {
	EffectiveDefaultReviewers,
	RepositoryDetail,
	PullRequestResponse
} from '../types';

export interface ReviewersSummary {
	getReviewersData: EffectiveDefaultReviewers;
}

export const BitbucketCIApiRef = createApiRef<BitbucketCIApi>({
	id: 'plugin.bitbucketci.service',
});

export type BitbucketCIApi = {
	getRepositoryDetail(
		repositorySlug: string,
	): Promise<RepositoryDetail | undefined>;
	getReviewersSummary(
		repositorySlug: string,
	): Promise<ReviewersSummary | undefined>;
	getPullRequests(
		repositorySlug: string,
		params: object
	): Promise<PullRequestResponse | undefined>;
};
