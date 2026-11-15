import { BrowserProvider, isAddress, parseEther, formatEther } from 'ethers';
export const NETWORKS = {
  1: { name: 'Ethereum Mainnet', hex: '0x1', explorer: 'https://etherscan.io' },
  11155111: { name: 'Sepolia Testnet', hex: '0xaa36a7', explorer: 'https://sepolia.etherscan.io' },
};
export const hasMetaMask = () => typeof window !== 'undefined' && !!window.ethereum;
export const getProvider = () => new BrowserProvider(window.ethereum);
export const switchNetwork = (hex) => window.ethereum.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: hex }] });
export const validateSend = (to, amount, balance) => {
  if (!isAddress(to)) return 'Enter a valid Ethereum address.';
  let wei; try { wei = parseEther(String(amount)); } catch { return 'Enter a valid amount.'; }
  if (wei <= 0n) return 'Amount must be greater than 0.';
  if (wei > parseEther(String(balance || 0))) return 'Amount exceeds your balance.';
  return null;
};
export { formatEther, parseEther };
