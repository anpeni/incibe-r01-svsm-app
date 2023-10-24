import React from 'react';
import MyCustomLogoFull from './../../assets/images/neoris-typographic-logo.png';
import { useTheme } from '@material-ui/core/styles';

const LogoFull = () => {
  const theme = useTheme();
  return (
    <img
      width="auto"
      height="30"
      src={MyCustomLogoFull}
      style={{
        filter: theme.palette.type === 'dark' ? 'none' : 'invert(100%)',
      }}
    />
  );
};

export default LogoFull;
