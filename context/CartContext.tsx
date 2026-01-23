
import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, ProductVariant } from '../types';

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (product: any, quantity: number, selectedSize: string, selectedColor: string) => void;
    removeFromCart: (productId: string, size?: string, color?: string) => void;
    updateQuantity: (productId: string, quantity: number, size?: string, color?: string) => void;
    clearCart: () => void;
    cartTotal: number;
    cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        try {
            const storedCart = localStorage.getItem('cart');
            return storedCart ? JSON.parse(storedCart) : [];
        } catch (error) {
            console.error('Failed to load cart from localStorage', error);
            return [];
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem('cart', JSON.stringify(cartItems));
        } catch (error) {
            console.error('Failed to save cart to localStorage', error);
        }
    }, [cartItems]);

    const addToCart = (product: any, quantity: number, selectedSize: string, selectedColor: string) => {
        setCartItems((prevItems) => {
            const existingItemIndex = prevItems.findIndex(
                (item) =>
                    item.productId === product.id &&
                    item.selectedVariants.size === selectedSize &&
                    item.selectedVariants.color === selectedColor
            );

            if (existingItemIndex > -1) {
                const newItems = [...prevItems];
                newItems[existingItemIndex].quantity += quantity;
                return newItems;
            } else {
                const newItem: CartItem = {
                    productId: product.id,
                    productName: product.name,
                    productSlug: product.slug,
                    image: product.images[0],
                    price: product.price,
                    quantity,
                    selectedVariants: {
                        size: selectedSize,
                        color: selectedColor,
                    },
                };
                return [...prevItems, newItem];
            }
        });
    };

    const removeFromCart = (productId: string, size?: string, color?: string) => {
        setCartItems((prevItems) =>
            prevItems.filter(
                (item) =>
                    !(
                        item.productId === productId &&
                        item.selectedVariants.size === size &&
                        item.selectedVariants.color === color
                    )
            )
        );
    };

    const updateQuantity = (productId: string, quantity: number, size?: string, color?: string) => {
        if (quantity < 1) return;
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.productId === productId && item.selectedVariants.size === size && item.selectedVariants.color === color
                    ? { ...item, quantity }
                    : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                cartTotal,
                cartCount,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
