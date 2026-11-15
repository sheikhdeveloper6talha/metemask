import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { formatEther } from 'ethers';
import { getProvider, hasMetaMask, NETWORKS, switchNetwork } from '../services/ethereum';
const Ctx = createContext(null);
export const useWallet = () => useContext(Ctx);
export function WalletProvider({ children }) {
  const [address, setAddress] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const refresh = useCallback(async (addr = address) => {
    if (!addr || !hasMetaMask()) return;
    const p = getProvider();
    setBalance(formatEther(await p.getBalance(addr)));
    setChainId(Number((await p.getNetwork()).chainId));
  }, [address]);
  const connect = async () => {
    if (!hasMetaMask()) { setError('MetaMask is not installed. Install it from metamask.io and reload.'); return; }
    setLoading(true); setError(null);
    try {
      const [a] = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAddress(a); await refresh(a);
    } catch (e) { setError(e.code === 4001 ? 'Connection request was rejected.' : e.message); }
    setLoading(false);
  };
  const disconnect = () => { setAddress(null); setBalance(null); }; // clears app state only
  useEffect(() => {
    if (!hasMetaMask()) return;
    const onAccounts = (a) => (a.length ? (setAddress(a[0]), refresh(a[0])) : disconnect());
    const onChain = () => refresh();
    window.ethereum.on('accountsChanged', onAccounts); window.ethereum.on('chainChanged', onChain);
    return () => { window.ethereum.removeListener('accountsChanged', onAccounts); window.ethereum.removeListener('chainChanged', onChain); };
  }, [refresh]);
  const network = NETWORKS[chainId] || null;
  const change = async (hex) => { try { await switchNetwork(hex); } catch (e) { setError(e.message); } };
  return <Ctx.Provider value={{ address, chainId, network, balance, loading, error, setError, connect, disconnect, refresh, switchNetwork: change }}>{children}</Ctx.Provider>;
}
