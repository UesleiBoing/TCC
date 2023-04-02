import React, { useState } from 'react';

import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

import AppBar from './AppBar';
import Drawer from './Drawer';
import { Main } from './Drawer/MUIstyle';
import { DrawerHeader } from './MUIstyle';

interface IProps {
  children?: JSX.Element;
}

const NavBar:React.FC<IProps> = ({children})  =>{
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <AppBar setOpen={setOpen} open={open} />
      <Drawer setOpen={setOpen} open={open} />

      <Main open={open}>
        <DrawerHeader />
        { children }
      </Main>
    </Box>
  );
}

export default NavBar;