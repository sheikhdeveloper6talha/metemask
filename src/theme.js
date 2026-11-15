import { createTheme } from '@mui/material';
export default createTheme({
  palette: { mode: 'dark', primary: { main: '#7c5cff' }, secondary: { main: '#3b9eff' }, background: { default: '#080b17', paper: '#0f1426' } },
  shape: { borderRadius: 16 },
  typography: { fontFamily: 'Sora, system-ui, sans-serif', button: { textTransform: 'none', fontWeight: 600 } },
});
