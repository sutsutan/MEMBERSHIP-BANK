import React, { useState } from 'react';
import { Eye, EyeOff, TrendingUp, ArrowLeft } from 'lucide-react';

const Auth = ({ onLoginSuccess }) => {
  const [currentPage, setCurrentPage] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });
  
  const [signupForm, setSignupForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
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

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    
    if (!signupForm.fullName || !signupForm.email || !signupForm.password || !signupForm.confirmPassword) {
      alert('Please fill in all fields!');
      return;
    }
    
    if (!signupForm.email.includes('@')) {
      alert('Please enter a valid email address!');
      return;
    }
    
    if (signupForm.password.length < 6) {
      alert('Password must be at least 6 characters long!');
      return;
    }
    
    if (signupForm.password !== signupForm.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    // Simulate successful signup
    alert('Account created successfully! Please login.');
    setCurrentPage('login');
    setSignupForm({
      fullName: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  };

  // Login Page
  if (currentPage === 'login') {
    return (
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
            <p className="text-gray-600">
              Don't have an account?{' '}
              <button
                onClick={() => setCurrentPage('signup')}
                className="text-blue-600 font-semibold hover:text-blue-700 transition"
              >
                Sign Up
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Sign Up Page
  if (currentPage === 'signup') {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-600 via-blue-700 to-blue-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
          <button
            onClick={() => setCurrentPage('login')}
            className="flex items-center text-gray-600 hover:text-gray-800 mb-6 transition"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Login
          </button>
          
          <div className="flex items-center justify-center mb-6">
            <div className="bg-linear-to-br from-blue-600 to-blue-800 p-4 rounded-2xl">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Create Account</h1>
          <p className="text-center text-gray-500 mb-8">Join Metschoo Bank Admin</p>
          
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                value={signupForm.fullName}
                onChange={(e) => setSignupForm({...signupForm, fullName: e.target.value})}
                onKeyPress={(e) => e.key === 'Enter' && handleSignupSubmit(e)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="Enter your full name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                value={signupForm.email}
                onChange={(e) => setSignupForm({...signupForm, email: e.target.value})}
                onKeyPress={(e) => e.key === 'Enter' && handleSignupSubmit(e)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="admin@metschoo.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={signupForm.password}
                  onChange={(e) => setSignupForm({...signupForm, password: e.target.value})}
                  onKeyPress={(e) => e.key === 'Enter' && handleSignupSubmit(e)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition pr-12"
                  placeholder="Minimum 6 characters"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
              <input
                type={showPassword ? "text" : "password"}
                value={signupForm.confirmPassword}
                onChange={(e) => setSignupForm({...signupForm, confirmPassword: e.target.value})}
                onKeyPress={(e) => e.key === 'Enter' && handleSignupSubmit(e)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="Re-enter your password"
              />
            </div>
            
            <button
              onClick={handleSignupSubmit}
              className="w-full bg-linear-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Create Account
            </button>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <button
                onClick={() => setCurrentPage('login')}
                className="text-blue-600 font-semibold hover:text-blue-700 transition"
              >
                Login
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }
};

export default Auth;