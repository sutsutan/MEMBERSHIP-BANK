import React, { useState, useMemo } from 'react';
import { Loader, Calendar, RefreshCw, Filter } from 'lucide-react';

const formatRupiah = (number) => {
    if (number === undefined || number === null) return '0';
    return new Intl.NumberFormat('id-ID', {
        minimumFractionDigits: 0
    }).format(number);
};

const formatDate = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return (
        date.toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        }) +
        ' ' +
        date.toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit'
        })
    );
};

const formatDateInput = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export default function CheckBalance({ transactions, loading }) {
    const [filterRange, setFilterRange] = useState("weekly");
    const [typeFilter, setTypeFilter] = useState("all");
    const [cardNumberFilter, setCardNumberFilter] = useState("");
    const [showFilters, setShowFilters] = useState(false);
    
    const today = new Date();
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(today.getDate() - 3);
    
    const [dateFrom, setDateFrom] = useState(formatDateInput(threeDaysAgo));
    const [dateTo, setDateTo] = useState(formatDateInput(today));
    const [useCustomRange, setUseCustomRange] = useState(false);

    const filteredTransactions = useMemo(() => {
        if (!transactions) return [];

        const now = new Date();
        now.setHours(23, 59, 59, 999);

        return transactions.filter((tx) => {
            const txDate = new Date(tx.waktu_transaksi);

            // Filter by type
            if (typeFilter !== "all" && tx.jenis_transaksi !== typeFilter) {
                return false;
            }

            // Filter by card number
            if (cardNumberFilter && !tx.rfid_tag.includes(cardNumberFilter)) {
                return false;
            }

            // Filter by date range
            if (useCustomRange) {
                const fromDate = new Date(dateFrom);
                fromDate.setHours(0, 0, 0, 0);
                const toDate = new Date(dateTo);
                toDate.setHours(23, 59, 59, 999);
                
                return txDate >= fromDate && txDate <= toDate;
            }

            if (filterRange === "weekly") {
                const weekAgo = new Date();
                weekAgo.setDate(now.getDate() - 7);
                weekAgo.setHours(0, 0, 0, 0);
                return txDate >= weekAgo;
            }

            if (filterRange === "monthly") {
                const monthAgo = new Date();
                monthAgo.setMonth(now.getMonth() - 1);
                monthAgo.setHours(0, 0, 0, 0);
                return txDate >= monthAgo;
            }

            return true;
        });
    }, [transactions, filterRange, typeFilter, cardNumberFilter, useCustomRange, dateFrom, dateTo]);

    const handleApplyCustomRange = () => {
        setUseCustomRange(true);
        setFilterRange("custom");
    };

    const handleReset = () => {
        const today = new Date();
        const threeDaysAgo = new Date();
        threeDaysAgo.setDate(today.getDate() - 3);
        
        setDateFrom(formatDateInput(threeDaysAgo));
        setDateTo(formatDateInput(today));
        setFilterRange("weekly");
        setTypeFilter("all");
        setCardNumberFilter("");
        setUseCustomRange(false);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader className="animate-spin text-blue-600" size={48} />
                <span className="ml-3 text-gray-600">Memuat Riwayat Transaksi...</span>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto h-full flex flex-col">

            {/* HEADER WITH MODERN CONTROLS */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-1">Transaction History</h2>
                    <p className="text-sm text-gray-500">View and filter your transaction records</p>
                </div>

                <div className="flex items-center gap-3">
                    {/* Filter Toggle Button */}
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-200 ${
                            showFilters 
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                                : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                        }`}
                    >
                        <Filter size={18} />
                        <span className="text-sm">Filters</span>
                    </button>

                    {/* WEEKLY / MONTHLY TOGGLE */}
                    <div className="flex bg-gray-100 rounded-xl p-1">
                        <button
                            onClick={() => {
                                setFilterRange("weekly");
                                setUseCustomRange(false);
                            }}
                            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                                filterRange === "weekly"
                                    ? "bg-white text-blue-600 shadow-sm"
                                    : "text-gray-600 hover:text-gray-800"
                            }`}
                        >
                            Weekly
                        </button>

                        <button
                            onClick={() => {
                                setFilterRange("monthly");
                                setUseCustomRange(false);
                            }}
                            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                                filterRange === "monthly"
                                    ? "bg-white text-blue-600 shadow-sm"
                                    : "text-gray-600 hover:text-gray-800"
                            }`}
                        >
                            Monthly
                        </button>
                    </div>
                </div>
            </div>

            {/* MODERN FILTER PANEL */}
            {showFilters && (
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 mb-6 shadow-sm border border-blue-100 animate-fadeIn">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                        
                        {/* Date From */}
                        <div className="md:col-span-3">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                <Calendar className="inline w-4 h-4 mr-1.5 mb-0.5" />
                                Start Date
                            </label>
                            <input
                                type="date"
                                value={dateFrom}
                                onChange={(e) => setDateFrom(e.target.value)}
                                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm font-medium text-gray-700"
                            />
                        </div>

                        {/* Date To */}
                        <div className="md:col-span-3">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                <Calendar className="inline w-4 h-4 mr-1.5 mb-0.5" />
                                End Date
                            </label>
                            <input
                                type="date"
                                value={dateTo}
                                onChange={(e) => setDateTo(e.target.value)}
                                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm font-medium text-gray-700"
                            />
                        </div>

                        {/* Type Filter - MODERN DROPDOWN */}
                        <div className="md:col-span-3">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Transaction Type
                            </label>
                            <div className="relative">
                                <select
                                    value={typeFilter}
                                    onChange={(e) => setTypeFilter(e.target.value)}
                                    className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm font-medium text-gray-700 appearance-none cursor-pointer hover:border-blue-300"
                                    style={{
                                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%234B5563'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'right 0.75rem center',
                                        backgroundSize: '1.25rem'
                                    }}
                                >
                                    <option value="all">🔵 All Transactions</option>
                                    <option value="DEPOSIT">💰 Deposit Only</option>
                                    <option value="WITHDRAW">💸 Withdraw Only</option>
                                </select>
                            </div>
                        </div>

                        {/* Card Number Filter - NEW */}
                        <div className="md:col-span-3">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                💳 Card Number
                            </label>
                            <input
                                type="text"
                                value={cardNumberFilter}
                                onChange={(e) => setCardNumberFilter(e.target.value)}
                                placeholder="Search by card..."
                                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm font-medium text-gray-700 placeholder-gray-400"
                            />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 mt-5">
                        <button
                            onClick={handleApplyCustomRange}
                            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg shadow-blue-200 hover:shadow-xl"
                        >
                            <Filter size={18} />
                            Apply Filters
                        </button>
                        <button
                            onClick={handleReset}
                            className="px-6 py-3 bg-white text-gray-700 border-2 border-gray-200 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center gap-2"
                        >
                            <RefreshCw size={18} />
                            Reset
                        </button>
                    </div>

                    {/* Active Filter Badges with Remove */}
                    {(useCustomRange || typeFilter !== "all" || cardNumberFilter) && (
                        <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
                            <span className="px-3 py-1.5 bg-blue-600 text-white rounded-lg font-semibold text-xs">
                                Active Filters:
                            </span>
                            
                            {useCustomRange && (
                                <span className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg font-medium text-gray-700 border-2 border-blue-200">
                                    📅 {dateFrom} → {dateTo}
                                    <button
                                        onClick={() => {
                                            setUseCustomRange(false);
                                            setFilterRange("weekly");
                                        }}
                                        className="ml-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded p-0.5 transition"
                                        title="Remove date filter"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </span>
                            )}
                            
                            {typeFilter !== "all" && (
                                <span className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg font-medium text-gray-700 border-2 border-blue-200">
                                    {typeFilter === "DEPOSIT" ? "💰" : "💸"} {typeFilter}
                                    <button
                                        onClick={() => setTypeFilter("all")}
                                        className="ml-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded p-0.5 transition"
                                        title="Remove type filter"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </span>
                            )}

                            {cardNumberFilter && (
                                <span className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg font-medium text-gray-700 border-2 border-blue-200">
                                    💳 Card: {cardNumberFilter}
                                    <button
                                        onClick={() => setCardNumberFilter("")}
                                        className="ml-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded p-0.5 transition"
                                        title="Remove card filter"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </span>
                            )}
                        </div>
                    )}
                </div>
            )}

            {/* MODERN TABLE */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 flex-1 overflow-hidden">
                <div className="overflow-auto max-h-[60vh]">

                    {filteredTransactions.length === 0 ? (
                        <div className="p-12 text-center">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Calendar className="w-8 h-8 text-gray-400" />
                            </div>
                            <p className="text-gray-500 font-medium">No transactions found</p>
                            <p className="text-sm text-gray-400 mt-1">Try adjusting your filters</p>
                        </div>
                    ) : (
                        <table className="w-full min-w-[700px] border-collapse">
                            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 sticky top-0 z-10 border-b-2 border-gray-200">
                                <tr>
                                    {['Date', 'Type', 'Card Number', 'Member', 'Amount'].map(h => (
                                        <th
                                            key={h}
                                            className={`text-${h === 'Amount' ? 'right' : 'left'} px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider`}
                                        >
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-100">
                                {filteredTransactions.map((tx, index) => {
                                    const isDeposit = tx.jenis_transaksi === 'DEPOSIT';

                                    return (
                                        <tr key={tx.id || index} className="hover:bg-blue-50 transition-colors">
                                            <td className="px-6 py-4 text-sm text-gray-600 font-medium">
                                                {formatDate(tx.waktu_transaksi)}
                                            </td>

                                            <td className="px-6 py-4">
                                                <span
                                                    className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold shadow-sm ${
                                                        isDeposit
                                                            ? 'bg-gradient-to-r from-green-400 to-green-500 text-white'
                                                            : 'bg-gradient-to-r from-red-400 to-red-500 text-white'
                                                    }`}
                                                >
                                                    {isDeposit ? '💰' : '💸'} {tx.jenis_transaksi}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4 text-sm font-mono text-gray-700 font-semibold">
                                                {tx.rfid_tag}
                                            </td>

                                            <td className="px-6 py-4 text-sm text-gray-800 font-semibold">
                                                {tx.nama || 'N/A'}
                                            </td>

                                            <td className="px-6 py-4 text-right">
                                                <span
                                                    className={`text-base font-bold ${
                                                        isDeposit ? 'text-green-600' : 'text-red-600'
                                                    }`}
                                                >
                                                    {isDeposit ? '+' : '-'} Rp {formatRupiah(tx.jumlah)}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {/* MODERN SUMMARY */}
            <div className="mt-4 flex items-center justify-between px-2">
                <div className="text-sm text-gray-600">
                    Showing <span className="font-bold text-blue-600">{filteredTransactions.length}</span> of <span className="font-bold">{transactions?.length || 0}</span> transactions
                </div>
                {(useCustomRange || typeFilter !== "all" || cardNumberFilter) && (
                    <div className="flex items-center gap-2">
                        {useCustomRange && (
                            <div className="text-xs text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full font-medium border border-blue-200">
                                📅 Custom date range
                            </div>
                        )}
                        {typeFilter !== "all" && (
                            <div className="text-xs text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full font-medium border border-blue-200">
                                {typeFilter === "DEPOSIT" ? "💰" : "💸"} {typeFilter} only
                            </div>
                        )}
                        {cardNumberFilter && (
                            <div className="text-xs text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full font-medium border border-blue-200">
                                💳 Card: {cardNumberFilter}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}