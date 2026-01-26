
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
                // CRITICAL: Get color-specific image and labels from matching variant
                let productImage = '';
                let sizeLabel = selectedSize;
                let colorLabel = selectedColor;

                // Priority 1: Find exact size+color match and get its image
                if (product.variantCombinations && product.variantCombinations.length > 0) {
                    const matchingCombo = product.variantCombinations.find(
                        (vc: any) => vc.size === selectedSize && vc.color === selectedColor
                    );
                    if (matchingCombo) {
                        sizeLabel = matchingCombo.sizeLabel || selectedSize;
                        colorLabel = matchingCombo.colorLabel || selectedColor;
                        // Get COLOR-SPECIFIC image
                        if (matchingCombo.images && matchingCombo.images.length > 0) {
                            productImage = matchingCombo.images[0];
                        }
                    }
                }

                // Priority 2: If no exact match, find any combo with this color
                if (!productImage && product.variantCombinations && product.variantCombinations.length > 0) {
                    const colorCombo = product.variantCombinations.find((vc: any) => vc.color === selectedColor);
                    if (colorCombo && colorCombo.images && colorCombo.images.length > 0) {
                        productImage = colorCombo.images[0];
                    }
                }

                // Priority 3: Check imageGroups for this color
                if (!productImage && product.imageGroups && product.imageGroups.length > 0) {
                    const colorGroup = product.imageGroups.find((g: any) => g.colorValue === selectedColor);
                    if (colorGroup && colorGroup.images && colorGroup.images.length > 0) {
                        productImage = colorGroup.images[0];
                    }
                }

                // Priority 4: Legacy Variants (Fallback for old data)
                if (!productImage && product.variants && product.variants.length > 0) {
                    const firstVar = product.variants[0];
                    if (firstVar.images && firstVar.images.length > 0) {
                        productImage = firstVar.images[0];
                    }
                }

                // Priority 5: Fallback to generic product images
                if (!productImage && product.images && product.images.length > 0) {
                    productImage = product.images[0];
                }

                // Final Fallback if absolutely nothing found
                if (!productImage) {
                    productImage = 'https://placehold.co/100?text=No+Image';
                }

                const newItem: CartItem = {
                    productId: product.id,
                    productName: product.name,
                    productSlug: product.slug,
                    image: productImage,
                    price: product.price,
                    quantity,
                    selectedVariants: {
                        size: selectedSize,
                        sizeLabel: sizeLabel,
                        color: selectedColor,
                        colorLabel: colorLabel,
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
