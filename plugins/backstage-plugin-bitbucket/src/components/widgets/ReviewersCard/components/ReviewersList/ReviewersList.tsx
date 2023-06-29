import React from 'react';
import { Grid } from '@material-ui/core';
import { Reviewer } from '../Reviewer';

interface UserData {
  display_name: string;
  nickname: string;
  links: {
    avatar: {
      href: string;
    };
  };
}

interface ReviewerData {
  user: UserData;
}

export const ReviewersList = ({reviewersObj}: any ) => {
  const data = reviewersObj.data.values.map((reviewer: ReviewerData) => {
		return {
			name: reviewer.user.display_name,
			email: reviewer.user.nickname,
      avatar_url: reviewer.user.links.avatar.href,
    };
	});
  return (
        <Grid container spacing={1} justifyContent="flex-start">
          {data.map((reviewer: any) => (
            <Grid key={reviewer.name} item>
                <Reviewer reviewer={reviewer} />
            </Grid>
          ))}
        </Grid>
  );
}