import { useNavigate } from 'react-router-dom';
import ConnectWallet from '../../components/ConnectWallet/ConnectWallet';
import SendModal from '../../components/SendModal/SendModal';
import { useWallet } from '../../hooks/useWallet';
export default function Send() { const { address } = useWallet(); const nav = useNavigate(); return address ? <SendModal open onClose={() => nav('/')} /> : <ConnectWallet />; }
