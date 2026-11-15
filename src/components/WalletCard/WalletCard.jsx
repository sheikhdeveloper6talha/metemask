import { useState } from 'react';
import { Box, Button, IconButton, Skeleton, Stack, Tooltip, Typography } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '../../hooks/useWallet';
import { formatEth } from '../../utils/formatEther';
import { formatAddress } from '../../utils/formatAddress';
export default function WalletCard() {
  const { address, balance, network } = useWallet();
  const nav = useNavigate(); const [copied, setCopied] = useState(false);
  const copy = () => { navigator.clipboard.writeText(address); setCopied(true); setTimeout(() => setCopied(false), 1500); };
  return (<Box sx={{ p: { xs: 3, md: 4 }, borderRadius: 5, color: '#fff', background: 'linear-gradient(135deg,#5b3df5 0%,#2f6bff 100%)', boxShadow: '0 20px 50px rgba(91,61,245,.35)' }}>
    <Typography sx={{ opacity: .8 }}>Total balance on {network?.name || 'an unsupported network'}</Typography>
    {balance === null ? <Skeleton width={200} height={64} /> : <Typography variant="h3" fontWeight={700}>{formatEth(balance)} ETH</Typography>}
    <Stack direction="row" alignItems="center" spacing={.5} sx={{ my: 2 }}>
      <Typography sx={{ opacity: .9 }}>{formatAddress(address)}</Typography>
      <Tooltip title={copied ? 'Copied' : 'Copy address'}><IconButton size="small" onClick={copy} sx={{ color: 'inherit' }}><ContentCopyIcon fontSize="small" /></IconButton></Tooltip></Stack>
    <Stack direction="row" spacing={1.5}>
      <Button variant="contained" sx={{ bgcolor: '#fff', color: '#2a1fa8', '&:hover': { bgcolor: '#e8e6ff' } }} onClick={() => nav('/send')}>Send</Button>
      <Button variant="outlined" sx={{ color: '#fff', borderColor: 'rgba(255,255,255,.6)' }} onClick={() => nav('/receive')}>Receive</Button></Stack></Box>);
}
