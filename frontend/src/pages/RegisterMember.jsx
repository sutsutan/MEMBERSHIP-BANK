import React, { useState } from 'react';
import { Loader } from 'lucide-react';

const API_BASE_URL = 'http://localhost:8080/api';

export default function RegisterMember({ onRegisterSuccess }) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        rfid: '',
        deposit: ''
    });

    const handleCardNumberChange = (e) => {
        const value = e.target.value;
        // Hanya terima angka, max 10 digit
        if (/^\d{0,10}$/.test(value)) {
            setFormData({ ...formData, rfid: value });
        }
    };

    const handleRegister = async () => {
        if (!formData.name || !formData.rfid || !formData.deposit) {
            alert('Semua field harus diisi!');
            return;
        }

        if (formData.rfid.length !== 10) {
            alert('Card Number harus 10 digit!');
            return;
        }

        const initialDepositValue = parseInt(formData.deposit); 
        
        if (initialDepositValue < 10000 || isNaN(initialDepositValue)) {
            alert('Initial Deposit minimal Rp 10,000!');
            return;
        }

        try {
            setLoading(true);
            
            const response = await fetch(`${API_BASE_URL}/register/member`, { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nama: formData.name,
                    rfid_tag: formData.rfid,
                    initial_deposit: initialDepositValue 
                })
            });

            const result = await response.json(); 
            
            if (response.ok) {
                alert(`Member ${formData.name} berhasil didaftarkan!`);
                setFormData({ name: '', rfid: '', deposit: '' }); 
                if (onRegisterSuccess) onRegisterSuccess();
            } else {
                throw new Error(result.message || 'Pendaftaran gagal diproses oleh server.');
            }
        } catch (err) {
            alert(`Pendaftaran gagal: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Register New Member</h2>
                <p className="text-gray-500">Add a new member to the system</p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="space-y-6">
                    
                    {/* Full Name */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Full Name
                        </label>
                        <input
                            type="text"
                            placeholder="Enter full name"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-700 font-medium"
                        />
                    </div>

                    {/* Card Number - 10 DIGIT ONLY */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            💳 Card Number
                        </label>
                        <input
                            type="text"
                            placeholder="10 digit number only"
                            value={formData.rfid}
                            onChange={handleCardNumberChange}
                            maxLength={10}
                            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-700 font-mono font-bold text-lg"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            {formData.rfid.length}/10 digits
                        </p>
                    </div>

                    {/* Initial Deposit */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Initial Deposit
                        </label>
                        <input
                            type="number"
                            placeholder="Minimum Rp 10,000"
                            value={formData.deposit}
                            onChange={e => setFormData({ ...formData, deposit: e.target.value })}
                            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-700 font-medium"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Minimum deposit: Rp 10,000
                        </p>
                    </div>

                    {/* Register Button */}
                    <button
                        onClick={handleRegister}
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed flex items-center justify-center shadow-lg hover:shadow-xl transition-all mt-8"
                    >
                        {loading ? (
                            <>
                                <Loader className="animate-spin mr-2" size={24} />
                                Processing...
                            </>
                        ) : (
                            <>
                                Register Member
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}