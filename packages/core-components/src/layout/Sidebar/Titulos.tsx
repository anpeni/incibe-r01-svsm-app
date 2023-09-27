import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import { useSidebarOpenState } from './SidebarOpenStateContext';

interface TitulosProps {
    text: string;

}

const useStyles = makeStyles({
    sectionTitleOscuro: {
        fontSize: '11px',
        color: 'rgba(255, 255, 255, 0.30)',
        fontFamily: "Inter, sans-serif",
        fontWeight: 500,
        lineHeight: 'normal',
        marginLeft: '15px',
        marginTop: '15px',
        marginBottom: '10px'
    },
    sectionTitleaClaro: {
        fontSize: '11px',
        color: 'RGB(6, 11, 40, 0.8)',
        fontFamily: "Inter, sans-serif",
        fontWeight: 500,
        lineHeight: 'normal',
        marginLeft: '15px',
        marginTop: '15px',
        marginBottom: '10px'
    },
    sectionTitleCerradoOscuro: {
        fontSize: '11px',
        color: 'rgba(255, 255, 255, 0.30)',
        fontFamily: "Inter, sans-serif",
        fontWeight: 500,
        lineHeight: 'normal',
        marginLeft: 'auto',  // Centrado horizontal (requiere un contenedor flex)
        marginRight: 'auto',
        marginTop: '15px',
        marginBottom: '10px'
    },
    sectionTitleCerradoClaro: {
        fontSize: '11px',
        color: 'RGB(6, 11, 40, 0.8)',
        fontFamily: "Inter, sans-serif",
        fontWeight: 500,
        lineHeight: 'normal',
        marginLeft: 'auto',  // Centrado horizontal (requiere un contenedor flex)
        marginRight: 'auto',
        marginTop: '15px',
        marginBottom: '10px'
    },
});

export const Titulos = (props: TitulosProps) => {
    const classes = useStyles();
    const { isOpen } = useSidebarOpenState();
    const isDarkMode = localStorage.getItem('theme') === 'neoris-dark';

    return isOpen ? (

        isDarkMode ? (

            <Typography className={classes.sectionTitleOscuro}>{props.text}</Typography>


        ) : (
            <Typography className={classes.sectionTitleaClaro}>{props.text}</Typography>
        )

    ) : (

        isDarkMode ? (
            <Typography className={classes.sectionTitleCerradoOscuro}>{props.text}</Typography>
        ) : (
            <Typography className={classes.sectionTitleCerradoClaro}>{props.text}</Typography>
        )
    );
};


