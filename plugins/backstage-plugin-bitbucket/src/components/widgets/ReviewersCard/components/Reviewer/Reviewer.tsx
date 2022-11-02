import React from 'react';
import { Avatar, Tooltip } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

type Props = {
  reviewer: any;
};

const LightTooltip = withStyles({
  tooltip: {
    backgroundColor: 'white',
    border: '1px solid lightgrey',
    color: '#333',
    minWidth: '320px',
  },
})(Tooltip);

export const Reviewer = ({ reviewer }: Props) => (
    <LightTooltip
    title={reviewer.name}>
    <Avatar
        key={reviewer.name}
        alt={reviewer.email}
        src={reviewer.avatar_url}
    />
</LightTooltip>
);