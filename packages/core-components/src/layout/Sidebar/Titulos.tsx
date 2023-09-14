import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import { useSidebarOpenState } from './SidebarOpenStateContext';

interface TitulosProps {
    text: string;

  }

const useStyles = makeStyles({
    sectionTitle: {
        fontSize: '8px',
        color: 'rgba(255, 255, 255, 0.30)',
        fontFamily: "Inter, sans-serif",
        fontWeight: 500,
        lineHeight: 'normal',
        marginLeft: '15px',
        marginTop: '15px',
        marginBottom: '10px'
    },
    sectionTitleCerrado: {
        fontSize: '8px',
        color: 'rgba(255, 255, 255, 0.30)',
        fontFamily: "Inter, sans-serif",
        fontWeight: 500,
        lineHeight: 'normal',
        marginLeft: 'auto',  // Centrado horizontal (requiere un contenedor flex)
        marginRight: 'auto',
        marginTop: '15px',
        marginBottom: '10px'
    },
});

export const Titulos = (props:  TitulosProps) => {
    const classes = useStyles();
    const { isOpen } = useSidebarOpenState();

    return isOpen ? (
        <Typography className={classes.sectionTitle}>{props.text}</Typography>
    ) : (
        <Typography className={classes.sectionTitleCerrado}>{props.text}</Typography>
    );
};


