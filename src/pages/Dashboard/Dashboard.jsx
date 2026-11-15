import { Alert, Skeleton, Stack, Typography } from '@mui/material';
import ConnectWallet from '../../components/ConnectWallet/ConnectWallet';
import WalletCard from '../../components/WalletCard/WalletCard';
import TransactionTable from '../../components/TransactionTable/TransactionTable';
import { useWallet } from '../../hooks/useWallet';
import { useTransactions } from '../../hooks/useTransactions';
export default function Dashboard() {
  const { address, chainId, network } = useWallet();
  const { txs, loading, error } = useTransactions(address, chainId);
  if (!address) return <ConnectWallet />;
  return (<Stack spacing={3}>
    {!network && <Alert severity="warning">Unsupported network. Switch to Ethereum Mainnet or Sepolia from the header.</Alert>}
    <WalletCard />
    <Typography variant="h6" fontWeight={700}>Recent transactions</Typography>
    {error && <Alert severity="info">{error}</Alert>}
    {loading ? <Skeleton variant="rounded" height={160} /> : <TransactionTable txs={txs.slice(0, 5)} chainId={chainId} />}
  </Stack>);
}
