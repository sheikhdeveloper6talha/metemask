export const formatEth = (v, d = 4) => { const n = Number(v); return Number.isFinite(n) ? n.toFixed(d) : '0.0000'; };
