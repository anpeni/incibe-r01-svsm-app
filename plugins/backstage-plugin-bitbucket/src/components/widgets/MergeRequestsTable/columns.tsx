import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { TableColumn } from '@backstage/core-components';
import { PullRequest } from '../../../types';
import { getStatusIconType } from './Icons';
import Link from '@material-ui/core/Link';

export function createTitleColumn(): TableColumn<{}> {
	return {
		title: 'Title',
		field: 'title',
		highlight: true,
		render: (row: Partial<PullRequest>) => (
			<Typography variant='body2' noWrap>
				{getStatusIconType(row as PullRequest)}
				<Box ml={1} component='span'>
					<Link href={row.links?.html.href} target='_blank'>
						{row.title}
					</Link>
				</Box>
			</Typography>
		),
	};
}
