import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Check, ArrowLeft, User } from 'lucide-react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../src/lib/firebase';

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [resetEmail, setResetEmail] = useState('');
    const [resetMessage, setResetMessage] = useState('');
    const [resetError, setResetError] = useState('');

    const { login, resetPassword, systemSettings } = useAdmin();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(username, password);
            navigate('/admin/dashboard');
        } catch (err: any) {
            console.error("Login Error:", err);
            // Customize error messages based on Firebase error codes
            if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
                setError('Invalid email or password');
            } else if (err.code === 'auth/too-many-requests') {
                setError('Too many failed attempts. Please try again later.');
            } else {
                setError('Failed to sign in. Please check your connection.');
            }
            setPassword('');
        } finally {
            setLoading(false);
        }
    };

    // Main Handler for Forgot Password (Auto-Fetch with Fallback)
    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setResetError('');
        setLoading(true);

        try {
            // FORCE HARDCODED EMAIL AS REQUESTED
            // We ignore the database value because it contains an old/incorrect email (naflkt7@gmail.com)
            const adminEmail = 'bigbiesocialmedia@gmail.com';

            /* 
            // Previous Fetch Logic (Disabled to ensure correct email is used)
            try {
                const settingsRef = doc(db, 'settings', 'system');
                const settingsSnap = await getDoc(settingsRef);
                if (settingsSnap.exists()) {
                    adminEmail = settingsSnap.data().adminUsername;
                }
            } catch (err) {
                console.warn("Could not fetch system settings (likely permission issue). Using fallback.");
            }
            */

            // 3. Send Reset Email
            await resetPassword(adminEmail);
            setResetMessage(`Reset link sent to ${adminEmail}`);

        } catch (err: any) {
            console.error("Auto-Reset Error:", err);
            setResetError('Failed to send reset link: ' + (err.message || "Unknown error"));
        } finally {
            setLoading(false);
        }
    };

    if (showForgotPassword) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
                <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
                    <button
                        onClick={() => setShowForgotPassword(false)}
                        className="flex items-center gap-2 text-gray-600 hover:text-black mb-6 transition-colors"
                    >
                        <ArrowLeft size={20} />
                        <span>Back to Login</span>
                    </button>

                    {/* Simple Confirmation Interface */}
                    {!resetMessage ? (
                        <form onSubmit={handleResetPassword} className="space-y-6">
                            <div className="flex justify-center mb-6">
                                <div className="bg-yellow-50 p-4 rounded-full">
                                    <Mail size={32} className="text-[#F4C430]" />
                                </div>
                            </div>

                            <h2 className="text-2xl font-bold text-center mb-2">Reset Password</h2>
                            <p className="text-gray-500 text-center mb-8 px-4">
                                Click below to send a password reset link to your registered admin email address.
                            </p>

                            {resetError && (
                                <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm mb-6 text-center">
                                    {resetError}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#F4C430] text-black font-bold py-3 rounded-xl hover:bg-[#E5B520] transition-colors disabled:opacity-50 flex justify-center items-center gap-2"
                            >
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    "Send Reset Link"
                                )}
                            </button>
                        </form>
                    ) : (
                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Check size={32} className="text-green-600" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Email Sent!</h3>
                            <p className="text-gray-600 mb-6">{resetMessage}</p>
                            <button
                                type="button"
                                onClick={() => setShowForgotPassword(false)}
                                className="text-[#F4C430] font-medium hover:underline"
                            >
                                Back to Login
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
                <div className="flex justify-center mb-6">
                    <div className="bg-gradient-to-br from-[#F4C430] to-[#E5B520] p-4 rounded-full shadow-lg">
                        <Lock className="text-black w-8 h-8" />
                    </div>
                </div>

                <h1 className="text-3xl font-bold text-center mb-2">Admin Portal</h1>
                <p className="text-gray-500 text-center text-sm mb-8">
                    Sign in to access the dashboard
                </p>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg mb-4 text-sm flex items-center gap-2">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="email"
                                className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-[#F4C430] focus:border-transparent outline-none transition-all"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter admin email"
                                required
                                autoComplete="email"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="password"
                                className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-[#F4C430] focus:border-transparent outline-none transition-all"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter password"
                                required
                                autoComplete="current-password"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-end text-sm">
                        <button
                            type="button"
                            onClick={() => setShowForgotPassword(true)}
                            className="text-[#F4C430] hover:text-[#E5B520] font-medium transition-colors"
                        >
                            Forgot password?
                        </button>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition-all transform active:scale-95 shadow-lg disabled:opacity-75 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <div className="mt-6 pt-6 border-t border-gray-200">
                    <p className="text-center text-xs text-gray-500">
                        {/* Footer text removed as requested */}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
