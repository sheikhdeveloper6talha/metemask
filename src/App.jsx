import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard/Dashboard';
import Send from './pages/Send/Send';
import Receive from './pages/Receive/Receive';
import Transactions from './pages/Transactions/Transactions';
import Settings from './pages/Settings/Settings';
export default function App() {
  return (<Routes><Route element={<Layout />}>
    <Route path="/" element={<Dashboard />} /><Route path="/send" element={<Send />} /><Route path="/receive" element={<Receive />} />
    <Route path="/transactions" element={<Transactions />} /><Route path="/settings" element={<Settings />} />
  </Route></Routes>);
}
