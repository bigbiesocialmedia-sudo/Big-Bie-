import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Product } from '../types';
import { ShoppingBag, Check, Heart, ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

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
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Robust Image Gathering (Same logic as FeaturedCard)
    const getProductImages = () => {
        let images: string[] = [];

        // Priority 1: Variant Combinations (e.g., Color-specific)
        if (product.variantCombinations && product.variantCombinations.length > 0) {
            const variantImages = product.variantCombinations.flatMap(v => v.images || []);
            if (variantImages.length > 0) images = [...images, ...variantImages];
        }

        // Priority 2: Image Groups
        if (images.length === 0 && product.imageGroups && product.imageGroups.length > 0) {
            const groupImages = product.imageGroups.flatMap(g => g.images || []);
            if (groupImages.length > 0) images = [...images, ...groupImages];
        }

        // Priority 3: Standard Images
        if (images.length === 0 && product.images && product.images.length > 0) {
            images = product.images;
        }

        // De-duplicate and fallback
        const uniqueImages = Array.from(new Set(images));
        return uniqueImages.length > 0
            ? uniqueImages
            : ['https://images.unsplash.com/photo-1620799140408-ed5341cd2431?auto=format&fit=crop&q=80&w=800'];
    };

    const images = getProductImages();

    const nextImage = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const defaultSize = product.productSizes?.[0]?.value ||
            product.variants?.find(v => v.type === 'size')?.value || 'M';
        const defaultColor = product.productColors?.[0]?.value ||
            product.variants?.find(v => v.type === 'color')?.value || 'Default';

        addToCart(product, 1, defaultSize, defaultColor);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    const handleBuyNow = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        navigate(`/products/${product.slug}`);
    };

    const handleDetailsClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        navigate(`/products/${product.slug}`);
    };

    // If "Minimal" mode is requested (e.g. for simple grids), we can revert to simple view or use this new one.
    // For now, let's standardize on the new "Nike" look for everyone unless specifically requested otherwise.

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl md:rounded-[32px] p-2 md:p-4 shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100 relative overflow-hidden flex flex-col h-full"
        >
            {/* 1. Image Area (Top) */}
            <div className="relative aspect-[4/5] rounded-lg md:rounded-[24px] overflow-hidden bg-gray-100 mb-2 md:mb-4 isolate">

                {/* Badge (Optional: Randomize or check logic) */}
                {/* Badge Removed by User Request */}

                {/* Wishlist/Brand Icon */}
                <div className="absolute top-4 right-4 z-20">
                    <button className="bg-white/80 p-2 rounded-full hover:bg-white transition-colors backdrop-blur-sm">
                        <Heart size={16} className="text-gray-700" />
                    </button>
                </div>

                {/* Image Carousel */}
                <div className="w-full h-full relative group/image">
                    <Link to={`/products/${product.slug}`} className="block w-full h-full">
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={currentImageIndex}
                                src={images[currentImageIndex]}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="w-full h-full object-cover"
                                alt={product.name}
                            />
                        </AnimatePresence>
                    </Link>

                    {/* Navigation Arrows (Show on Hover if multiple) */}
                    {images.length > 1 && (
                        <>
                            <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white p-1 rounded-full opacity-0 group-hover/image:opacity-100 transition-opacity z-10 shadow-sm">
                                <ChevronLeft size={16} />
                            </button>
                            <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white p-1 rounded-full opacity-0 group-hover/image:opacity-100 transition-opacity z-10 shadow-sm">
                                <ChevronRight size={16} />
                            </button>
                            {/* Dots */}
                            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                                {images.slice(0, 5).map((_, idx) => (
                                    <div
                                        key={idx}
                                        className={`w-1.5 h-1.5 rounded-full transition-all ${idx === currentImageIndex ? 'bg-white w-3' : 'bg-white/50'}`}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* 2. Content Area (Middle) */}
            <div className="flex-1 flex flex-col px-1 md:px-2">
                <Link to={`/products/${product.slug}`}>
                    <h3 className="text-sm md:text-xl font-bold text-gray-900 leading-tight mb-1 hover:text-blue-600 transition-colors line-clamp-1 md:line-clamp-2">{product.name}</h3>
                </Link>

                {/* Rating & Review Count */}
                <div className="flex items-center gap-1 mb-2">
                    <span className="flex text-[#F4C430]">
                        {[...Array(5)].map((_, i) => (
                            <svg key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'}`} viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        ))}
                    </span>
                    <span className="text-xs text-gray-400">({product.reviewCount})</span>
                </div>



                {/* Truncated Description - Hidden on small mobile */}
                <div
                    onClick={handleDetailsClick}
                    className="hidden md:block text-sm text-gray-600 leading-relaxed mb-4 cursor-pointer hover:text-gray-900 transition-colors"
                >
                    {product.description && product.description.length > 60
                        ? `${product.description.substring(0, 60)}... `
                        : (product.description || "Experience the ultimate comfort and style...")}

                    {(product.description?.length > 60 || !product.description) && (
                        <span className="text-blue-500 font-medium text-xs hover:underline">more</span>
                    )}
                </div>

                {/* Spacer to push bottom action */}
                <div className="mt-auto"></div>

                {/* 3. Bottom Action Area */}
                {!hideActions && (
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between pt-2 gap-2 md:gap-0">
                        {/* Price Pill */}
                        <div className="bg-gray-100 px-2 md:px-4 py-1 md:py-2 rounded-lg md:rounded-xl flex flex-col justify-center min-w-[60px] md:min-w-[80px]">
                            {product.originalPrice && product.originalPrice > product.price ? (
                                // CASE 1: Offer Exists
                                <>
                                    <span className="text-xs md:text-sm font-black text-gray-900">₹{product.price}</span>
                                    <span className="text-[10px] text-gray-500 line-through font-medium">₹{product.originalPrice}</span>
                                </>
                            ) : (
                                // CASE 2: No Offer
                                <span className="text-xs md:text-sm font-black text-gray-900">₹{product.price}</span>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-1 md:gap-2 w-full md:w-auto justify-between md:justify-end">
                            {/* Add to Cart Icon Button */}
                            <button
                                onClick={handleAddToCart}
                                disabled={isAdded}
                                className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full border transition-all ${isAdded ? 'bg-green-500 border-green-500 text-white' : 'border-gray-200 hover:bg-gray-50 text-gray-700'}`}
                                title="Add to Cart"
                            >
                                {isAdded ? <Check size={14} className="md:w-[18px] md:h-[18px]" /> : <ShoppingBag size={14} className="md:w-[18px] md:h-[18px]" />}
                            </button>

                            {/* Buy Now Button */}
                            <button
                                onClick={handleBuyNow}
                                className="bg-black text-white px-3 md:px-4 py-2 md:py-2.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 hover:bg-gray-800 transition-colors shadow-lg shadow-gray-200 flex-1 md:flex-none justify-center"
                            >
                                Buy <ArrowUpRight size={10} className="md:w-[12px] md:h-[12px]" />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default ProductCard;
