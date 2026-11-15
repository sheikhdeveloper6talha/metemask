import { Button, Paper, Stack, Typography } from '@mui/material';
import { useWallet } from '../../hooks/useWallet';
export default function Settings() {
  const { address, disconnect } = useWallet();
  return (<Stack spacing={2}><Typography variant="h5" fontWeight={700}>Settings</Typography>
    <Paper sx={{ p: 3 }}><Typography fontWeight={600}>Wallet connection</Typography>
      <Typography color="text.secondary" sx={{ mb: 2 }}>Disconnecting clears this app's connection. To revoke site access fully, do it in MetaMask. This app never sees your seed phrase or private keys.</Typography>
      <Button color="error" variant="outlined" disabled={!address} onClick={disconnect}>Disconnect wallet</Button></Paper></Stack>);
}
