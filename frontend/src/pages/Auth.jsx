import React, { useState } from 'react';
import { Eye, EyeOff, TrendingUp, ArrowLeft } from 'lucide-react';

const Auth = ({ onLoginSuccess }) => {
  const [currentPage, setCurrentPage] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    
    if (!loginForm.email || !loginForm.password) {
      alert('Please fill in all fields!');
      return;
    }
    
    if (!loginForm.email.includes('@')) {
      alert('Please enter a valid email address!');
      return;
    }
    
    // Simulate successful login
    onLoginSuccess();
  };

   const TermsModal = () => (
    <div className="fixed inset-0 bg-blue bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl max-h-[80vh] overflow-y-auto p-6 m-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Terms of Use</h2>
          <button 
            onClick={() => setShowTerms(false)}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>
        <div className="text-gray-600 space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Admin Account Creation Terms</h3>
          <p>
            By creating an admin account for Metschoo Bank, you agree to the following terms:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>You must be an authorized personnel of Metschoo Bank</li>
            <li>Admin credentials must be kept confidential and secure</li>
            <li>You are responsible for all activities under your admin account</li>
            <li>Unauthorized access attempts will be logged and reported</li>
            <li>Admin privileges must be used solely for legitimate banking operations</li>
            <li>Regular password updates are mandatory for security compliance</li>
            <li>Account sharing is strictly prohibited</li>
          </ul>
          <h3 className="text-lg font-semibold text-gray-800 mt-6">Security Requirements</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Minimum 8 characters password with mixed case, numbers, and symbols</li>
            <li>Two-factor authentication is required</li>
            <li>Session timeout after 30 minutes of inactivity</li>
            <li>Access restricted to approved IP addresses</li>
          </ul>
        </div>
        <div className="mt-6 flex justify-end">
          <button 
            onClick={() => setShowTerms(false)}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  const PrivacyModal = () => (
    <div className="fixed inset-0 bg-blue bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl max-h-[80vh] overflow-y-auto p-6 m-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Privacy Policy</h2>
          <button 
            onClick={() => setShowPrivacy(false)}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>
        <div className="text-gray-600 space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Data Collection & Usage</h3>
          <p>
            Metschoo Bank is committed to protecting your privacy. This policy outlines how we handle admin account data:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>We collect only necessary information for admin account creation</li>
            <li>Personal data is encrypted and stored securely</li>
            <li>Access logs are maintained for security auditing</li>
            <li>Data is not shared with third parties without consent</li>
            <li>Admin session data is automatically purged after logout</li>
          </ul>
          <h3 className="text-lg font-semibold text-gray-800 mt-6">Information We Collect</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Email address for account identification</li>
            <li>Login timestamps and IP addresses</li>
            <li>System access patterns for security monitoring</li>
            <li>Device information for multi-factor authentication</li>
          </ul>
          <h3 className="text-lg font-semibold text-gray-800 mt-6">Data Retention</h3>
          <p>
            Admin account data is retained as per banking regulations and internal security policies. 
            Inactive accounts are automatically disabled after 90 days.
          </p>
          <p>
            By creating an admin account, you consent to the collection and use of your data as described in this policy.
          </p>
          <h3 className="text-lg font-semibold text-gray-800 mt-6">Admin Contact</h3>
          <p>
            AdminMBANK@gmail.com
          </p>
        </div>
        <div className="mt-6 flex justify-end">
          <button 
            onClick={() => setShowPrivacy(false)}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
  
  return (
    <>
      <div className="min-h-screen bg-linear-to-br from-blue-600 via-blue-700 to-blue-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
          <div className="flex items-center justify-center mb-6">
              <img src="/public/img/logo-metland.png" alt="logo metland login" width={70} />
          </div>
          
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Metschoo Bank</h1>
          <p className="text-center text-gray-500 mb-8">Admin Dashboard Login</p>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                value={loginForm.email}
                onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                onKeyPress={(e) => e.key === 'Enter' && handleLoginSubmit(e)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="admin@metschoo.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                  onKeyPress={(e) => e.key === 'Enter' && handleLoginSubmit(e)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition pr-12"
                  placeholder="Enter your password"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            
            <button
              onClick={handleLoginSubmit}
              className="w-full bg-linear-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Login to Dashboard
            </button>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-gray-600 mb-2">
              Contact admin for account creation
            </p>
            <div className="flex justify-center space-x-4 text-sm">
              <button
                onClick={() => setShowTerms(true)}
                className="text-blue-600 hover:text-blue-800 hover:underline transition duration-200"
              >
                Terms of Use
              </button>
              <span className="text-gray-400">•</span>
              <button
                onClick={() => setShowPrivacy(true)}
                className="text-blue-600 hover:text-blue-800 hover:underline transition duration-200"
              >
                Privacy Policy
              </button>
            </div>
        </div>
      </div>
    </div>
    {showTerms && <TermsModal />}
      {showPrivacy && <PrivacyModal />}
    </>
    );
};


export default Auth;