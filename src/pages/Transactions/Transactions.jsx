import { Alert, Skeleton, Stack, Typography } from '@mui/material';
import ConnectWallet from '../../components/ConnectWallet/ConnectWallet';
import TransactionTable from '../../components/TransactionTable/TransactionTable';
import { useWallet } from '../../hooks/useWallet';
import { useTransactions } from '../../hooks/useTransactions';
export default function Transactions() {
  const { address, chainId } = useWallet(); const { txs, loading, error } = useTransactions(address, chainId);
  if (!address) return <ConnectWallet />;
  return (<Stack spacing={2}><Typography variant="h5" fontWeight={700}>Transactions</Typography>{error && <Alert severity="info">{error}</Alert>}{loading ? <Skeleton variant="rounded" height={240} /> : <TransactionTable txs={txs} chainId={chainId} />}</Stack>);
}
