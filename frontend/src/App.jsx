import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import AdminPanel from './pages/AdminPanel';
import CheckBalance from './pages/CheckBalance';
import RegisterMember from './pages/RegisterMember';
import UserList from './pages/UserList';
import TransactionModal from './components/TransactionModal';

const API_BASE_URL = 'http://localhost:3000/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [transactionType, setTransactionType] = useState('');
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [members, setMembers] = useState([]);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/transactions`);
      if (!response.ok) throw new Error('Failed');
      const data = await response.json();
      setTransactions(data);
    } catch (err) {
      setTransactions([
        { id: 1, type: 'deposit', rfid: '12345678901234', amount: 500000, date: '2024-11-06 10:30', member: 'Iman Imin' },
        { id: 2, type: 'withdraw', rfid: '98765432109876', amount: 200000, date: '2024-11-06 09:15', member: 'Papoy Pipoy' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const fetchMembers = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/members`);
      if (!response.ok) throw new Error('Failed');
      const data = await response.json();
      setMembers(data);
    } catch (err) {
      setMembers([
        { id: 1, name: 'Iman Imin', rfid: '12345678901234', balance: 5000000 },
        { id: 2, name: 'Papoy Pipuy', rfid: '98765432109876', balance: 3000000 }
      ]);
    }
  };

  useEffect(() => {
    fetchTransactions();
    fetchMembers();
  }, []);

  const handleTransactionClick = (type) => {
    setTransactionType(type);
    setShowTransactionModal(true);
  };

  const handleTransactionSuccess = () => {
    fetchTransactions();
    fetchMembers();
  };

  const handleRegisterSuccess = () => {
    fetchMembers();
  };

  return (
    <>
      <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
        {activeTab === 'dashboard' && (
          <AdminPanel 
            transactions={transactions} 
            members={members}
            setActiveTab={setActiveTab}
            onTransactionClick={handleTransactionClick}
          />
        )}
        {activeTab === 'transactions' && (
          <CheckBalance transactions={transactions} />
        )}
        {activeTab === 'members' && (
          <UserList members={members} loading={loading} />
        )}
        {activeTab === 'register' && (
          <RegisterMember onRegisterSuccess={handleRegisterSuccess} />
        )}
      </Layout>

      <TransactionModal 
        show={showTransactionModal}
        transactionType={transactionType}
        onClose={() => setShowTransactionModal(false)}
        onSuccess={handleTransactionSuccess}
      />
    </>
  );
}
