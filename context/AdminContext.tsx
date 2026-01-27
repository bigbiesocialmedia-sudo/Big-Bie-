import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, ShippingRule } from '../types';
import { SAMPLE_PRODUCTS } from '../data/products';
import { db, auth } from '../src/lib/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, setDoc, onSnapshot } from 'firebase/firestore';
import {
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    User,
    sendPasswordResetEmail,
    updateEmail,
    updatePassword
} from 'firebase/auth';

export interface HomeSettings {
    bannerImages: string[];
    featuredProductIds: string[];
    heroImages?: string[]; // Added: For the Hero Section Slider
}

export interface SystemSettings {
    adminUsername: string; // Kept for legacy/display, but Auth is validating
    adminPassword: string; // Kept for legacy/display, but Auth is validating
    whatsappNumber: string; // For Orders
    officialNumber?: string; // For Dealership/Careers/Inquiries
}

interface AdminContextType {
    isAuthenticated: boolean;
    currentUser: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
    updateAdminCredentials: (email?: string, password?: string) => Promise<void>;
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
    loadingAuth: boolean;
    shippingRules: ShippingRule[];
    updateShippingRules: (rules: ShippingRule[]) => Promise<void>;
}
const DEFAULT_HOME_SETTINGS: HomeSettings = {
    bannerImages: [
        'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&q=80&w=2400',
        'https://images.unsplash.com/photo-1596462502278-27bfad4575a6?auto=format&fit=crop&q=80&w=2400',
        'https://images.unsplash.com/photo-1620799140408-ed5341cd2431?auto=format&fit=crop&q=80&w=2400'
    ],
    featuredProductIds: ['rose-camisole-slip', 'royal-panty', 'product-1'],
    heroImages: [
        'https://images.unsplash.com/photo-1616486029423-aaa478965c96?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1596462502278-27bfad4575a6?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1585670210693-e7fdd16b142e?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1550614000-4b9519e0037a?auto=format&fit=crop&q=80&w=800'
    ]
};

