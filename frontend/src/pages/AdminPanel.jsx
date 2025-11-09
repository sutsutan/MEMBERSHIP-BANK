import React, { useState } from 'react';
import { Eye, EyeOff, Copy, Check, DollarSign, History, TrendingUp, Users, ArrowDownLeft, ArrowUpRight } from 'lucide-react';

export default function AdminPanel({ transactions, members, setActiveTab, onTransactionClick }) {
  const [showBalance, setShowBalance] = useState(true);
  const [copied, setCopied] = useState(false);

  const currentUser = {
    name: 'Admin Teller',
    accountNumber: '7799021650880',
    balance: 1191860,
    currency: 'IDR'
  };

  const stats = {
    totalBalance: members.reduce((sum, m) => sum + (m.balance || 0), 0),
    pendingTransactions: 3200,
    transactionValue: transactions.reduce((sum, t) => sum + t.amount, 0),
    activeMember: members.length
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Balance Card */}
        <div className="lg:col-span-2 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-lg font-bold">{currentUser.name.charAt(0)}</span>
              </div>
              <div>
                <p className="text-sm opacity-90">Good Evening</p>
                <p className="font-semibold">{currentUser.name}</p>
              </div>
            </div>
            <button onClick={() => setShowBalance(!showBalance)} className="p-2 bg-white/20 rounded-lg hover:bg-white/30">
              {showBalance ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>

          <div className="mb-6">
            <p className="text-sm opacity-90 mb-1">Available Balance</p>
            <p className="text-4xl font-bold">
              {showBalance ? `${stats.totalBalance.toLocaleString('id-ID')} ${currentUser.currency}` : '••••••••'}
            </p>
          </div>

          <div className="flex items-center justify-between bg-white/10 rounded-xl p-4">
            <div>
              <p className="text-xs opacity-75 mb-1">Your Account Number</p>
              <p className="font-mono font-semibold">{currentUser.accountNumber}</p>
            </div>
            <button 
              onClick={() => {
                navigator.clipboard.writeText(currentUser.accountNumber);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }} 
              className="p-2 bg-white/20 rounded-lg hover:bg-white/30"
            >
              {copied ? <Check size={20} /> : <Copy size={20} />}
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-4">Account Statistics</h3>
          <div className="space-y-4">
            {[
              { icon: DollarSign, label: 'Total Balance', value: stats.totalBalance, color: 'blue' },
              { icon: History, label: 'Pending Trans.', value: stats.pendingTransactions, color: 'yellow' },
              { icon: TrendingUp, label: 'Trans. Value', value: stats.transactionValue, color: 'green' },
              { icon: Users, label: 'Active Member', value: stats.activeMember, color: 'purple' }
            ].map((stat, i) => (
              <div key={i} className="flex items-center space-x-3">
                <div className={`w-10 h-10 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                  <stat.icon className={`text-${stat.color}-600`} size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                  <p className="font-semibold text-gray-800">{stat.value.toLocaleString('id-ID')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
        <h3 className="font-semibold text-gray-800 mb-4">What would you like to do today?</h3>
        <p className="text-sm text-gray-500 mb-4">Choose from our popular actions below</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Deposit', icon: ArrowDownLeft, color: 'green', action: () => onTransactionClick('deposit') },
            { label: 'Withdraw', icon: ArrowUpRight, color: 'red', action: () => onTransactionClick('withdraw') },
            { label: 'History', icon: History, color: 'purple', action: () => setActiveTab('transactions') },
            { label: 'Members', icon: Users, color: 'blue', action: () => setActiveTab('members') }
          ].map((btn, i) => (
            <button key={i} onClick={btn.action} className="flex flex-col items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
              <div className={`w-12 h-12 bg-${btn.color}-100 rounded-xl flex items-center justify-center mb-3`}>
                <btn.icon className={`text-${btn.color}-600`} size={24} />
              </div>
              <span className="text-sm font-medium text-gray-700">{btn.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="font-semibold text-gray-800 mb-4">Recent Transactions</h3>
        <div className="space-y-3">
          {transactions.slice(0, 5).map(tx => (
            <div key={tx.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  tx.type === 'deposit' ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  {tx.type === 'deposit' ? 
                    <ArrowDownLeft className="text-green-600" size={20} /> : 
                    <ArrowUpRight className="text-red-600" size={20} />
                  }
                </div>
                <div>
                  <p className="font-medium text-gray-800">{tx.member}</p>
                  <p className="text-xs text-gray-500">RFID: {tx.rfid}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-semibold ${tx.type === 'deposit' ? 'text-green-600' : 'text-red-600'}`}>
                  {tx.type === 'deposit' ? '+' : '-'} Rp {tx.amount.toLocaleString('id-ID')}
                </p>
                <p className="text-xs text-gray-500">{tx.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}