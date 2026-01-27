import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const WhatsAppButton: React.FC = () => {
    const { systemSettings } = useAdmin();
    const location = useLocation();

    // Default to the order receiving number, fallback if not set
    const whatsappNumber = systemSettings.whatsappNumber || '';

    // Don't show on admin pages
    if (location.pathname.startsWith('/admin')) return null;

    if (!whatsappNumber) return null;

    const handleClick = () => {
        // Sanitize number (remove non-digits)
        const cleanPhone = whatsappNumber.replace(/\D/g, '');
        const message = "Hi, I'm interested in your products.";
        const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    return (
        <motion.button
            onClick={handleClick}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#128C7E] transition-colors flex items-center justify-center"
            aria-label="Chat on WhatsApp"
        >
            <MessageCircle size={28} fill="white" className="text-white" />
        </motion.button>
    );
};

export default WhatsAppButton;
