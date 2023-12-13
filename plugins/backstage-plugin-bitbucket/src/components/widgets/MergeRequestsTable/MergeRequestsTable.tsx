// .-- react --
import React from 'react';
import { useAsync } from 'react-use';

// .-- backstage --
import { TableMod, TableColumnMod } from '@internal/core-components';
import { useApi } from '@backstage/core-plugin-api';
import { Progress } from '@backstage/core-components';

// .-- material --
import Alert from '@material-ui/lab/Alert';

// .-- plugin data --
import { bitbucketCloudAppUUID, bitbucketCloudAppSlug } from '../../bitbucketAppData';
import { BitbucketCIApiRef } from '../../../api';
import { PullRequestResponse, PullRequest } from '../../../types';
import { getElapsedTime, getDuration } from '../../utils';


import { createTitleColumn } from './columns';

export const DenseTable = ({ mergeRequests }: any) => {
	const columns: TableColumnMod[] = [
		{ title: 'ID', field: 'id' },
		createTitleColumn(),
		{ title: 'Creator', field: 'author' },
		{ title: 'State', field: 'state' },
		{ title: 'Created At', field: 'created_date' },
		{ title: 'Duration', field: 'duration' },
	];
	const title = `PullRequest Status: ${mergeRequests?.project_name}`;
	const data = mergeRequests?.data?.map((mergeRequest: PullRequest) => {
		return {
			id: mergeRequest.id,
			state: mergeRequest.state,
			author: mergeRequest.author.display_name,
			title: mergeRequest.title,
			web_url: mergeRequest.links?.html.href,
			created_date: getElapsedTime(mergeRequest.created_on),
			duration: getDuration(mergeRequest.created_on, mergeRequest.updated_on),
		};
	});

	return (
		<TableMod
			title={title}
			options={{ search: true, paging: true }}
			columns={columns}
			data={data}
		/>
	);
};

export const MergeRequestsTable = ({}) => {
	const { repository_uuid } = bitbucketCloudAppUUID();
	const { repository_slug } = bitbucketCloudAppSlug();
	const repository = repository_slug !== '' ? repository_slug : repository_uuid;
	const BitbucketCIAPI = useApi(BitbucketCIApiRef);

	const { value, loading, error } = useAsync(async (): Promise<
		PullRequestResponse
	> => {
		// .--  q=state="OPEN" OR state="MERGED" OR state="DECLINED" OR state="SUPERSEDED"&pagelen= --
		const bitbucketObj = await BitbucketCIAPI.getPullRequests(
			repository,
			{ pagelen: 40, q: 'state="OPEN" OR state="MERGED" OR state="DECLINED" OR state="SUPERSEDED"' },
		);
		const repoObj = await BitbucketCIAPI.getRepositoryDetail(repository);
		const data = bitbucketObj?.values;
		const renderData: any = { data,  project_name: repoObj?.name};
		return renderData;
	}, []);

	if (loading) {
		return <Progress />;
	} else if (error) {
		return <Alert severity='error'>{error.message}</Alert>;
	}

	return <DenseTable mergeRequests={value || []} />;
};
