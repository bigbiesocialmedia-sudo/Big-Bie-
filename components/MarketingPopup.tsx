import React, { useState, useEffect } from 'react';
import { useAdmin } from '../context/AdminContext';
import { Link, useLocation } from 'react-router-dom';
import { X } from 'lucide-react';

const MarketingPopup: React.FC = () => {
    const { marketingSettings } = useAdmin();
    const location = useLocation();
    const [isVisible, setIsVisible] = useState(false);
    const [shouldRender, setShouldRender] = useState(false);

    // Don't show on admin pages
    const isAdminPage = location.pathname.startsWith('/admin');

    useEffect(() => {
        // Don't show or even start timers on admin pages
        if (isAdminPage) {
            setShouldRender(false);
            setIsVisible(false);
            return;
        }

        // Only show if enabled and not closed
        const isClosed = localStorage.getItem('marketing_popup_closed');

        if (marketingSettings.isEnabled && !isClosed) {
            // Slight delay for premium feel
            const timer = setTimeout(() => {
                setShouldRender(true);
                // Trigger animation in next frame
                requestAnimationFrame(() => setIsVisible(true));
            }, 1500);
            return () => clearTimeout(timer);
        } else {
            // Explicitly hide if closed or disabled
            setIsVisible(false);
            // Wait for animation before removing from DOM
            const hideTimer = setTimeout(() => setShouldRender(false), 500);
            return () => clearTimeout(hideTimer);
        }
    }, [marketingSettings.isEnabled, isAdminPage]);

    const handleClose = () => {
        setIsVisible(false);
        // Persist close state - using localStorage for robust "show once"
        localStorage.setItem('marketing_popup_closed', 'true');
        // Remove from DOM after animation
        setTimeout(() => setShouldRender(false), 500);
    };

    if (!shouldRender || isAdminPage) return null;

    return (
        <div
            className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-500 ease-out ${isVisible ? 'bg-black/60 backdrop-blur-sm' : 'bg-black/0 backdrop-blur-none pointer-events-none'
                }`}
        >
            <div
                className={`bg-white w-full max-w-[450px] rounded-[2rem] overflow-hidden shadow-2xl transition-all duration-500 transform ${isVisible ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-8'
                    }`}
            >
                {/* Image Banner */}
                <div className="h-56 sm:h-64 overflow-hidden relative group">
                    <img
                        src={marketingSettings.bannerImage}
                        alt="Marketing"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&q=80&w=1200';
                        }}
                    />
                    <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 bg-white/20 backdrop-blur-md hover:bg-white/40 w-10 h-10 rounded-full flex items-center justify-center text-white transition-all active:scale-90"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="p-8 sm:p-10 text-center relative">
                    <div>
                        <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tight leading-tight">
                            {marketingSettings.heading}
                        </h2>
                        <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                            {marketingSettings.description}
                        </p>

                        <Link
                            to={marketingSettings.buttonLink}
                            onClick={handleClose}
                            className="inline-block w-full bg-black text-[#F4C430] text-lg font-black py-5 rounded-2xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] hover:shadow-[#F4C430]/20 hover:-translate-y-1 transition-all active:scale-95 tracking-wide uppercase"
                        >
                            {marketingSettings.buttonText}
                        </Link>

                        <button
                            onClick={handleClose}
                            className="mt-6 text-gray-400 hover:text-gray-900 text-sm font-bold transition-colors uppercase tracking-widest underline underline-offset-4"
                        >
                            Maybe Later
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarketingPopup;
