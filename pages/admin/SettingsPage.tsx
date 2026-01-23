import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { Save, Lock, Phone } from 'lucide-react';

const SettingsPage: React.FC = () => {
    const { systemSettings, updateSystemSettings, resetData } = useAdmin();
    const [adminUsername, setAdminUsername] = useState(systemSettings.adminUsername);
    const [adminPassword, setAdminPassword] = useState(systemSettings.adminPassword);
    const [whatsappNumber, setWhatsappNumber] = useState(systemSettings.whatsappNumber);

    const handleSave = () => {
        updateSystemSettings({
            adminUsername,
            adminPassword,
            whatsappNumber
        });
        alert('System settings saved successfully!');
    };

    return (
        <div className="max-w-3xl mx-auto pb-20">
            <h1 className="text-3xl font-bold mb-8">System Settings</h1>

            <div className="space-y-8">

                {/* Admin Credentials */}
                <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-2 mb-4">
                        <Lock className="text-[#F4C430]" />
                        <h2 className="text-xl font-semibold">Admin Credentials</h2>
                    </div>
                    <p className="text-sm text-gray-500 mb-6">
                        Update your administrator login details.
                    </p>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Username</label>
                            <input
                                type="text"
                                className="w-full border p-2 rounded-lg"
                                value={adminUsername}
                                onChange={e => setAdminUsername(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Password</label>
                            <input
                                type="text"
                                className="w-full border p-2 rounded-lg"
                                value={adminPassword}
                                onChange={e => setAdminPassword(e.target.value)}
                            />
                        </div>
                    </div>
                </section>

                {/* Communication */}
                <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-2 mb-4">
                        <Phone className="text-[#F4C430]" />
                        <h2 className="text-xl font-semibold">Communication</h2>
                    </div>
                    <p className="text-sm text-gray-500 mb-6">
                        Set up contact details for customer support.
                    </p>

                    <div>
                        <label className="block text-sm font-medium mb-1">WhatsApp Number</label>
                        <input
                            type="text"
                            placeholder="+91 9876543210"
                            className="w-full border p-2 rounded-lg"
                            value={whatsappNumber}
                            onChange={e => setWhatsappNumber(e.target.value)}
                        />
                        <p className="text-xs text-gray-400 mt-1">Include country code without spaces or dashes for best results.</p>
                    </div>
                </section>

                {/* Danger Zone */}
                <section className="bg-red-50 p-6 rounded-xl shadow-sm border border-red-100">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="p-2 bg-red-100 rounded-lg">
                            <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-semibold text-red-900">Danger Zone</h2>
                    </div>
                    <p className="text-sm text-red-700 mb-6">
                        Irreversible actions for testing and maintenance.
                    </p>

                    <button
                        onClick={() => {
                            if (window.confirm('⚠️ ARE YOU SURE? \n\nThis will DELETE ALL INVENTORY products and EMPTY THE CART.\nThis action cannot be undone.')) {
                                resetData();
                            }
                        }}
                        className="w-full bg-white border-2 border-red-200 text-red-600 font-bold py-3 rounded-lg hover:bg-red-600 hover:text-white transition-colors flex items-center justify-center gap-2"
                    >
                        Erase Test Data & Reset
                    </button>
                    <p className="text-xs text-red-500 mt-2 text-center">
                        Use this before delivery to clear all test products and cart items.
                    </p>
                </section>

                <div className="sticky bottom-4">
                    <button
                        onClick={handleSave}
                        className="w-full bg-black text-white font-bold text-lg py-4 rounded-xl shadow-lg hover:bg-gray-800 transition-transform active:scale-95 flex justify-center items-center gap-2"
                    >
                        <Save size={24} />
                        Save System Settings
                    </button>
                </div>

            </div>
        </div>
    );
};

export default SettingsPage;
