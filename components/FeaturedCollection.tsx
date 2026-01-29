import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';
import { ShoppingBag, ArrowUpRight, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';
import { Product } from '../types';

// Icons
const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

const FeaturedCard = ({ product, index }: { product: Product; index: number }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Robust Image Gathering
  const getProductImages = () => {
    let images: string[] = [];

    // Priority 1: Variant Combinations (e.g., Color-specific)
    if (product.variantCombinations && product.variantCombinations.length > 0) {
      // Collect all unique images from variants
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

  const handleDetailsClick = (e: React.MouseEvent) => {
    // If clicking description text, go to product
    e.stopPropagation();
    navigate(`/products/${product.slug}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Safely find default variants if they exist
    const defaultSize = product.productSizes?.[0]?.value ||
      product.variants?.find(v => v.type === 'size')?.value || 'M';
    const defaultColor = product.productColors?.[0]?.value ||
      product.variants?.find(v => v.type === 'color')?.value || 'Default';

    addToCart(product, 1, defaultSize, defaultColor);
    toast.success('Added to cart');
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/products/${product.slug}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-[32px] p-4 shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100 relative overflow-hidden flex flex-col h-full"
    >
      {/* 1. Image Area (Top) */}
      <div className="relative aspect-[4/5] rounded-[24px] overflow-hidden bg-gray-100 mb-4 isolate">

        {/* Badge */}
        <div className="absolute top-4 left-4 z-20">
          <span className="bg-[#F4C430] text-black text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider backdrop-blur-md">
            Best Seller
          </span>
        </div>

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
      <div className="flex-1 flex flex-col px-2">
        <Link to={`/products/${product.slug}`}>
          <h3 className="text-xl font-bold text-gray-900 leading-tight mb-1 hover:text-blue-600 transition-colors">{product.name}</h3>
        </Link>
        {/* Rating & Review Count */}
        <div className="flex items-center gap-1 mb-2">
          <span className="flex text-[#F4C430]">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'}`} viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </span>
          <span className="text-xs text-gray-400 font-medium">({product.reviewCount})</span>
        </div>

        <p className="text-xs text-gray-400 font-bold uppercase tracking-wide mb-3">Own the {product.category || 'Look'}</p>

        {/* Truncated Description */}
        <div
          onClick={handleDetailsClick}
          className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-2 hover:text-gray-900 cursor-pointer transition-colors"
          title="Click to view more"
        >
          {product.description || "Experience the ultimate comfort and style with our premium innerwear collection."}
          <span className="text-blue-500 font-medium ml-1 text-xs">more</span>
        </div>

        {/* Spacer to push bottom action */}
        <div className="mt-auto"></div>

        {/* 3. Bottom Action Area */}
        <div className="flex items-center justify-between pt-2">
          {/* Price Pill */}
          <div className="bg-gray-100 px-4 py-2 rounded-xl flex flex-col justify-center min-w-[80px]">
            {product.originalPrice && product.originalPrice > product.price ? (
              // CASE 1: Offer Exists (Show Savings)
              <>
                <span className="text-sm font-black text-gray-900">₹{product.price}</span>
                <span className="text-[10px] text-gray-500 line-through font-medium">₹{product.originalPrice}</span>
              </>
            ) : (
              // CASE 2: No Offer (Clean Price)
              <span className="text-sm font-black text-gray-900">₹{product.price}</span>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Add to Cart Icon Button */}
            <button
              onClick={handleAddToCart}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50 text-gray-700 transition-colors"
              title="Add to Cart"
            >
              <ShoppingBag size={18} />
            </button>

            {/* Buy Now Button */}
            <button
              onClick={handleBuyNow}
              className="bg-black text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-gray-800 transition-colors shadow-lg shadow-gray-200"
            >
              Buy Now <ArrowUpRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};


const FeaturedCollection: React.FC = () => {
  const { products, homeSettings } = useAdmin();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Filter products based on saved IDs in homeSettings
  // SYNC FIX: We ONLY show what is in homeSettings. No auto-fill fallback.
  const displayProducts = products.filter(p => homeSettings.featuredProductIds.includes(p.id));

  useEffect(() => {
    if (isPaused || displayProducts.length === 0) return;

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        const maxScroll = scrollWidth - clientWidth;

        // Calculate scroll amount (one card width + gap)
        const isMobile = window.innerWidth < 768;
        const scrollAmount = isMobile ? 304 : 344; // 280+24 or 320+24

        if (scrollLeft >= maxScroll - 5) {
          // Reset to start
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      }
    }, 4000); // Scroll every 4 seconds

    return () => clearInterval(interval);
  }, [isPaused, displayProducts.length]);

  // Hide section completely if no products
  if (displayProducts.length === 0) {
    return null;
  }

  return (
    <section
      className="py-20 bg-gray-50/50"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container mx-auto px-6 max-w-[1200px]">

        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl lg:text-4xl font-black text-[#1A1A1A] tracking-tight">Best Selling Products</h2>
          <Link to="/collections/bras" className="hidden lg:flex items-center text-sm font-bold text-gray-500 hover:text-black transition-colors">
            View all <ArrowRightIcon className="ml-1 w-4 h-4" />
          </Link>
        </div>

        {/* Product Carousel - Horizontal Scroll */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 pb-8 -mx-6 px-6 md:mx-0 md:px-0 scrollbar-hide snap-x pointer-events-auto"
        >
          {displayProducts.map((product, index) => (
            <div key={product.id} className="w-[280px] md:w-[320px] flex-shrink-0 snap-center">
              <FeaturedCard product={product} index={index} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturedCollection;
