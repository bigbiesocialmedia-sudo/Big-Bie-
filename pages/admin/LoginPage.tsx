import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import { Lock } from 'lucide-react';

const LoginPage: React.FC = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAdmin();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (login(password)) {
            navigate('/admin/dashboard');
        } else {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <div className="flex justify-center mb-6">
                    <div className="bg-[#F4C430] p-4 rounded-full">
                        <Lock className="text-black w-8 h-8" />
                    </div>
                </div>
                <h1 className="text-2xl font-bold text-center mb-6">Admin Login</h1>

                {error && (
                    <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-[#F4C430] focus:border-transparent outline-none"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter admin password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-black text-white py-3 rounded-md font-bold hover:bg-gray-800 transition-colors"
                    >
                        Login
                    </button>
                </form>
                <div className="mt-4 text-center text-xs text-gray-500">
                    Hint: password is 'admin123'
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
