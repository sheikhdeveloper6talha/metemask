import { Alert, Box, Button, Stack, Typography } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { useWallet } from '../../hooks/useWallet';
export default function ConnectWallet() {
  const { connect, loading, error } = useWallet();
  return (<Stack alignItems="center" spacing={2} sx={{ py: 10, textAlign: 'center' }}>
    <Box sx={{ p: 2.5, borderRadius: '50%', bgcolor: 'rgba(124,92,255,.15)' }}><AccountBalanceWalletIcon color="primary" sx={{ fontSize: 48 }} /></Box>
    <Typography variant="h5" fontWeight={700}>Connect your wallet</Typography>
    <Typography color="text.secondary" maxWidth={380}>Connect MetaMask to see your balance and send or receive ETH. Every transaction is approved in MetaMask.</Typography>
    {error && <Alert severity="warning">{error}</Alert>}
    <Button variant="contained" size="large" onClick={connect} disabled={loading}>{loading ? 'Waiting for MetaMask…' : 'Connect MetaMask'}</Button>
  </Stack>);
}
