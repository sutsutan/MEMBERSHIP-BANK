import React from 'react';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';

export default function CheckBalance({ transactions }) {
  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Transaction History</h2>
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {['Date', 'Type', 'RFID', 'Member', 'Amount'].map(h => (
                <th key={h} className={`text-${h === 'Amount' ? 'right' : 'left'} p-4 text-sm font-semibold text-gray-600`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {transactions.map(tx => (
              <tr key={tx.id} className="border-t hover:bg-gray-50">
                <td className="p-4 text-sm text-gray-600">{tx.date}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    tx.type === 'deposit' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {tx.type === 'deposit' ? 'Deposit' : 'Withdraw'}
                  </span>
                </td>
                <td className="p-4 text-sm font-mono text-gray-600">{tx.rfid}</td>
                <td className="p-4 text-sm text-gray-800 font-medium">{tx.member}</td>
                <td className="p-4 text-right">
                  <span className={`font-semibold ${tx.type === 'deposit' ? 'text-green-600' : 'text-red-600'}`}>
                    {tx.type === 'deposit' ? '+' : '-'} Rp {tx.amount.toLocaleString('id-ID')}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}