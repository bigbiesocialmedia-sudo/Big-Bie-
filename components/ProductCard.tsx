import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Product } from '../types';
import { ShoppingBag, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
    product: Product;
    hideActions?: boolean;
    hidePrice?: boolean;
    minimal?: boolean; // New prop for Image-Only mode
}

const ProductCard: React.FC<ProductCardProps> = ({
    product,
    hideActions = false,
    hidePrice = false,
    minimal = false
}) => {
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const defaultSize = product.variants.find(v => v.type === 'size')?.value || '';
        const defaultColor = product.variants.find(v => v.type === 'color')?.value || '';

        if ((product.variants.some(v => v.type === 'size') && !defaultSize) ||
            (product.variants.some(v => v.type === 'color') && !defaultColor)) {
            navigate(`/products/${product.slug}?action=add`);
            return;
        }

        addToCart(product, 1, defaultSize, defaultColor);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    const handleBuyNow = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const defaultSize = product.variants.find(v => v.type === 'size')?.value || '';
        const defaultColor = product.variants.find(v => v.type === 'color')?.value || '';

        addToCart(product, 1, defaultSize, defaultColor);
        navigate('/checkout');
    };

    return (
        <Link to={`/products/${product.slug}`} className="group block">
            <div className="relative overflow-hidden bg-gray-50 mb-3">
                {/* Image Container - Square Aspect Ratio */}
                <div className="aspect-square relative overflow-hidden">
                    <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                    />
                </div>
            </div>

            {/* If minimal is true, we stop here and render nothing else */}
            {!minimal && (
                <div className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                        {product.name}
                    </h3>

                    {!hidePrice && (
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-sm font-semibold text-gray-900">
                                ₹{product.price}
                            </span>
                            {product.originalPrice && (
                                <span className="text-xs text-gray-400 line-through">
                                    ₹{product.originalPrice}
                                </span>
                            )}
                        </div>
                    )}

                    {/* Actions */}
                    {!hideActions && (
                        <div className="grid grid-cols-[1fr_auto] gap-2">
                            <button
                                onClick={handleBuyNow}
                                className="flex items-center justify-center text-[10px] font-bold uppercase tracking-widest py-2.5 bg-black text-white hover:bg-gray-800 transition-colors"
                            >
                                Buy Now
                            </button>
                            <button
                                onClick={handleAddToCart}
                                disabled={isAdded}
                                className={`flex items-center justify-center w-10 border transition-all ${isAdded
                                        ? 'bg-green-600 border-green-600 text-white'
                                        : 'border-black text-black hover:bg-black hover:text-white'
                                    }`}
                                title={isAdded ? "Added!" : "Add to Cart"}
                            >
                                {isAdded ? <Check size={16} /> : <ShoppingBag size={16} />}
                            </button>
                        </div>
                    )}
                </div>
            )}
        </Link>
    );
};

export default ProductCard;
