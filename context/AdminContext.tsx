import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types';
import { SAMPLE_PRODUCTS } from '../data/products';
import { db } from '../src/lib/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, setDoc, onSnapshot } from 'firebase/firestore';

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
    addProduct: (product: Product) => Promise<void>;
    updateProduct: (product: Product) => Promise<void>;
    deleteProduct: (productId: string) => Promise<void>;
    // Home Settings
    homeSettings: HomeSettings;
    updateHomeSettings: (settings: HomeSettings) => void;
    // System Settings
    systemSettings: SystemSettings;
    updateSystemSettings: (settings: SystemSettings) => void;
    resetData: () => void;
    migrateData: () => Promise<void>;
    clearAllProducts: () => Promise<void>;
    subCollections: Record<string, string[]>;
    updateSubCollections: (subs: Record<string, string[]>) => Promise<void>;
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

    // Products now fetched from Firestore
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    const productsCollection = collection(db, 'products');

    // Fetch Products from Firestore
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getDocs(productsCollection);
                const loadedProducts = data.docs.map(doc => ({ ...doc.data(), id: doc.id } as Product));

                if (loadedProducts.length > 0) {
                    setProducts(loadedProducts);
                } else {
                    // Database is empty. We do NOT auto-migrate anymore.
                    // If user wants to restore samples, they can use the button in Settings.
                    setProducts([]);
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Settings still in LocalStorage for now (Phase 2 can move them to Firestore too)
    const [homeSettings, setHomeSettings] = useState<HomeSettings>(() => {
        const savedSettings = localStorage.getItem('adminHomeSettings');
        return savedSettings ? JSON.parse(savedSettings) : DEFAULT_HOME_SETTINGS;
    });

    const [systemSettings, setSystemSettings] = useState<SystemSettings>(() => {
        const savedSettings = localStorage.getItem('adminSystemSettings');
        return savedSettings ? JSON.parse(savedSettings) : DEFAULT_SYSTEM_SETTINGS;
    });

    useEffect(() => {
        localStorage.setItem('adminHomeSettings', JSON.stringify(homeSettings));
    }, [homeSettings]);

    // Fetch Sub-collections
    useEffect(() => {
        const fetchSubCollections = async () => {
            try {
                const docRef = doc(db, 'settings', 'subCollections');
                const snapshot = await getDocs(collection(db, 'settings')); // check if collection exists first or just get doc
                // actually better to just get the specific doc
                // But wait, getDoc is not imported. I need to check imports.
                // imports: collection, getDocs, addDoc, updateDoc, deleteDoc, doc, setDoc, onSnapshot
                // I don't see getDoc. I should use onSnapshot for real-time or getDoc if I import it.
                // Let's use getDocs for now on a meaningful collection or just import getDoc.
                // Actually, I can use onSnapshot for real-time updates which is nice.
            } catch (e) {
                console.error(e);
            }
        };
    }, []);

    // Wait, I should do this properly. Let me rewrite the whole context part for subCollections.
    // I need to import getDoc first if I want to use it, or continue using getDocs/onSnapshot.
    // simpler:

    const [subCollections, setSubCollections] = useState<Record<string, string[]>>({});

    useEffect(() => {
        // Real-time listener for sub-collections
        const unsubscribe = onSnapshot(doc(db, 'settings', 'categories'), (docSnap) => {
            if (docSnap.exists()) {
                setSubCollections(docSnap.data() as Record<string, string[]>);
            } else {
                // Initialize if empty
                const initial = {
                    'Bras': ['Daily Wear', 'Sports', 'Bridal', 'Maternity'],
                    'Panties': ['Hipsters', 'Bikinis', 'Boy Shorts'],
                    'Slips': [],
                    'Kids': []
                };
                setDoc(doc(db, 'settings', 'categories'), initial);
                setSubCollections(initial);
            }
        });

        return () => unsubscribe();
    }, []);

    const updateSubCollections = async (subs: Record<string, string[]>) => {
        try {
            await setDoc(doc(db, 'settings', 'categories'), subs);
            // State update happens via onSnapshot automatically
        } catch (error) {
            console.error("Error updating sub-collections:", error);
            alert("Failed to save changes.");
        }
    };

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

    // Firebase CRUD Operations
    const addProduct = async (product: Product) => {
        try {
            // We use the product.id (slug-like) as the doc ID for consistency
            await setDoc(doc(db, 'products', product.id), product);
            setProducts(prev => [...prev, product]); // Optimistic update
        } catch (error) {
            console.error("Error adding product:", error);
            alert("Failed to add product to database");
        }
    };

    const updateProduct = async (updatedProduct: Product) => {
        try {
            await updateDoc(doc(db, 'products', updatedProduct.id), updatedProduct as any);
            setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
        } catch (error) {
            console.error("Error updating product:", error);
            alert("Failed to update product");
        }
    };

    const deleteProduct = async (productId: string) => {
        try {
            await deleteDoc(doc(db, 'products', productId));
            setProducts(prev => prev.filter(p => p.id !== productId));
        } catch (error) {
            console.error("Error deleting product:", error);
            alert("Failed to delete product");
        }
    };

    const updateHomeSettings = (settings: HomeSettings) => {
        setHomeSettings(settings);
    };

    const updateSystemSettings = (settings: SystemSettings) => {
        setSystemSettings(settings);
    };

    const resetData = () => {
        // Only clears local auth/settings. Does NOT wipe Firestore for safety.
        localStorage.removeItem('cart');
        alert('Local cache cleared. Database data remains safe.');
        window.location.reload();
    };

    // MIGRATION: Upload sample data to Firestore
    const migrateData = async () => {
        if (!confirm("This will upload all sample products to the database. Continue?")) return;

        let count = 0;
        for (const p of SAMPLE_PRODUCTS) {
            try {
                // Use setDoc with merge to avoid duplicates if re-run
                await setDoc(doc(db, "products", p.id), p, { merge: true });
                count++;
            } catch (e) {
                console.error("Migration error:", e);
            }
        }
        alert(`Successfully migrated ${count} products to Firebase! Reloading...`);
        window.location.reload();
    };

    // DANGER: Delete ALL products
    const clearAllProducts = async () => {
        if (!confirm("⚠️ WARNING: This will PERMANENTLY DELETE ALL PRODUCTS from the database.\n\nAre you sure?")) return;

        const confirm2 = prompt("Type 'DELETE' to confirm:");
        if (confirm2 !== 'DELETE') return;

        setLoading(true);
        try {
            const snapshot = await getDocs(collection(db, 'products'));
            const deletePromises = snapshot.docs.map(doc => deleteDoc(doc.ref));
            await Promise.all(deletePromises);
            setProducts([]); // Clear local state immediately
            alert("All products have been deleted.");
        } catch (error) {
            console.error("Error clearing database:", error);
            alert("Failed to delete products.");
        } finally {
            setLoading(false);
        }
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
            resetData,
            migrateData,
            clearAllProducts,
            subCollections,
            updateSubCollections
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
