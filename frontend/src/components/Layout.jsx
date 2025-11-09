import React, { useState } from 'react';
import { Wallet, TrendingUp, History, Users, UserPlus, Menu, X } from 'lucide-react';

<<<<<<< HEAD
export default function Layout() {
<<<<<<< HEAD
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-700 text-white p-5">
        <h2 className="text-2xl font-bold mb-8">Membership Bank</h2>
        <nav className="space-y-3">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `block px-3 py-2 rounded-md ${isActive ? "bg-blue-500" : "hover:bg-blue-600"}`
            }
          >
            Admin Panel
          </NavLink>
          <NavLink
            to="/register"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-md ${isActive ? "bg-blue-500" : "hover:bg-blue-600"}`
            }
          >
            Pendaftaran Anggota
          </NavLink>
          <NavLink
            to="/balance"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-md ${isActive ? "bg-blue-500" : "hover:bg-blue-600"}`
            }
          >
            Cek Saldo
          </NavLink>
        </nav>
      </aside>

      {/* Konten utama */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <h1 className="text-lg font-semibold text-gray-700">Dashboard Teller</h1>
          <button className="text-sm text-gray-500 hover:text-gray-700">Logout</button>
        </header>

        {/* Tempat halaman tampil */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
=======
  
>>>>>>> c9708a63df8eed5c996e22927f992e291d13ed4a
}
=======
export default function Layout({ children, activeTab, setActiveTab }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const currentUser = {
    name: 'Admin Teller',
    accountNumber: '7799021650880'
  };

  return (
    <div className="flex h-screen w-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-0'} bg-white border-r transition-all duration-300 overflow-hidden shadow-sm flex-shrink-0`}>
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
              <Wallet className="text-white" size={24} />
            </div>
            <h1 className="text-xl font-bold text-gray-800">Metschoo Bank</h1>
          </div>

          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                {currentUser.name.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-gray-800">{currentUser.name}</p>
                <p className="text-xs text-gray-500">Admin</p>
              </div>
            </div>
          </div>

          <nav className="space-y-1">
            <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Main Menu</p>
            {[
              { id: 'dashboard', icon: TrendingUp, label: 'Dashboard' },
              { id: 'transactions', icon: History, label: 'Transactions' },
              { id: 'members', icon: Users, label: 'Members' },
              { id: 'register', icon: UserPlus, label: 'Register Member' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg transition ${
                  activeTab === item.id ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b p-4 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-600 hover:bg-gray-100 p-2 rounded-lg">
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">{new Date().toLocaleTimeString('id-ID')}</span>
            <span className="text-sm text-gray-500">{new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })}</span>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
>>>>>>> a79c84c76a5b1ada2319e11e664ff0e00b218998
