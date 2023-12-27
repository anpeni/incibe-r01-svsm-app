/*
 * Copyright 2020 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Grid } from '@material-ui/core';
import React from 'react';
import { UptimeCard } from './UptimeCard';
import { DatastoresBarCard } from './DatastoresBarCard';
import { DatastoresAreaCard } from './DatastoresAreaCard';
import Container from '@mui/material/Container';
import { makeStyles } from '@material-ui/core/styles';
import { BackstageTheme } from '@backstage/theme';
import { vars } from '../../../../../packages/app/src/themes/variables';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import MemoryIcon from '@mui/icons-material/Memory';
import { useTheme, useMediaQuery } from '@material-ui/core';


const dataCpu = [
  { name: '22:00', uv: 1000 },
  { name: '00:00', uv: 2500 },
  { name: '02:00', uv: 600 },
  { name: '04:00', uv: 1300 },
  { name: '06:00', uv: 2000 },
  { name: '08:00', uv: 900 },
];

const dataRam = [
  { name: '22:00', uv: 2 },
  { name: '00:00', uv: 4 },
  { name: '02:00', uv: 8},
  { name: '04:00', uv: 10 },
  { name: '06:00', uv: 12},
  { name: '08:00', uv: 25 },
];
const dataNetwork = [
  { name: '22:00', uv: 25 },
  { name: '00:00', uv: 10 },
  { name: '02:00', uv: 45},
  { name: '04:00', uv: 5 },
  { name: '06:00', uv: 50},
  { name: '08:00', uv: 22 },
];

const useStyles = makeStyles<BackstageTheme>(
  theme => ({
  barStyle: {
  },
  titleBar: {
    color: `${theme.palette.type === 'dark' ? '#FFF' : '#333'
  }`,
    fontFamily: 'sans-serif', 
    fontSize: '30px',
    padding: '0px 40px 4px 8px', 
    fontWeight: 700,
    fontStyle: 'normal',
  }
  
}));

/** @public */
export const HomeGeneral = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(800));

  return (
    <Container 
    style={{ 
      paddingTop: isMobile ? '5px' : '50px' 
    }}
    >
      <Grid container direction="row" spacing={4} 

      >
        <Grid item lg={4} xs={12} sm={12}
        >
          <Grid container direction="column" 
          spacing={isMobile ? 4 : 7}          
          >
            <Grid item >
              <UptimeCard uptime={'Uptime'} subtitulo={'3.1 Week'} percentageChange={55} icon={CalendarTodayIcon}/>
            </Grid>
            <Grid item >
              <UptimeCard uptime={'CPU Usage'} subtitulo={'2887 MHz'} percentageChange={33} icon={MemoryIcon}/>
            </Grid>
            <Grid item >
              <UptimeCard uptime={'RAM Usage'} subtitulo={'8.34 GB'} percentageChange={14} icon={CalendarTodayIcon}/>
            </Grid>
          </Grid>
        </Grid>

        <Grid item lg={8} xs={12} sm={12}
        className={ classes.barStyle }        
        >
          <DatastoresBarCard simbolo="%"/>
        </Grid>

        <Grid item lg={6} xs={12} sm={12}
        >
          <DatastoresAreaCard title="Cluster CPU" label="Usage Avg. MHz" data={dataCpu} simbolo={""}/>

        </Grid>
        <Grid item lg={6} xs={12} sm={12}
        >
          <DatastoresAreaCard title="Cluster Network Usage" label="Usage Network MB/s" data={dataNetwork} simbolo={" MB/s"}/>

        </Grid>
        <Grid item lg={6} xs={12} sm={12}>
        <DatastoresAreaCard title="Cluster RAM" label="Usage Avg. GB" data={dataRam} simbolo={" Gb"}/>

        </Grid>
        <Grid item lg={6} xs={12} sm={12}>
        <DatastoresAreaCard title="Cluster Network Usage" label="Usage Network MB/s" data={dataNetwork} simbolo={" MB/s"}/>

        </Grid>
      </Grid>
    </Container>
  );
};

