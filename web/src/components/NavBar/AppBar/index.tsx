import React, { Dispatch, SetStateAction } from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { AppBar as MUIAppBar } from './MUIstyle';

interface IProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
}

const AppBar:React.FC<IProps> = ({ setOpen, open })  =>{
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  return (
    <MUIAppBar position="fixed" open={open}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ mr: 2, ...(open && { display: 'none' }) }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          TCC
        </Typography>
      </Toolbar>
    </MUIAppBar>
  );
}

export default AppBar;