import React from 'react';

import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import AppProvider from './hooks';
import Routes from './routes';
import GlobalStyle from './styles/global';
import MUITheme from './styles/MUITheme';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => (
  <ThemeProvider theme={MUITheme}>
    <BrowserRouter>
      <AppProvider>
        <ToastContainer />

        <Routes />
      </AppProvider>
      <GlobalStyle />
    </BrowserRouter>
  </ThemeProvider>
);

export default App;
