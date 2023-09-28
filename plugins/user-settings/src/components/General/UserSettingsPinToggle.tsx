import React from 'react';
import {
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Switch,
  Tooltip,
  Box, // Agregar Box de Material-UI
} from '@material-ui/core';
import { useSidebarPinState } from '@backstage/core-components';

/** @public */
export const UserSettingsPinToggle = () => {
  const { isPinned, toggleSidebarPinState } = useSidebarPinState();

  const switchStyle = {
    backgroundColor: 'black',
  };

  return (
    <ListItem>
        <ListItemText
          primary="Pin Sidebar"
          secondary="Prevent the sidebar from collapsing"
        />
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