const DEFAULT_SYSTEM_SETTINGS: SystemSettings = {
    adminUsername: 'admin@bigbie.com',
    adminPassword: '',
    whatsappNumber: ''
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [loadingAuth, setLoadingAuth] = useState(true);

    // Listen to Firebase Auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setIsAuthenticated(!!user);
            setLoadingAuth(false);
            if (user) {
                localStorage.setItem('adminAuth', 'true');
            } else {
                localStorage.removeItem('adminAuth');
            }
        });
        return unsubscribe;
    }, []);

    // Products
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const productsCollection = collection(db, 'products');

    // Fetch Products
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getDocs(productsCollection);
                const loadedProducts = data.docs.map(doc => ({ ...doc.data(), id: doc.id } as Product));
                if (loadedProducts.length > 0) {
                    setProducts(loadedProducts);
                } else {
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

    // Settings
    const [homeSettings, setHomeSettings] = useState<HomeSettings>(DEFAULT_HOME_SETTINGS);

    const [systemSettings, setSystemSettings] = useState<SystemSettings>(DEFAULT_SYSTEM_SETTINGS);

    // Load homeSettings from Firebase
    useEffect(() => {
        const unsubscribe = onSnapshot(doc(db, 'settings', 'home'), (docSnap) => {
            if (docSnap.exists()) {
                setHomeSettings(docSnap.data() as HomeSettings);
            } else {
                setDoc(doc(db, 'settings', 'home'), DEFAULT_HOME_SETTINGS);
            }
        });
        return () => unsubscribe();
    }, []);

    // Load systemSettings from Firebase
    useEffect(() => {
        const unsubscribe = onSnapshot(doc(db, 'settings', 'system'), (docSnap) => {
            if (docSnap.exists()) {
                setSystemSettings(docSnap.data() as SystemSettings);
            } else {
                setDoc(doc(db, 'settings', 'system'), DEFAULT_SYSTEM_SETTINGS);
            }
        });
        return () => unsubscribe();
    }, []);

    // Sub-collections
    const [subCollections, setSubCollections] = useState<Record<string, string[]>>({});

    useEffect(() => {
        const unsubscribe = onSnapshot(doc(db, 'settings', 'categories'), (docSnap) => {
            if (docSnap.exists()) {
                setSubCollections(docSnap.data() as Record<string, string[]>);
            } else {
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

    // Shipping Rules
    const [shippingRules, setShippingRules] = useState<ShippingRule[]>([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(doc(db, 'settings', 'shipping'), (docSnap) => {
            if (docSnap.exists()) {
                const data = docSnap.data();
                setShippingRules(data.rules || []);
            } else {
                setDoc(doc(db, 'settings', 'shipping'), { rules: [] });
            }
        });
        return () => unsubscribe();
    }, []);

    const updateShippingRules = async (rules: ShippingRule[]) => {
        try {
            await setDoc(doc(db, 'settings', 'shipping'), { rules });
        } catch (error) {
            console.error("Error updating shipping rules:", error);
            alert("Failed to save shipping changes.");
        }
    };

    const updateSubCollections = async (subs: Record<string, string[]>) => {
        try {
            await setDoc(doc(db, 'settings', 'categories'), subs);
        } catch (error) {
            console.error("Error updating sub-collections:", error);
            alert("Failed to save changes.");
        }
    };

    // --- Firebase Auth Functions ---

    const login = async (email: string, password: string) => {
        await signInWithEmailAndPassword(auth, email, password);
    };

    const logout = async () => {
        await signOut(auth);
    };

    const resetPassword = async (email: string) => {
        await sendPasswordResetEmail(auth, email);
    };

    const updateAdminCredentials = async (email?: string, password?: string) => {
        if (!currentUser) throw new Error("No user logged in");

        if (email && email !== currentUser.email) {
            await updateEmail(currentUser, email);
        }

        if (password) {
            await updatePassword(currentUser, password);
        }
    };

    // --- Firebase Data Operations ---

    // [Preserve all Data Operations exactly as they were]
    const addProduct = async (product: Product) => {
        try {
            const cleanProduct: any = { ...product };
            Object.keys(cleanProduct).forEach(key => {
                if (cleanProduct[key] === undefined) delete cleanProduct[key];
            });
            if (cleanProduct.imageGroups?.length === 0) delete cleanProduct.imageGroups;
            if (cleanProduct.productColors?.length === 0) delete cleanProduct.productColors;
            if (cleanProduct.productSizes?.length === 0) delete cleanProduct.productSizes;
            if (cleanProduct.variantCombinations?.length === 0) delete cleanProduct.variantCombinations;

            await setDoc(doc(db, 'products', product.id), cleanProduct);
            setProducts(prev => [...prev, product]);
        } catch (error) {
            console.error("Error adding product:", error);
            alert("Failed to add product to database");
            throw error;
        }
    };

    const updateProduct = async (updatedProduct: Product) => {
        try {
            const cleanProduct: any = { ...updatedProduct };
            Object.keys(cleanProduct).forEach(key => {
                if (cleanProduct[key] === undefined) delete cleanProduct[key];
            });
            if (cleanProduct.imageGroups?.length === 0) delete cleanProduct.imageGroups;
            if (cleanProduct.productColors?.length === 0) delete cleanProduct.productColors;
            if (cleanProduct.productSizes?.length === 0) delete cleanProduct.productSizes;
            if (cleanProduct.variantCombinations?.length === 0) delete cleanProduct.variantCombinations;

            await updateDoc(doc(db, 'products', updatedProduct.id), cleanProduct);
            setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
        } catch (error) {
            console.error("Error updating product:", error);
            alert("Failed to update product");
            throw error;
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
        setDoc(doc(db, 'settings', 'home'), settings);
    };

    const updateSystemSettings = (settings: SystemSettings) => {
        setSystemSettings(settings);
        setDoc(doc(db, 'settings', 'system'), settings);
    };

    const resetData = () => {
        localStorage.removeItem('cart');
        alert('Local cache cleared. Database data remains safe.');
        window.location.reload();
    };

    const migrateData = async () => {
        if (!confirm("This will upload all sample products to the database. Continue?")) return;
        let count = 0;
        for (const p of SAMPLE_PRODUCTS) {
            try {
                await setDoc(doc(db, "products", p.id), p, { merge: true });
                count++;
            } catch (e) {
                console.error("Migration error:", e);
            }
        }
        alert(`Successfully migrated ${count} products to Firebase! Reloading...`);
        window.location.reload();
    };

    const clearAllProducts = async () => {
        if (!confirm("⚠️ WARNING: This will PERMANENTLY DELETE ALL PRODUCTS from the database.\n\nAre you sure?")) return;
        const confirm2 = prompt("Type 'DELETE' to confirm:");
        if (confirm2 !== 'DELETE') return;

        setLoading(true);
        try {
            const snapshot = await getDocs(collection(db, 'products'));
            const deletePromises = snapshot.docs.map(doc => deleteDoc(doc.ref));
            await Promise.all(deletePromises);
            setProducts([]);
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
            currentUser,
            login,
            logout,
            resetPassword,
            updateAdminCredentials,
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
            updateSubCollections,
            loadingAuth,
            shippingRules,
            updateShippingRules
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
