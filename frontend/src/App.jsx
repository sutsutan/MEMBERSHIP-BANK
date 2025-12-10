import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import AdminPanel from './pages/AdminPanel'; 
import CheckBalance from './pages/CheckBalance';
import RegisterMember from './pages/RegisterMember';
import UserList from './pages/UserList';
import TransactionModal from './components/TransactionModal'; 
import Auth from './pages/Auth';

const API_BASE_URL = 'http://localhost:8080/api';

export default function App() {
    // ⬇⬇⬇ CEK LOCALSTORAGE DULU ⬇⬇⬇
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        return localStorage.getItem('isLoggedIn') === 'true';
    });
    
    const [activeTab, setActiveTab] = useState('dashboard');
    const [refreshKey, setRefreshKey] = useState(0);
    const [showTransactionModal, setShowTransactionModal] = useState(false);
    const [transactionType, setTransactionType] = useState('');
    
    const [loading, setLoading] = useState(false); 
    const [transactions, setTransactions] = useState([]);
    const [members, setMembers] = useState([]);

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
        if (isLoggedIn) {
            fetchTransactions();
            fetchMembers();
        }
    }, [isLoggedIn]);

    // ⬇⬇⬇ SIMPAN KE LOCALSTORAGE ⬇⬇⬇
    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', 'true');
    };

    // ⬇⬇⬇ HAPUS DARI LOCALSTORAGE ⬇⬇⬇
    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('isLoggedIn');
        setActiveTab('dashboard');
    };

    const handleTransactionClick = (type) => {
        setTransactionType(type);
        setShowTransactionModal(true);
    };

    const handleTransactionSuccess = () => {
        fetchTransactions(); 
        fetchMembers();
        setRefreshKey(prev => prev + 1);
    };

    const handleRegisterSuccess = () => {
        fetchMembers();
        setActiveTab('members');
    };

    // JIKA BELUM LOGIN, TAMPILKAN AUTH
    if (!isLoggedIn) {
        return <Auth onLoginSuccess={handleLoginSuccess} />;
    }

    // JIKA SUDAH LOGIN, TAMPILKAN DASHBOARD
    return (
        <>
            <Layout activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout}>
                {activeTab === 'dashboard' && (
                    <AdminPanel 
                        setActiveTab={setActiveTab}
                        onTransactionClick={handleTransactionClick} 
                        refreshKey={refreshKey}
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