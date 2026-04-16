import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Login() {
  const { login } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (role: 'buyer' | 'inspector' | 'admin') => {
    setError('');
    const success = login(email, password, role);
    if (success) {
      if (role === 'buyer') navigate('/buyer');
      else if (role === 'inspector') navigate('/inspector');
      else navigate('/admin');
    } else {
      setError('Invalid credentials. Try any email with the selected role.');
    }
  };

  const fillDemoCredentials = (role: 'buyer' | 'inspector' | 'admin') => {
    const emails = { buyer: 'buyer@demo.com', inspector: 'inspector@demo.com', admin: 'admin@demo.com' };
    setEmail(emails[role]);
    setPassword('password');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 group">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center group-hover:bg-blue-700 transition-colors">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">
              Sure<span className="text-blue-600">Report</span>
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-6 mb-2">Welcome back</h1>
          <p className="text-gray-500 text-sm">Sign in to your account to continue</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg mb-5">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400 pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <button
              onClick={() => handleLogin('buyer')}
              className="w-full py-3 px-4 bg-blue-600 text-white rounded-xl font-semibold text-sm hover:bg-blue-700 transition-all duration-150 shadow-sm hover:shadow-blue-200 hover:shadow-md"
            >
              Login as Buyer
            </button>
            <button
              onClick={() => handleLogin('inspector')}
              className="w-full py-3 px-4 bg-gray-800 text-white rounded-xl font-semibold text-sm hover:bg-gray-900 transition-all duration-150"
            >
              Login as Inspector
            </button>
            <button
              onClick={() => handleLogin('admin')}
              className="w-full py-3 px-4 bg-white text-gray-700 rounded-xl font-semibold text-sm border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-150"
            >
              Login as Admin
            </button>
          </div>

          <div className="mt-6 pt-5 border-t border-gray-100">
            <p className="text-xs text-gray-400 text-center mb-3">Demo credentials (click to fill):</p>
            <div className="flex gap-2">
              {(['buyer', 'inspector', 'admin'] as const).map((role) => (
                <button
                  key={role}
                  onClick={() => fillDemoCredentials(role)}
                  className="flex-1 text-xs py-1.5 px-2 bg-gray-50 border border-gray-200 text-gray-600 rounded-lg hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-colors capitalize"
                >
                  {role}
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-600 font-medium hover:text-blue-700">
            Sign up free
          </Link>
        </p>
      </div>
    </div>
  );
}
