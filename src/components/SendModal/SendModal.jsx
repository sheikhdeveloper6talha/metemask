import { useState } from 'react';
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Link, Stack, TextField, Typography } from '@mui/material';
import { getProvider, NETWORKS, parseEther, validateSend } from '../../services/ethereum';
import { useWallet } from '../../hooks/useWallet';
export default function SendModal({ open, onClose }) {
  const { balance, chainId, network, refresh } = useWallet();
  const [to, setTo] = useState(''); const [amount, setAmount] = useState(''); const [note, setNote] = useState('');
  const [step, setStep] = useState('form'); // form | confirm | pending | success | failed
  const [err, setErr] = useState(null); const [hash, setHash] = useState(null);
  const reset = () => { setStep('form'); setErr(null); setHash(null); setTo(''); setAmount(''); setNote(''); onClose(); };
  const review = () => { const m = validateSend(to, amount, balance); m ? setErr(m) : (setErr(null), setStep('confirm')); };
  const send = async () => {
    setStep('pending'); setErr(null);
    try {
      const signer = await getProvider().getSigner(); // MetaMask asks the user to approve
      const tx = await signer.sendTransaction({ to, value: parseEther(String(amount)) });
      setHash(tx.hash); await tx.wait(); await refresh(); setStep('success');
    } catch (e) { setErr(e.code === 'ACTION_REJECTED' ? 'You rejected the transaction in MetaMask.' : e.shortMessage || e.message); setStep('failed'); }
  };
  const link = NETWORKS[chainId] && hash ? `${NETWORKS[chainId].explorer}/tx/${hash}` : null;
  return (<Dialog open={open} onClose={step === 'pending' ? undefined : reset} fullWidth maxWidth="xs">
    <DialogTitle>Send ETH</DialogTitle>
    <DialogContent><Stack spacing={2} sx={{ pt: 1 }}>
      {err && <Alert severity="error">{err}</Alert>}
      {step === 'form' && <>
        <TextField label="Recipient address" value={to} onChange={(e) => setTo(e.target.value.trim())} placeholder="0x…" />
        <TextField label="Amount (ETH)" value={amount} onChange={(e) => setAmount(e.target.value)} helperText={`Available: ${balance ?? 0} ETH`} />
        <TextField label="Note (optional, stays in this app)" value={note} onChange={(e) => setNote(e.target.value)} /></>}
      {step === 'confirm' && <><Typography>Send <b>{amount} ETH</b> on <b>{network?.name}</b> to</Typography><Typography sx={{ wordBreak: 'break-all' }}>{to}</Typography>{note && <Typography color="text.secondary">Note: {note}</Typography>}<Typography color="text.secondary">Network fees are set in MetaMask.</Typography></>}
      {step === 'pending' && <Alert severity="info">Waiting for MetaMask approval and network confirmation…</Alert>}
      {hash && <Typography sx={{ wordBreak: 'break-all' }} variant="body2">Hash: {hash} {link && <Link href={link} target="_blank" rel="noreferrer">View on Etherscan</Link>}</Typography>}
      {step === 'success' && <Alert severity="success">Transaction confirmed.</Alert>}
    </Stack></DialogContent>
    <DialogActions sx={{ p: 2 }}>
      {step === 'form' && <><Button onClick={reset}>Cancel</Button><Button variant="contained" onClick={review}>Review</Button></>}
      {step === 'confirm' && <><Button onClick={() => setStep('form')}>Back</Button><Button variant="contained" onClick={send}>Confirm in MetaMask</Button></>}
      {(step === 'success' || step === 'failed') && <Button variant="contained" onClick={reset}>Close</Button>}
    </DialogActions></Dialog>);
}
