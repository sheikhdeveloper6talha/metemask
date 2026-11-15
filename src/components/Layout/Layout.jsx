import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { AppBar, Box, Button, Chip, Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText, MenuItem, Select, Toolbar, Typography, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SendIcon from '@mui/icons-material/CallMade';
import ReceiveIcon from '@mui/icons-material/CallReceived';
import HistoryIcon from '@mui/icons-material/History';
import SettingsIcon from '@mui/icons-material/Settings';
import { useWallet } from '../../hooks/useWallet';
import { formatAddress } from '../../utils/formatAddress';
import { NETWORKS } from '../../services/ethereum';
const W = 232;
const items = [['Dashboard', '/', <DashboardIcon />], ['Send', '/send', <SendIcon />], ['Receive', '/receive', <ReceiveIcon />], ['Transactions', '/transactions', <HistoryIcon />], ['Settings', '/settings', <SettingsIcon />]];
export default function Layout() {
  const { address, chainId, network, connect, switchNetwork } = useWallet();
  const [open, setOpen] = useState(false);
  const desktop = useMediaQuery((t) => t.breakpoints.up('md'));
  const nav = (<Box sx={{ width: W, p: 2 }}>
    <Typography variant="h6" fontWeight={700} sx={{ px: 1.5, py: 2 }}>CryptoWallet</Typography>
    <List>{items.map(([l, to, icon]) => (
      <ListItemButton key={to} component={NavLink} to={to} end onClick={() => setOpen(false)} sx={{ borderRadius: 3, mb: .5, '&.active': { bgcolor: 'rgba(124,92,255,.18)', color: 'primary.light' } }}>
        <ListItemIcon sx={{ color: 'inherit', minWidth: 38 }}>{icon}</ListItemIcon><ListItemText primary={l} /></ListItemButton>))}</List></Box>);
  return (<Box sx={{ display: 'flex', minHeight: '100vh' }}>
    {desktop ? <Drawer variant="permanent" sx={{ width: W, '& .MuiDrawer-paper': { width: W, borderRight: '1px solid rgba(255,255,255,.06)', bgcolor: 'background.paper' } }}>{nav}</Drawer>
      : <Drawer open={open} onClose={() => setOpen(false)} PaperProps={{ sx: { bgcolor: 'background.paper' } }}>{nav}</Drawer>}
    <Box sx={{ flex: 1, minWidth: 0 }}>
      <AppBar position="sticky" elevation={0} sx={{ bgcolor: 'rgba(8,11,23,.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,.06)' }}>
        <Toolbar sx={{ gap: 1.5 }}>
          {!desktop && <IconButton onClick={() => setOpen(true)}><MenuIcon /></IconButton>}
          <Chip size="small" color={address ? 'success' : 'default'} label={address ? 'Connected' : 'Not connected'} />
          <Box sx={{ flex: 1 }} />
          {address && <Select size="small" value={NETWORKS[chainId] ? chainId : ''} displayEmpty onChange={(e) => switchNetwork(NETWORKS[e.target.value].hex)} renderValue={() => network?.name || 'Unsupported network'} sx={{ minWidth: 150 }}>
            {Object.entries(NETWORKS).map(([id, n]) => <MenuItem key={id} value={Number(id)}>{n.name}</MenuItem>)}</Select>}
          {address ? <Chip label={formatAddress(address)} variant="outlined" /> : <Button variant="contained" size="small" onClick={connect}>Connect</Button>}
        </Toolbar></AppBar>
      <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1100, mx: 'auto' }}><Outlet /></Box>
    </Box></Box>);
}
