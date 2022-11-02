// .-- react --
import React from 'react';
import { Route, Routes } from 'react-router-dom';

// .-- backstage --
import { Entity } from '@backstage/catalog-model';
import { useEntity } from '@backstage/plugin-catalog-react';
import { MissingAnnotationEmptyState } from '@backstage/core-components';
import { Button } from '@material-ui/core';

// .-- bitbuckt plugin --
import { BitbucketCI } from './components/BitbucketCI';
import { 
	BITBUCKET_ANNOTATION_REPOSITORY_UUID,
	BITBUCKET_ANNOTATION_REPOSITORY_SLUG,
	isBitbucketAvailable 
} from './components/bitbucketAppData';


type Props = {
	/** @deprecated The entity is now grabbed from context instead */
	entity?: Entity;
};

export const Router = (_props: Props) => {
	const { entity } = useEntity();

	if (
		isBitbucketAvailable(entity)
	) {
		return (
			<Routes>
				<Route path="/" element={<BitbucketCI />} />
			</Routes>
		);
	}

	return (
		<>
			<MissingAnnotationEmptyState annotation={BITBUCKET_ANNOTATION_REPOSITORY_UUID} />
			<MissingAnnotationEmptyState annotation={BITBUCKET_ANNOTATION_REPOSITORY_SLUG} />
			<Button
				variant='contained'
				color='primary'
				href='https://github.com/loblaw-sre/backstage-plugin-gitlab/blob/main/README.md'
			>
				Read Bitbucket Plugin Docs
			</Button>
		</>
	);
};
