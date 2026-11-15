import { useEffect, useState } from 'react';
import { fetchTransactions } from '../services/transactionService';
export function useTransactions(address, chainId) {
  const [txs, setTxs] = useState([]); const [loading, setLoading] = useState(false); const [error, setError] = useState(null);
  useEffect(() => {
    if (!address || !chainId) return;
    let live = true; setLoading(true); setError(null);
    fetchTransactions(address, chainId).then((r) => live && setTxs(r)).catch((e) => live && setError(e.message)).finally(() => live && setLoading(false));
    return () => { live = false; };
  }, [address, chainId]);
  return { txs, loading, error };
}
