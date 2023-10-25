import React, { useState } from 'react';
import { vars } from '../../../../../packages/app/src/themes/variables';

interface MySwitchProps {
  checked: boolean;
  onChange: () => void;
  name?: string;
  className?: string;
}

export const MySwitch: React.FC<MySwitchProps> = ({
  checked,
  onChange,
  name,
}) => {
  const switchStyle = {
    width: '69px',
    height: '30px',
    //background: checked ? 'green' : 'grey',
    background: 'white',
    position: 'relative',
    borderRadius: '15px',
    cursor: 'pointer',
  };

  const toggleStyle = {
    width: '39px',
    height: '39px',
    background: vars.dark.background.accent,
    position: 'absolute',
    top: '-4px',
    left: checked ? '39px' : '-3px',
    borderRadius: '50%',
    transition: 'left 0.2s',
  };



    return (
        <div onClick={onChange} style={switchStyle as React.CSSProperties}>
            <div style={toggleStyle as React.CSSProperties}></div>
        </div>
    );
};

export default MySwitch;
