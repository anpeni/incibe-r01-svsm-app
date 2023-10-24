import React from 'react';
import {
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Switch,
  Tooltip,
  makeStyles,
  Box, // Agregar Box de Material-UI
  Grid
} from '@material-ui/core';
import { useSidebarPinState } from '@backstage/core-components';
import { MySwitch } from './SwitchPropio';





const useStyles = makeStyles(
  theme => ({
    customSwitch: {
      marginTop: '4px',
      //color: 'transparent !important',
      width: '70px',
      height: '40px',
      padding: '6px',
      borderRadius: '24px',
      
      
      '& .MuiSwitch-thumb': {
        width: '60px',
        height: '35px',
        borderRadius: '50px !important',
        backgroundColor: 'red',
        
      },
      '& .MuiSwitch-track': {
        height: '24px',
        width: '60px !important',
        borderRadius: '50px !important',
        color: 'red !important',
        backgroundColor: 'red',
        

      },
    },
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
      //color: '#FFF',
      color: `${theme.palette.type === 'dark' ? '#FFF' : 'RGB(6, 11, 40)'
    }`,
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
      //color: '#FFF',
      color: `${theme.palette.type === 'dark' ? '#FFF' : 'RGB(6, 11, 40)'
    }`,
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
      color: `${theme.palette.type === 'dark' ? '#FFF' : 'RGB(6, 11, 40)'
    }`,
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
    flexContainer: {
      display: 'flex',
      justifyContent: 'space-between', // Alinea los hijos a cada extremo
      alignItems: 'center', // Centra los hijos verticalmente
    },
    textContainer: {
      textAlign: 'left', // Alinea los textos a la izquierda
      marginLeft: '29px',
      marginTop: '-20px',
      marginBottom: '-25px',
    },
    switchModificado: {
      right: '70px',
      position: 'fixed',
      //marginBottom: '30px',
      marginTop: '-30px',
    },

  }

  ));

/** @public */
export const UserSettingsPinToggle = () => {

  const { isPinned, toggleSidebarPinState } = useSidebarPinState();
  const classes = useStyles();


  return (

    <div className={classes.flexContainer}>
      <div className={classes.textContainer}>
        <span className={classes.titulo}>Pin Sidebar
        </span>
        <p className={classes.texto}>Prevent the sidebar from collapsing
        </p>
      </div>
      <Grid item className={classes.switchModificado}>
      <MySwitch className={classes.customSwitch}
        
        checked={isPinned}
        onChange={() => toggleSidebarPinState()}
        name="pin"
      >
      </MySwitch>
      </Grid>

    </div>
  );
};
