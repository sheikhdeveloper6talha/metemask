import { formatEther } from 'ethers';
// Real data from Etherscan API V2. VITE_ vars are visible in the browser bundle, so use a restricted key.
export async function fetchTransactions(address, chainId) {
  const key = import.meta.env.VITE_ETHERSCAN_API_KEY;
  if (!key) throw new Error('Add VITE_ETHERSCAN_API_KEY to .env to load transaction history.');
  const url = `https://api.etherscan.io/v2/api?chainid=${chainId}&module=account&action=txlist&address=${address}&sort=desc&page=1&offset=50&apikey=${key}`;
  const res = await fetch(url); const data = await res.json();
  if (data.status === '0' && data.message !== 'No transactions found') throw new Error(typeof data.result === 'string' ? data.result : data.message);
  return (Array.isArray(data.result) ? data.result : []).map((t) => ({
    hash: t.hash, from: t.from, to: t.to, value: formatEther(t.value),
    date: new Date(Number(t.timeStamp) * 1000), status: t.isError === '0' ? 'Success' : 'Failed',
    type: t.from.toLowerCase() === address.toLowerCase() ? 'Sent' : 'Received',
  }));
}
