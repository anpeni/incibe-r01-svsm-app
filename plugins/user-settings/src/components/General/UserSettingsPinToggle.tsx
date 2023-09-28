import React from 'react';
import {
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Switch,
  Tooltip,
  makeStyles,
  Box, // Agregar Box de Material-UI
} from '@material-ui/core';
import { useSidebarPinState } from '@backstage/core-components';



const useStyles = makeStyles(
  theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      width: '100%',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingBottom: 8,
      paddingRight: 16,
    },
    titulo: {
      color: '#FFF',
      textAlign: 'right',
      fontFamily: 'Inter, sans-serif',
      fontSize: '20px',
      fontStyle: 'normal',
      fontWeight: 700,
      lineHeight: 'normal',
      position: 'relative',
      //top: '-5px',
    },
    texto: {
      color: '#FFF',
      textAlign: 'right',
      fontFamily: 'Inter, sans-serif',
      fontSize: '20px',
      fontStyle: 'normal',
      fontWeight: 400,
      lineHeight: 'normal',
      position: 'relative',
      top: '-20px',
    },
    textoTema: {
      color: '#FFF',
      textAlign: 'right',
      fontFamily: 'Inter, sans-serif',
      fontSize: '13px',
      fontStyle: 'normal',
      fontWeight: 400,
      lineHeight: 'normal',

    },
    lista: {
      position: 'relative',
      top: '15px',

    },
    list: {
      width: 'initial',
      [theme.breakpoints.down('xs')]: {
        width: '100%',
        padding: `0 0 12px`,
      },
    },
    listItemText: {
      paddingRight: 0,
      paddingLeft: 0,
    },
    listItemSecondaryAction: { // Botones
      background: 'black',
      borderRadius: '12px',
      position: 'relative',
      transform: 'unset',
      top: 'auto',
      right: 'auto',
      [theme.breakpoints.down('xs')]: {
        paddingLeft: 0,
      },
    },

  }

  ));

/** @public */
export const UserSettingsPinToggle = () => {
  const { isPinned, toggleSidebarPinState } = useSidebarPinState();
  const classes = useStyles();
  const switchStyle = {
    backgroundColor: 'black',
    // width: '100px',  
    // height: '5px', 
  };

  return (
    <ListItem>
      {/* <ListItemText
          primary="Pin Sidebar"
          secondary="Prevent the sidebar from collapsing"
        /> */}
      <div className={classes.lista}>
        <span className={classes.titulo}>Pin Sidebar
        </span>
        <p className={classes.texto}>Prevent the sidebar from collapsing
        </p>
      </div>
      <ListItemSecondaryAction>
        <Tooltip
          placement="top"
          arrow
          title={`${isPinned ? 'Unpin' : 'Pin'} Sidebar`}
          style={switchStyle}
        >
          <Switch
            color="primary"
            checked={isPinned}
            onChange={() => toggleSidebarPinState()}
            name="pin"
            inputProps={{ 'aria-label': 'Pin Sidebar Switch' }}
            style={switchStyle}
          />
        </Tooltip>
      </ListItemSecondaryAction>
    </ListItem>
  );
};
