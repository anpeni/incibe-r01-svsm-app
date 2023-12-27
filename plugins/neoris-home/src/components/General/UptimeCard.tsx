import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { BackstageTheme } from '@backstage/theme';
import { vars } from '../../../../../packages/app/src/themes/variables';
import { useTheme, useMediaQuery } from '@material-ui/core';
interface UptimeCardProps {
  uptime: string;
  subtitulo: string;
  percentageChange: number;
  icon: React.ElementType;
}

const useStyles = makeStyles<BackstageTheme>(theme => ({
  content: {
    display: 'flex',
    justifyContent: 'space-between', 
    alignItems: 'center', 
    
  },
  card: {
    backgroundColor: `${
      theme.palette.type === 'dark'
        ? vars.dark.background.card
        : vars.light.background.card
    }`,
    padding: '4px 8px',
    borderRadius: '20px', 
    [theme.breakpoints.down('xs')]: {
      height: '75px', 
      padding: '1px 2px',
    },
  },
  icon: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#4FD1C5',
    width: '50px',
    height: '50px',
    borderRadius: '15px',
    [theme.breakpoints.down('xs')]: {
      width: '35px',
      height: '35px', 
    },
  },
  titulo: {
    color: '#A0AEC0', 
    fontFamily: 'sans-serif', 
    fontSize: '16px',
    padding: '0px 8px', 
    fontWeight: 700,
    fontStyle: 'normal',
    [theme.breakpoints.down('xs')]: {
      fontSize: '12px',
      padding: '0px 2px',
    },
  },
  subtitulo: {
    color: `${theme.palette.type === 'dark' ? '#FFF' : '#333'
  }`,  
    fontFamily: 'sans-serif', 
    fontSize: '24px',
    padding: '0px 8px', 
    fontWeight: 700,
    fontStyle: 'normal',
    width: '100%',
    whiteSpace: 'nowrap',
    [theme.breakpoints.down('xs')]: {
      fontSize: '10px', 
      padding: '0px 4px',
    },
    
  },
  percentage: {
    color: '#48BB78', 
    fontFamily: 'sans-serif', 
    fontSize: '20px',
    padding: '4px 8px',
    fontWeight: 700,
    fontStyle: 'normal',
    [theme.breakpoints.down('xs')]: {
      fontSize: '15px', 
      padding: '2px 4px',
    },
    
  },
  subtituloPercentage: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      width: '120px',
    },   
  },
}));

export const UptimeCard: React.FC<UptimeCardProps> = ({
  uptime,
  subtitulo,
  percentageChange,
  icon: Icon,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  return (
    <Card className={classes.card}>
      <CardContent className={classes.content} style={{}}>
        <div style={{ display: 'flexrow' }}>
          <Typography className={classes.titulo}>{uptime}</Typography>
          <div
            className={classes.subtituloPercentage}
          >
            <Typography className={classes.subtitulo}>{subtitulo}</Typography>
            <Typography className={classes.percentage}>
              +{percentageChange}%
            </Typography>
          </div>
        </div>
        <div
          className={classes.icon}
        >
          <Icon style={{ fontSize: isMobile ? 18 : 25 }} />
        </div>
      </CardContent>
    </Card>
  );
};
