import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAdmin } from '../context/AdminContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

const CheckoutPage: React.FC = () => {
    const { cartItems, cartTotal, clearCart } = useCart();
    const { systemSettings } = useAdmin(); // Get settings from AdminContext
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        address: '',
        pincode: '',
        city: '',
        state: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleWhatsAppRedirect = (e: React.FormEvent) => {
        e.preventDefault();

        if (cartItems.length === 0) {
            alert('Your cart is empty!');
            return;
        }

        // Get WhatsApp number from settings or fallback
        // Remove any non-digit characters from the number for the URL
        const rawPhone = systemSettings.whatsappNumber || '919876543210';
        const merchantPhone = rawPhone.replace(/\D/g, '');

        if (!merchantPhone) {
            alert('Merchant WhatsApp number is not configured appropriately. Please contact support.');
            return;
        }

        // 1. Generate Order details (Random 5-digit number > 10000)
        const randomOrderNum = Math.floor(10000 + Math.random() * 90000);
        const orderId = `ORD-${randomOrderNum}`;

        // 2. Format Product Details with clear breakdown
        const productDetails = cartItems.map((item, index) => {
            const variantInfo = [];
            if (item.selectedVariants.size) variantInfo.push(`Size: ${item.selectedVariants.size}`);
            if (item.selectedVariants.color) variantInfo.push(`Color: ${item.selectedVariants.color}`);
            const variantStr = variantInfo.length > 0 ? `(${variantInfo.join(', ')})` : '';

            return `${index + 1}. *${item.productName}* ${variantStr}\n` +
                `   Qty: ${item.quantity} x Rs. ${item.price}\n` +
                `   Item Total: Rs. ${item.price * item.quantity}`;
        }).join('\n\n');

        // 3. Construct the Message with separator
        // Using \n and encodeURIComponent for safe transmission
        const messageText = `*New Order: ${orderId}*\n\n` +
            `*Customer Details:*\n` +
            `Name: ${formData.name}\n` +
            `Mobile: ${formData.mobile}\n` +
            `Address: ${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}\n\n` +
            `*Order Details:*\n` +
            `--------------------------------\n` +
            `${productDetails}\n` +
            `--------------------------------\n` +
            `*Total Amount: Rs. ${cartTotal.toFixed(2)}*`;

        // 4. Redirect to WhatsApp
        const whatsappUrl = `https://wa.me/${merchantPhone}?text=${encodeURIComponent(messageText)}`;
        window.open(whatsappUrl, '_blank');

        // Clear Cart and Redirect
        clearCart();
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <main className="container mx-auto px-4 py-8 mb-12">
                <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-6 md:p-8 mt-10">
                    <h1 className="text-2xl font-bold mb-6 text-center">Checkout</h1>

                    <form onSubmit={handleWhatsAppRedirect} className="space-y-6">
                        {/* Contact Info */}
                        <div>
                            <h2 className="text-lg font-semibold mb-4 border-b pb-2">Contact Information</h2>
                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#F4C430] focus:border-[#F4C430]"
                                        placeholder="Enter your full name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                                    <input
                                        type="tel"
                                        name="mobile"
                                        required
                                        value={formData.mobile}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#F4C430] focus:border-[#F4C430]"
                                        placeholder="10-digit mobile number"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Address Info */}
                        <div>
                            <h2 className="text-lg font-semibold mb-4 border-b pb-2">Delivery Address</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Address (House No, Street, Area)</label>
                                    <textarea
                                        name="address"
                                        required
                                        rows={3}
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#F4C430] focus:border-[#F4C430]"
                                        placeholder="Enter your complete address"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                        <input
                                            type="text"
                                            name="city"
                                            required
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#F4C430] focus:border-[#F4C430]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                                        <input
                                            type="text"
                                            name="state"
                                            required
                                            value={formData.state}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#F4C430] focus:border-[#F4C430]"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                                    <input
                                        type="text"
                                        name="pincode"
                                        required
                                        value={formData.pincode}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#F4C430] focus:border-[#F4C430]"
                                        placeholder="6-digit pincode"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Order Summary Preview */}
                        <div className="bg-gray-50 p-4 rounded-md">
                            <h3 className="font-semibold mb-2">Order Summary</h3>
                            <div className="flex justify-between text-sm mb-1">
                                <span>Total Quantity:</span>
                                <span>{cartItems.reduce((acc, item) => acc + item.quantity, 0)} Items</span>
                            </div>
                            <div className="flex justify-between font-bold text-lg">
                                <span>Total Amount:</span>
                                <span>Rs. {cartTotal.toFixed(2)}</span>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#25D366] text-white font-bold py-4 rounded-lg hover:bg-[#128C7E] transition-colors flex items-center justify-center gap-2"
                        >
                            Confirm Order
                        </button>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default CheckoutPage;
