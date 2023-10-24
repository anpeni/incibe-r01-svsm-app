import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import { useSidebarOpenState } from './SidebarOpenStateContext';

interface TitulosProps {
    text: string;

}

const useStyles = makeStyles({
    sectionTitleaClaro: {
        fontSize: '11px',
        fontFamily: "Inter, sans-serif",
        fontWeight: 500,
        lineHeight: 'normal',
        marginLeft: '15px',
        marginTop: '15px',
        marginBottom: '10px'
    },
    sectionTitleCerradoClaro: {
        fontSize: '11px',
        fontFamily: "Inter, sans-serif",
        fontWeight: 500,
        lineHeight: 'normal',
        marginLeft: 'auto',  
        marginRight: 'auto',
        marginTop: '15px',
        marginBottom: '10px'
    },
  
});

export const Titulos = (props: TitulosProps) => {
    const classes = useStyles();
    const { isOpen } = useSidebarOpenState();

    return isOpen ? (
            <Typography className={classes.sectionTitleaClaro}>{props.text}</Typography>      
    ) : (

            <Typography className={classes.sectionTitleCerradoClaro}>{props.text}</Typography>       
    );
};


