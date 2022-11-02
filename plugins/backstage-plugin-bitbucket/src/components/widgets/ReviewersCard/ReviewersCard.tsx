import React from 'react';
import { useAsync } from 'react-use';

// .-- backstage --
import { InfoCard, Progress } from '@backstage/core-components';
import { useApi } from '@backstage/core-plugin-api';

// .-- material --
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

// .-- plugin data --
import { BitbucketCIApiRef } from '../../../api';
import { EffectiveDefaultReviewers } from '../../../types';
import { URL_REVIEWERS, bitbucketCloudAppUUID, bitbucketCloudAppSlug } from '../../bitbucketAppData';

// .-- component --
import { ReviewersList } from './components/ReviewersList';

const useStyles = makeStyles((theme) => ({
	infoCard: {
		marginBottom: theme.spacing(3),
		'& + .MuiAlert-root': {
			marginTop: theme.spacing(3),
		},
	},
}));

export const ReviewersCard = ({}) => {
	const classes = useStyles();
	const BitbucketCIAPI = useApi(BitbucketCIApiRef);
	const { repository_uuid } = bitbucketCloudAppUUID();
	const { repository_slug } = bitbucketCloudAppSlug();
	const repository = repository_slug !== '' ? repository_slug : repository_uuid;
	/* TODO: to change the below logic to get reviewers data*/
	const { value, loading, error } = useAsync(async (): Promise<EffectiveDefaultReviewers> => {
		const bitbucketbObj = await BitbucketCIAPI.getReviewersSummary(repository);
		const data = bitbucketbObj?.getReviewersData;

		const renderData: any = { data };

		// .-- TODO get repository detail --
		// const repositoryDetails = await BitbucketCIAPI.getRepositoryDetails(repository);
		// renderData.repository_web_url = repositoryDetails?.web_url;
		// renderData.repository_default_branch = repositoryDetails?.default_branch;

		return renderData!;
	}, []);

	// .-- data repository --
	const repository_reviewers_web_url = URL_REVIEWERS.replace('{{repository_slug}}', repository); 
	
	if (loading) {
		return <Progress />;
	} else if (error) {
		return (
			<Alert severity='error' className={classes.infoCard}>
				{error.message}
			</Alert>
		);
	}
	return (
		<InfoCard title='Reviewers'
			deepLink={{
					link: `${repository_reviewers_web_url}`,
					title: 'People',
					onClick: e => {
						e.preventDefault();
						window.open(`${repository_reviewers_web_url}`);
					},
				}} className={classes.infoCard}>
			<ReviewersList reviewersObj={value || { data: undefined }} />
		</InfoCard>
	);
};