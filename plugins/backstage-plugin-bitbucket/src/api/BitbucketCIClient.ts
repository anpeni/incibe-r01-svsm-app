
// .-- backstage --
import { DiscoveryApi, } from '@backstage/core-plugin-api';
import { BitbucketCloudIntegrationConfig } from '@backstage/integration';


// .--  Data plugin --
import {
	EffectiveDefaultReviewers,
	RepositoryDetail,
	PullRequestResponse
} from '../types';
import {
	BASE_URL, DEFAULT_PROXY_PATH
} from '../components/bitbucketAppData';
import {
	ReviewersSummary,
	BitbucketCIApi,
} from './BitbucketCIApi';



export class BitbucketCIClient implements BitbucketCIApi {

	// .-- Varaibles --
	discoveryApi: DiscoveryApi;
	baseUrl: string;
	config?: BitbucketCloudIntegrationConfig;

	// .-- Constructor --
	constructor({
		discoveryApi,
		baseUrl = BASE_URL,
		configBibucket,
	}: {
		discoveryApi: DiscoveryApi;
		baseUrl?: string;
		configBibucket?: BitbucketCloudIntegrationConfig;
	}) {
		this.discoveryApi = discoveryApi;
		this.baseUrl = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
		this.config = configBibucket ? configBibucket : undefined;
	}

	// .-- Private --
	private async callApi<T>(
		path: string,
		query: { [key in string]: any },
	): Promise<T | undefined> {
		const apiUrl = `${await this.discoveryApi.getBaseUrl('proxy')}${DEFAULT_PROXY_PATH}`;
		const response = await fetch(
			`${apiUrl}/${path}?${new URLSearchParams(query).toString()}`,
		);
		if (response.status === 200) {
			return (await response.json()) as T;
		}
		return undefined;
	}

	private getAuthHeaders(): Record<string, string> {
    const headers: Record<string, string> = {};
		if (this.config) {
			if (this.config.username) {
				const buffer = Buffer.from(
					`${this.config.username}:${this.config.appPassword}`,
					'utf8',
				);
				headers.Authorization = `Basic ${buffer.toString('base64')}`;
			}
		}
    return headers;
  }

	// .-- Methods --
	// --------------

	async getRepositoryDetail(
		repositorySlug?: string,
	): Promise<RepositoryDetail | undefined> {
		const repsotoryResponse = await this.callApi<RepositoryDetail>(
			`/repositories/${repositorySlug}`,
			{},
		);
		return repsotoryResponse;
	}

	async getReviewersSummary(
		repositorySlug?: string,
	): Promise<ReviewersSummary | undefined> {
		const reviewersResponse = await this.callApi<EffectiveDefaultReviewers>(
			`/repositories/${repositorySlug}/effective-default-reviewers`,
			{ page: 1, pagelen: 20 },
		);
		return {
			getReviewersData: reviewersResponse!,
		};
	}

	async getPullRequests(
		repositorySlug?: string,
		params: object = {},
	): Promise<PullRequestResponse | undefined> {
		const repsotoryResponse = await this.callApi<PullRequestResponse>(
			`/repositories/${repositorySlug}/pullrequests`,
			params,
		);
		return repsotoryResponse;
	}
}
