import React, { useState } from 'react';
import Brightness7Icon from '@material-ui/icons/Brightness7'; // Icono para tema claro
import NightIcon from '@material-ui/icons/NightsStay';
import { vars } from '../../../../../packages/app/src/themes/variables';

interface MySwitchProps {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  className?: string;
}

export const MySwitchTheme: React.FC<MySwitchProps> = ({
  checked,
  onChange,
  name,
}) => {
  const switchStyle = {
    width: '50px',
    height: '25px',
    background: 'white',
    position: 'relative',
    borderRadius: '15px',
    cursor: 'pointer',
    transform: 'scale(0.8)',
  };

  const toggleStyle = {
    width: '30px',
    height: '30px',
    background: vars.dark.background.accent,
    position: 'absolute',
    top: '-3px',
    left: checked ? '30px' : '-10px',
    borderRadius: '50%',
    transition: 'left 0.2s',
    //transform: 'scale(0.9)'
  };

  const icono = {
    position: 'absolute',
    width: '30px',
    height: '30px',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%) scale(0.8)',
    color: 'white',
  };

  const handleClick = () => {
    const fakeEvent = {
      target: {
        name,
        type: 'checkbox',
        checked: !checked,
      },
    } as React.ChangeEvent<HTMLInputElement>;

    onChange(fakeEvent);
  };

  return (
    <div onClick={handleClick} style={switchStyle as React.CSSProperties}>
      <div style={toggleStyle as React.CSSProperties}>
        {
          checked ? (
            <NightIcon style={icono as React.CSSProperties} /> // Icono para el estado "checked"
          ) : (
            <Brightness7Icon style={icono as React.CSSProperties} />
          ) // Icono para el estado "unchecked"
        }
      </div>
    </div>
  );
};

export default MySwitchTheme;
