import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import AdminPanel from './pages/AdminPanel'; 
import CheckBalance from './pages/CheckBalance'; // Halaman Transaksi
import RegisterMember from './pages/RegisterMember';
import UserList from './pages/UserList';
import TransactionModal from './components/TransactionModal'; 

// --- PENTING: Gunakan Port 8080 untuk Backend Supabase Anda ---
const API_BASE_URL = 'http://localhost:8080/api';

export default function App() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [showTransactionModal, setShowTransactionModal] = useState(false);
    const [transactionType, setTransactionType] = useState('');
    
    const [loading, setLoading] = useState(false); 
    const [transactions, setTransactions] = useState([]);
    const [members, setMembers] = useState([]);

    // Mengambil SEMUA riwayat transaksi
    const fetchTransactions = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_BASE_URL}/transaksi/riwayat`);
            if (!response.ok) throw new Error('Gagal mengambil riwayat transaksi.');
            const data = await response.json();
            setTransactions(data); 
        } catch (err) {
            console.error('Error fetching all transactions:', err.message);
            setTransactions([]); 
        } finally {
            setLoading(false);
        }
    };

    // Mengambil SEMUA daftar anggota
    const fetchMembers = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/anggota`);
            if (!response.ok) throw new Error('Gagal mengambil daftar anggota.');
            const data = await response.json();
            setMembers(data); 
        } catch (err) {
            console.error('Error fetching all members:', err.message);
            setMembers([]);
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

    // --- REFRESH DATA SETELAH BERHASIL ---
    const handleTransactionSuccess = () => {
        fetchTransactions();
        fetchMembers();
    };

    const handleRegisterSuccess = () => {
        fetchMembers();
        setActiveTab('members');
    };
    // ------------------------------------

    return (
        <>
            <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
                {activeTab === 'dashboard' && (
                    <AdminPanel 
                        onTransactionClick={handleTransactionClick}
                    />
                )}
                {activeTab === 'transactions' && (
                    <CheckBalance transactions={transactions} loading={loading} />
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