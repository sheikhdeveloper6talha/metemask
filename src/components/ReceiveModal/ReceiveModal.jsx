import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from '@mui/material';
import { QRCodeSVG } from 'qrcode.react';
import { useWallet } from '../../hooks/useWallet';
export default function ReceiveModal({ open, onClose }) {
  const { address, network } = useWallet();
  return (<Dialog open={open} onClose={onClose} fullWidth maxWidth="xs"><DialogTitle>Receive ETH</DialogTitle>
    <DialogContent><Stack alignItems="center" spacing={2}>
      <Box sx={{ p: 2, bgcolor: '#fff', borderRadius: 3 }}><QRCodeSVG value={address || ''} size={176} /></Box>
      <Typography sx={{ wordBreak: 'break-all', textAlign: 'center' }}>{address}</Typography>
      <Typography color="text.secondary" textAlign="center">Send ETH to this address on {network?.name || 'a supported network'} only.</Typography></Stack></DialogContent>
    <DialogActions sx={{ p: 2 }}><Button onClick={() => navigator.clipboard.writeText(address)}>Copy address</Button><Button variant="contained" onClick={onClose}>Done</Button></DialogActions></Dialog>);
}
