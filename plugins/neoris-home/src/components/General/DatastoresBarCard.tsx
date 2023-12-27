import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { BackstageTheme } from '@backstage/theme';
import { vars } from '../../../../../packages/app/src/themes/variables';
import GraficoHomeBar from './GraficoHomeBar';

const useStyles = makeStyles<BackstageTheme>(theme => ({
  card: {
    backgroundColor: `${
      theme.palette.type === 'dark'
        ? vars.dark.background.card
        : vars.light.background.card
    }`,
    padding: '10px 30px 30px 10px',
    [theme.breakpoints.down(800)]: {
      padding: '0px 0px 0px 0px', 
    },
    height: '100%',
    borderRadius: '20px',
  },
  titleBar: {
    color: `${theme.palette.type === 'dark' ? '#FFF' : '#333'
  }`, 
    fontFamily: 'sans-serif', 
    fontSize: '30px',
    padding: '0px 40px 4px 8px',
    fontWeight: 700,
    fontStyle: 'normal',
    [theme.breakpoints.down(800)]: {
      fontSize: '10px', 
      padding: '0px 0px 0px 0px', 
    },

  },
}));

export function DatastoresBarCard({ simbolo }: { simbolo: string }) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <div className={classes.titleBar}>Datastores- Usage Capacity</div>
        <GraficoHomeBar simbolo={ simbolo } />
      </CardContent>
    </Card>
  );
}
