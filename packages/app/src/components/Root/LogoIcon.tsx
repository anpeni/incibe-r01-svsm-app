import React from 'react';
import MyCustomIcon from './../../assets/images/neoris-graphic-logo.png';
import { useTheme } from '@material-ui/core/styles';

const LogoIcon = () => {
  const theme = useTheme();
  return (
    <img
      width="42.47"
      height="35.84"
      src={MyCustomIcon}
      style={{
        filter: theme.palette.type === 'dark' ? 'none' : 'invert(100%)',
      }}
    />
  );
};

export default LogoIcon;
