import { useMemo, useState } from 'react';
import { Chip, Link, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { formatAddress } from '../../utils/formatAddress';
import { NETWORKS } from '../../services/ethereum';
export default function TransactionTable({ txs, chainId }) {
  const [q, setQ] = useState(''); const [type, setType] = useState('All');
  const rows = useMemo(() => txs.filter((t) => (type === 'All' || t.type === type) && (!q || [t.hash, t.from, t.to].some((s) => s.toLowerCase().includes(q.toLowerCase())))), [txs, q, type]);
  const base = NETWORKS[chainId]?.explorer;
  return (<Stack spacing={2}>
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
      <TextField size="small" fullWidth placeholder="Search by hash or address" value={q} onChange={(e) => setQ(e.target.value)} />
      <ToggleButtonGroup size="small" exclusive value={type} onChange={(_, v) => v && setType(v)}>{['All', 'Sent', 'Received'].map((v) => <ToggleButton key={v} value={v}>{v}</ToggleButton>)}</ToggleButtonGroup></Stack>
    {rows.length === 0 ? <Paper sx={{ p: 6, textAlign: 'center' }}><Typography fontWeight={600}>No transactions found</Typography><Typography color="text.secondary">Transactions you send or receive will show up here.</Typography></Paper> :
      <TableContainer component={Paper}><Table size="small"><TableHead><TableRow>{['Type', 'Hash', 'From', 'To', 'Amount', 'Date', 'Status'].map((h) => <TableCell key={h}>{h}</TableCell>)}</TableRow></TableHead>
        <TableBody>{rows.map((t) => (<TableRow key={t.hash} hover>
          <TableCell><Chip size="small" color={t.type === 'Sent' ? 'warning' : 'success'} label={t.type} /></TableCell>
          <TableCell>{base ? <Link href={`${base}/tx/${t.hash}`} target="_blank" rel="noreferrer">{formatAddress(t.hash)}</Link> : formatAddress(t.hash)}</TableCell>
          <TableCell>{formatAddress(t.from)}</TableCell><TableCell>{formatAddress(t.to)}</TableCell>
          <TableCell>{Number(t.value).toFixed(4)} ETH</TableCell><TableCell>{t.date.toLocaleString()}</TableCell>
          <TableCell><Chip size="small" variant="outlined" color={t.status === 'Success' ? 'success' : 'error'} label={t.status} /></TableCell></TableRow>))}</TableBody></Table></TableContainer>}
  </Stack>);
}
