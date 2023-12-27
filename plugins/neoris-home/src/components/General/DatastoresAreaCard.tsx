import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { BackstageTheme } from '@backstage/theme';
import { vars } from '../../../../../packages/app/src/themes/variables';
import {GraficoHomeArea} from './GraficoHomeArea';

const useStyles = makeStyles<BackstageTheme>(
  theme => ({
  card: {
    backgroundColor: `${
      theme.palette.type === 'dark'
        ? vars.dark.background.card
        : vars.light.background.card
    }`,
    padding: '10px 30px 30px 10px',
    height: '100%', 
    borderRadius: '20px',
    [theme.breakpoints.down(1500)]: {
      padding: '5px 5px 15px 5px', 
    },
    [theme.breakpoints.down(800)]: {
      padding: '0px 0px 0px 0px', 
    },
  },
  titleBar: {
    color: `${theme.palette.type === 'dark' ? '#FFF' : '#333'
  }`,  
    fontFamily: 'sans-serif', 
    fontSize: '30px',
    padding: '0px 40px 4px 8px', 
    fontWeight: 700,
    fontStyle: 'normal',
    [theme.breakpoints.down(1500)]: {
      fontSize: '20px',
      padding: '0px 25px 3px 6px', 
    },
    [theme.breakpoints.down(800)]: {
      fontSize: '10px',
      padding: '0px 20px 2px 4px', 
    },

  }
  
}));

interface DataPoint {
  name: string;
  uv: number;
  
}
interface DatastoresAreaCardProps {
  title: string;
  label: string;
  data: DataPoint[];
  simbolo: string;
  
}

export function DatastoresAreaCard({ title, label, data, simbolo}: DatastoresAreaCardProps){
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <div className={classes.titleBar}>{title}</div>
        <GraficoHomeArea label={label} data={data} simbolo={simbolo}/>
      </CardContent>
    </Card>
  );
}
