// .-- react --
import React, { useState } from 'react';
import { useAsync } from 'react-use';

// .-- backstage --
import { useApi } from '@backstage/core-plugin-api';
import { Entity } from '@backstage/catalog-model';
import {
	Progress,
	InfoCard,
	StructuredMetadataTable,
	InfoCardVariants,
} from '@backstage/core-components';

// .-- material --
import {
	Box,
	makeStyles,
	FormControl,
	FormHelperText,
	Select,
	MenuItem,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

// .-- plugin data --
import { bitbucketCloudAppUUID, bitbucketCloudAppSlug } from '../../bitbucketAppData';
import { BitbucketCIApiRef } from '../../../api';
import { PullRequest } from '../../../types';

// .-- util --
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
	infoCard: {
		marginBottom: theme.spacing(3),
		'& + .MuiAlert-root': {
			marginTop: theme.spacing(3),
		},
		'& .MuiCardContent-root': {
			padding: theme.spacing(2, 1, 2, 2),
		},
		'& td': {
			whiteSpace: 'normal',
		},
	},
}));

export type MergeRequestStatsCount = {
	avgTimeUntilMerge: number;
	mergedCount: number;
};

export type MergeStats = {
	avgTimeUntilMerge: string;
	mergedToTotalRatio: string;
};

type Props = {
	entity?: Entity;
	variant?: InfoCardVariants;
};

const MergeRequestStats = (props: Props) => {
	const [count, setCount] = useState<number>(20);
	const classes = useStyles();
	const { repository_uuid } = bitbucketCloudAppUUID();
	const { repository_slug } = bitbucketCloudAppSlug();
	const repository = repository_slug !== '' ? repository_slug : repository_uuid;
	const BitbucketCIAPI = useApi(BitbucketCIApiRef);
	const mergeStat: MergeRequestStatsCount = {
		avgTimeUntilMerge: 0,
		mergedCount: 0,
	};
	const { value, loading, error } = useAsync(async (): Promise<MergeStats> => {
		// .--  q=state="OPEN" OR state="MERGED"&pagelen=20 --
		const bitbucketObj = await BitbucketCIAPI.getPullRequests(
			repository,
			{ pagelen: count, q: 'state="OPEN" OR state="MERGED"' },
		);
		const data = bitbucketObj?.values;
		const renderData: any = { data };
		if (renderData.data) {
			renderData.data.forEach((element: PullRequest) => {
				mergeStat.avgTimeUntilMerge += element.state === 'MERGED'
					? new Date(element.updated_on).getTime() -
					  new Date(element.created_on).getTime()
					: 0;
				mergeStat.mergedCount += element.state === 'MERGED' ? 1 : 0;
			});
		}

		if (mergeStat.mergedCount === 0)
			return {
				avgTimeUntilMerge: 'Never',
				mergedToTotalRatio: '0%',
			};

		const avgTimeUntilMergeDiff = moment.duration(
			mergeStat.avgTimeUntilMerge / mergeStat.mergedCount,
		);

		const avgTimeUntilMerge = avgTimeUntilMergeDiff.humanize();
		return {
			avgTimeUntilMerge: avgTimeUntilMerge,
			mergedToTotalRatio: `${Math.round(
				(mergeStat.mergedCount / count) * 100,
			)}%`,
		};
	}, [count]);

	if (loading) {
		return <Progress />;
	} else if (error) {
		return <Alert severity='error'>{error.message}</Alert>;
	}

	return value ? (
		<InfoCard
			title='Merge requests statistics'
			className={classes.infoCard}
			variant={props.variant}
		>
			<Box position='relative'>
				<StructuredMetadataTable metadata={value} />
				<Box display='flex' justifyContent='flex-end'>
					<FormControl>
						<Select
							value={count}
							onChange={(event) => setCount(Number(event.target.value))}
						>
							<MenuItem value={10}>10</MenuItem>
							<MenuItem value={20}>20</MenuItem>
							<MenuItem value={50}>50</MenuItem>
							<MenuItem value={100}>100</MenuItem>
						</Select>
						<FormHelperText>Number of MRs</FormHelperText>
					</FormControl>
				</Box>
			</Box>
		</InfoCard>
	) : (
		<InfoCard title='Merge Request Statistics' />
	);
};

export default MergeRequestStats;
