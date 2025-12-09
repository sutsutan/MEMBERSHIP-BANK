import React, { useState, useRef, useEffect } from 'react';
import { Loader, User, DollarSign, CreditCard } from 'lucide-react';

const API_BASE_URL = 'http://localhost:8080/api';

const formatRupiah = (number) => {
    if (number === undefined || number === null) return '0';
    return new Intl.NumberFormat('id-ID', {
        minimumFractionDigits: 0
    }).format(number);
};

export default function TransactionModal({ show, transactionType, onClose, onSuccess }) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        rfid: '',
        amount: ''
    });
    const [userData, setUserData] = useState(null);
    const [isRfidValidated, setIsRfidValidated] = useState(false);
    const rfidInputRef = useRef(null);

    useEffect(() => {
        if (show) {
            setFormData({ rfid: '', amount: '' });
            setUserData(null);
            setIsRfidValidated(false);
            
            const timeoutId = setTimeout(() => {
                rfidInputRef.current?.focus();
            }, 100); 
            
            return () => clearTimeout(timeoutId);
        }
    }, [show]);

    const fetchUserByRfid = async (rfidTag) => {
        if (rfidTag.length !== 10 || loading) return;
        
        setLoading(true);
        setUserData(null);
        setIsRfidValidated(false);

        try {
            const response = await fetch(`${API_BASE_URL}/user/rfid/${rfidTag}`);
            const data = await response.json();

            if (response.ok) {
                setUserData(data);
                setIsRfidValidated(true);
            } else {
                throw new Error(data.message || 'Pengguna tidak ditemukan untuk RFID ini.');
            }
        } catch (err) {
            alert(`Gagal memuat data pengguna: ${err.message}`);
            setFormData(prev => ({ ...prev, rfid: '' }));
            rfidInputRef.current?.focus(); 
        } finally {
            setLoading(false);
        }
    };
    
    const handleRfidChange = (e) => {
        const value = e.target.value;
        setFormData({ ...formData, rfid: value });
        
        if (value.length === 10) {
            fetchUserByRfid(value);
        } else {
            setUserData(null);
            setIsRfidValidated(false);
        }
    };

    const handleTransaction = async () => {
        if (!formData.rfid || !formData.amount || !transactionType || !isRfidValidated) {
            alert('Make sure the RFID Card has been validated and the amount has been filled in.!');
            return;
        }
        const amountValue = parseInt(formData.amount);
        if (amountValue <= 0 || isNaN(amountValue)) {
            alert('amount has to be a positive number!');
            return;
        }

        try {
            setLoading(true);
            
            const response = await fetch(`${API_BASE_URL}/transaction`, { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    rfid_tag: formData.rfid,
                    jumlah: amountValue,
                    jenis_transaksi: transactionType.toUpperCase(),
                })
            });

            const result = await response.json(); 
            
            if (response.ok) {
                const formattedBalance = parseFloat(result.saldo_baru).toLocaleString('id-ID');
                alert(`Transactions ${transactionType.toUpperCase()} sucess!\nnew balance: Rp ${formattedBalance}`);
                
                setFormData({ rfid: '', amount: '' });
                setUserData(null);
                setIsRfidValidated(false);

                if (onSuccess) onSuccess();
                onClose();
            } else {
                throw new Error(result.message || 'Transactions failed processed by server.');
            }
        } catch (err) {
            alert(`Transaction Failed: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 capitalize">
                    {transactionType.toUpperCase()} Money
                </h3>
                <div className="space-y-4">
                    {/* Input RFID */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                        <input
                            ref={rfidInputRef}
                            type="text"
                            maxLength="10"
                            value={formData.rfid}
                            onChange={handleRfidChange}
                            disabled={loading}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 font-mono"
                            placeholder="Scan or enter Card Number"
                        />
                    </div>

                    {/* Input Amount */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Amount (Rp)</label>
                        <input
                            type="number"
                            value={formData.amount}
                            onChange={e => setFormData({ ...formData, amount: e.target.value })}
                            disabled={loading || !isRfidValidated} 
                            className="w-full border border-gray-300 rounded-lg px-4 py-3"
                            placeholder="Enter amount"
                        />
                    </div>
                    
                    {/* Data Pengguna (Sekilas Data) - Ditampilkan di sini */}
                    {isRfidValidated && userData && (
                        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg space-y-2">
                            <h4 className="font-bold text-blue-800 flex items-center">
                                <User size={18} className="mr-2"/> User: {userData.nama || 'N/A'}
                            </h4>
                            <p className="text-sm text-gray-700 ml-6">
                                <CreditCard size={10} className="inline mr-1 text-gray-600"/> RFID: <span className="font-mono text-gray-800">{formData.rfid}</span>
                            </p>
                            <p className="text-lg font-bold text-blue-600 flex items-center">
                                <DollarSign size={20} className="mr-2"/> Balance: Rp {formatRupiah(userData.saldo)}
                            </p>
                        </div>
                    )}
                    
                    {/* Tombol Aksi (Tampilan Original) */}
                    <div className="flex space-x-3 mt-6">
                        <button
                            onClick={handleTransaction}
                            disabled={loading || !isRfidValidated || !formData.amount || parseInt(formData.amount) <= 0}
                            className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 flex items-center justify-center"
                        >
                            {loading ? <Loader className="animate-spin mr-2" size={20} /> : null}
                            {loading ? 'Processing...' : 'Confirm'}
                        </button>
                        <button
                            onClick={() => {
                                setFormData({ rfid: '', amount: '' });
                                setUserData(null);
                                setIsRfidValidated(false);
                                onClose();
                            }}
                            className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}