import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types';
import { SAMPLE_PRODUCTS } from '../data/products';

export interface HomeSettings {
    bannerImages: string[];
    featuredProductIds: string[];
}

export interface SystemSettings {
    adminUsername: string;
    adminPassword: string; // In a real app, this should be hashed/secure
    whatsappNumber: string;
}

interface AdminContextType {
    isAuthenticated: boolean;
    login: (password: string) => boolean;
    logout: () => void;
    products: Product[];
    addProduct: (product: Product) => void;
    updateProduct: (product: Product) => void;
    deleteProduct: (productId: string) => void;
    // Home Settings
    homeSettings: HomeSettings;
    updateHomeSettings: (settings: HomeSettings) => void;
    // System Settings
    systemSettings: SystemSettings;
    updateSystemSettings: (settings: SystemSettings) => void;
    resetData: () => void;
}

const DEFAULT_HOME_SETTINGS: HomeSettings = {
    bannerImages: [
        'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&q=80&w=2400',
        'https://images.unsplash.com/photo-1596462502278-27bfad4575a6?auto=format&fit=crop&q=80&w=2400',
        'https://images.unsplash.com/photo-1620799140408-ed5341cd2431?auto=format&fit=crop&q=80&w=2400'
    ],
    featuredProductIds: ['rose-camisole-slip', 'royal-panty', 'product-1']
};

const DEFAULT_SYSTEM_SETTINGS: SystemSettings = {
    adminUsername: 'admin',
    adminPassword: 'admin123',
    whatsappNumber: ''
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
        return localStorage.getItem('adminAuth') === 'true';
    });

    const [products, setProducts] = useState<Product[]>(() => {
        const savedProducts = localStorage.getItem('adminProducts');
        return savedProducts ? JSON.parse(savedProducts) : SAMPLE_PRODUCTS;
    });

    const [homeSettings, setHomeSettings] = useState<HomeSettings>(() => {
        const savedSettings = localStorage.getItem('adminHomeSettings');
        return savedSettings ? JSON.parse(savedSettings) : DEFAULT_HOME_SETTINGS;
    });

    const [systemSettings, setSystemSettings] = useState<SystemSettings>(() => {
        const savedSettings = localStorage.getItem('adminSystemSettings');
        return savedSettings ? JSON.parse(savedSettings) : DEFAULT_SYSTEM_SETTINGS;
    });

    useEffect(() => {
        localStorage.setItem('adminProducts', JSON.stringify(products));
    }, [products]);

    useEffect(() => {
        localStorage.setItem('adminHomeSettings', JSON.stringify(homeSettings));
    }, [homeSettings]);

    useEffect(() => {
        localStorage.setItem('adminSystemSettings', JSON.stringify(systemSettings));
    }, [systemSettings]);

    const login = (password: string) => {
        if (password === systemSettings.adminPassword) {
            setIsAuthenticated(true);
            localStorage.setItem('adminAuth', 'true');
            return true;
        }
        return false;
    };

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('adminAuth');
    };

    const addProduct = (product: Product) => {
        setProducts(prev => [...prev, product]);
    };

    const updateProduct = (updatedProduct: Product) => {
        setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    };

    const deleteProduct = (productId: string) => {
        setProducts(prev => prev.filter(p => p.id !== productId));
    };

    const updateHomeSettings = (settings: HomeSettings) => {
        setHomeSettings(settings);
    };

    const updateSystemSettings = (settings: SystemSettings) => {
        setSystemSettings(settings);
    };

    const resetData = () => {
        // 1. Reset Products to empty or initial (User asked to "Erase test data... all inventories")
        // If they want to start fresh, maybe empty? Or back to sample? 
        // "Cart will empty. Like that what things we used for testing that all will arrive."
        // I will reset to SAMPLE_PRODUCTS for safety, or Empty if they really want it clean. 
        // Let's provide an option to "Clear All" which empties it.
        setProducts([]);

        // 2. Clear Cart (Handled via localStorage here for simplicity, or we can expose it via CartContext, 
        // but AdminContext shouldn't depend on CartContext to avoid circular deps. 
        // Better to just clear the specific localStorage key.)
        localStorage.removeItem('cart');
        window.dispatchEvent(new Event('storage')); // Trigger update if possible, or reliance on page reload.

        // 3. Reset Settings if needed? No, user said "Not the functions, not the style".

        alert('Test data erased successfully. The page will reload.');
        window.location.reload();
    };

    return (
        <AdminContext.Provider value={{
            isAuthenticated,
            login,
            logout,
            products,
            addProduct,
            updateProduct,
            deleteProduct,
            homeSettings,
            updateHomeSettings,
            systemSettings,
            updateSystemSettings,
            resetData // Expose this
        }}>
            {children}
        </AdminContext.Provider>
    );
};

export const useAdmin = () => {
    const context = useContext(AdminContext);
    if (context === undefined) {
        throw new Error('useAdmin must be used within an AdminProvider');
    }
    return context;
};
