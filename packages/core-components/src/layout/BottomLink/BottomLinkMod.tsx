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

import { BackstageTheme } from '@backstage/theme';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ArrowIcon from '@material-ui/icons/ArrowForward';
import React from 'react';
import { Link } from '../../components/Link';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import { vars } from '../../../../../packages/app/src/themes/variables';

/** @public */
export type BottomLinkClassKey = 'root' | 'boxTitle' | 'arrow';

const useStyles = makeStyles<BackstageTheme>(
  theme => ({
    root: {
      marginLeft: '520px',
      marginTop: '30px',
      marginBottom: '30px',
    },
    sombreadoLink: {
      display: 'flex',
      alignItems: 'center',
      background: `${
        theme.palette.type === 'dark'
          ? vars.dark.background.highlight
          : vars.light.background.white
      }`,
      borderRadius: '20px',
    },
    boxTitle: {
      margin: 0,
      display: 'flex',
      alignItems: 'center',
      padding: '1px 20px 1px 20px',
    },
    arrow: {     
      transform: 'rotate(90deg)',
      color: `${
        theme.palette.type === 'dark'
          ? vars.dark.fontColor.white
          : vars.light.fontColor.black
      }`,
      fontSize: '20px',
      marginLeft: '5px',
    },
    textoEnlace: {
      display: 'block',
      color: `${
        theme.palette.type === 'dark'
          ? vars.dark.fontColor.white
          : vars.light.fontColor.black
      }`,
      fontFamily: 'Inter, sans-serif',
      fontSize: '13px',
      fontStyle: 'normal',
      fontWeight: 400,
      lineHeight: '32px',
    }
  }),
  { name: 'BackstageBottomLink' },
);

/** @public */
export type BottomLinkProps = {
  link: string;
  title: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
};

/**
 * Footer with link used in  {@link InfoCard } and {@link TabbedCard}
 *
 * @public
 *
 */
export function BottomLinkMod(props: BottomLinkProps) {
  const { link, title, onClick } = props;
  const classes = useStyles();

  return (
    <Box>
      {/* <Divider /> */}
      <Link to={link} onClick={onClick} underline="none" >
        
        <Box display="flex" alignItems="center" className={classes.root}>
        <div className={classes.sombreadoLink}>
          <Box className={classes.boxTitle}>
            <span className={classes.textoEnlace}
>
              {title}
            </span>
            <ArrowCircleUpIcon className={classes.arrow} />
          </Box>
          
          </div>
          
        </Box>
        
      </Link>
    </Box>
  );
}
