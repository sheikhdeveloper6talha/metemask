import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme';
import { WalletProvider } from './hooks/useWallet';
import App from './App';
ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}><CssBaseline /><BrowserRouter><WalletProvider><App /></WalletProvider></BrowserRouter></ThemeProvider>);
