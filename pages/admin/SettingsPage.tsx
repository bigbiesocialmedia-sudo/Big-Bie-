import React, { useState, useEffect } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { Save, Lock, Phone, User, AlertTriangle } from 'lucide-react';

const SettingsPage: React.FC = () => {
    const {
        systemSettings,
        updateSystemSettings,
        currentUser,
        clearAllProducts
    } = useAdmin();

    // Local state for form inputs
    const [whatsappNumber, setWhatsappNumber] = useState(systemSettings.whatsappNumber);
    const [officialNumber, setOfficialNumber] = useState(systemSettings.officialNumber || '');
    const [nextOrderId, setNextOrderId] = useState(systemSettings.nextOrderId || 10000);
    const [loading, setLoading] = useState(false);

    // Sync local state when Firebase loads settings/user
    useEffect(() => {
        setWhatsappNumber(systemSettings.whatsappNumber);
        setOfficialNumber(systemSettings.officialNumber || '');
        setNextOrderId(systemSettings.nextOrderId || 10000);
    }, [systemSettings]);

    const handleSave = async () => {
        setLoading(true);
        try {
            // Update WhatsApp (Firestore)
            updateSystemSettings({
                ...systemSettings,
                whatsappNumber,
                officialNumber,
                nextOrderId: Number(nextOrderId)
            });

            alert('System settings saved successfully!');
        } catch (error: any) {
            console.error("Settings Error:", error);
            alert('Failed to save settings: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto pb-20">
            <h1 className="text-3xl font-bold mb-8">System Settings</h1>

            <div className="space-y-8">

                {/* Communication */}
                <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-2 mb-4">
                        <Phone className="text-[#F4C430]" />
                        <h2 className="text-xl font-semibold">Communication</h2>
                    </div>
                    <p className="text-sm text-gray-500 mb-6">
                        Set up contact details for customer support.
                    </p>

                    <div className="space-y-6">
                        {/* Order Number */}
                        <div>
                            <label className="block text-sm font-bold text-gray-800 mb-1">Order Receiving WhatsApp Number</label>
                            <p className="text-xs text-gray-500 mb-2">Used for: Checkout, Order Confirmation, Cart Inquiries.</p>
                            <input
                                type="text"
                                placeholder="e.g. 919876543210"
                                className="w-full border p-2 rounded-lg"
                                value={whatsappNumber}
                                onChange={e => setWhatsappNumber(e.target.value)}
                            />
                        </div>

                        {/* Official Inquiry Number */}
                        <div>
                            <label className="block text-sm font-bold text-gray-800 mb-1">Official / Dealership WhatsApp Number</label>
                            <p className="text-xs text-gray-500 mb-2">Used for: Dealership Forms, Hiring/Careers, General Inquiries.</p>
                            <input
                                type="text"
                                placeholder="e.g. 919876543210"
                                className="w-full border p-2 rounded-lg"
                                value={officialNumber}
                                onChange={e => setOfficialNumber(e.target.value)}
                            />
                        </div>

                        {/* Order ID Counter */}
                        <div>
                            <label className="block text-sm font-bold text-gray-800 mb-1">Next Order ID Counter</label>
                            <p className="text-xs text-gray-500 mb-2">The ID assigned to the very next order. Starts from 10000 by default.</p>
                            <input
                                type="number"
                                placeholder="e.g. 10000"
                                className="w-full border p-2 rounded-lg"
                                value={nextOrderId}
                                onChange={e => setNextOrderId(Number(e.target.value))}
                            />
                        </div>
                    </div>
                </section>

                {/* Danger Zone */}
                <section className="bg-red-50 p-6 rounded-xl shadow-sm border border-red-100">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="p-2 bg-red-100 rounded-lg">
                            <AlertTriangle className="w-5 h-5 text-red-600" />
                        </div>
                        <h2 className="text-xl font-semibold text-red-900">Danger Zone</h2>
                    </div>
                    <p className="text-sm text-red-700 mb-6">
                        Irreversible actions for testing and maintenance.
                    </p>

                    <button
                        onClick={clearAllProducts}
                        className="w-full bg-white border-2 border-red-200 text-red-600 font-bold py-3 rounded-lg hover:bg-red-600 hover:text-white transition-colors flex items-center justify-center gap-2"
                    >
                        XXX DELETE ALL INVENTORY XXX
                    </button>
                    <p className="text-xs text-red-500 mt-2 text-center">
                        This action allows you to restart with an empty store.
                    </p>
                </section>

                <div className="sticky bottom-4">
                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className="w-full bg-black text-white font-bold text-lg py-4 rounded-xl shadow-lg hover:bg-gray-800 transition-transform active:scale-95 flex justify-center items-center gap-2 disabled:opacity-75"
                    >
                        <Save size={24} />
                        {loading ? 'Saving...' : 'Save System Settings'}
                    </button>
                </div>

            </div>
        </div>
    );
};

export default SettingsPage;
