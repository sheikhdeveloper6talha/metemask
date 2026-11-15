import { useNavigate } from 'react-router-dom';
import ConnectWallet from '../../components/ConnectWallet/ConnectWallet';
import ReceiveModal from '../../components/ReceiveModal/ReceiveModal';
import { useWallet } from '../../hooks/useWallet';
export default function Receive() { const { address } = useWallet(); const nav = useNavigate(); return address ? <ReceiveModal open onClose={() => nav('/')} /> : <ConnectWallet />; }
