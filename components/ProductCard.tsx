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

    // Helper to get first available image with fallbacks
    const getProductThumbnail = () => {
        // Try main images array first
        if (product.images && product.images.length > 0) {
            return product.images[0];
        }

        // Fallback 1: Try imageGroups (Image-First products)
        if (product.imageGroups && product.imageGroups.length > 0) {
            const firstGroup = product.imageGroups[0];
            if (firstGroup.images && firstGroup.images.length > 0) {
                return firstGroup.images[0];
            }
        }

        // Fallback 2: Try variantCombinations
        if (product.variantCombinations && product.variantCombinations.length > 0) {
            const firstCombo = product.variantCombinations[0];
            if (firstCombo.images && firstCombo.images.length > 0) {
                return firstCombo.images[0];
            }
        }

        // Final fallback: placeholder
        return '/placeholder-image.jpg';
    };

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
                        src={getProductThumbnail()}
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

                    {/* Star Rating */}
                    <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                                key={star}
                                className={`w-3.5 h-3.5 ${star <= Math.floor(product.rating)
                                        ? 'text-[#F4C430] fill-current'
                                        : 'text-gray-300 fill-current'
                                    }`}
                                viewBox="0 0 20 20"
                            >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        ))}
                        <span className="text-xs text-gray-500 ml-1">({product.reviewCount})</span>
                    </div>

                    {/* Available Sizes */}
                    {(product.variantCombinations && product.variantCombinations.length > 0) && (
                        <div className="flex flex-wrap gap-1">
                            {Array.from(new Set(product.variantCombinations.map((vc: any) => vc.sizeLabel))).slice(0, 4).map((size: string) => (
                                <span key={size} className="text-[10px] px-2 py-0.5 bg-gray-100 text-gray-600 rounded">
                                    {size}
                                </span>
                            ))}
                        </div>
                    )}

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
