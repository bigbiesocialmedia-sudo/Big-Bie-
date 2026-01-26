import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAdmin } from '../context/AdminContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ImageGallery from '../components/ImageGallery';
import VariantSelector from '../components/VariantSelector';
import AdvancedVariantSelector from '../components/AdvancedVariantSelector';
import { Star } from 'lucide-react';
import {
    usesAdvancedVariants,
    getAvailableSizes,
    getAvailableColors,
    getImagesForColor,
    isVariantAvailable,
    getVariantStock
} from '../utils/variantHelpers';

const ProductPage: React.FC = () => {
    const { productSlug } = useParams<{ productSlug: string }>();
    const navigate = useNavigate();

    // Use AdminContext to get the "Live" list of products (including new ones)
    const { products } = useAdmin();
    const product = products.find(p => p.slug === productSlug); // Find in live data

    const [selectedSize, setSelectedSize] = useState<string>('');
    const [selectedColor, setSelectedColor] = useState<string>('');
    const [quantity, setQuantity] = useState<number>(1);
    const [currentImages, setCurrentImages] = useState<string[]>([]);

    // Set default variants and images on load
    useEffect(() => {
        if (product) {
            console.log('[ProductPage] Product loaded:', {
                slug: product.slug,
                mainImages: product.images?.length || 0,
                imageGroups: product.imageGroups?.length || 0,
                variantCombinations: product.variantCombinations?.length || 0
            });

            // Get initial images with fallbacks
            let initialImages = product.images || [];

            // Fallback 1: If main images empty, try imageGroups
            if (initialImages.length === 0 && product.imageGroups && product.imageGroups.length > 0) {
                console.log('[ProductPage] Using imageGroups as fallback');
                const allGroupImages: string[] = [];
                product.imageGroups.forEach(group => {
                    if (group.images) allGroupImages.push(...group.images);
                });
                initialImages = allGroupImages;
            }

            // Fallback 2: If still empty, try first combination's images
            if (initialImages.length === 0 && product.variantCombinations && product.variantCombinations.length > 0) {
                console.log('[ProductPage] Using variantCombinations as fallback');
                const firstCombo = product.variantCombinations[0];
                if (firstCombo.images && firstCombo.images.length > 0) {
                    initialImages = firstCombo.images;
                }
            }

            setCurrentImages(initialImages);
            console.log('[ProductPage] Initial images set:', initialImages.length);

            // Get available sizes and colors
            const availableSizes = getAvailableSizes(product);
            const availableColors = getAvailableColors(product);

            // Set first available size and color as defaults
            if (availableSizes.length > 0) setSelectedSize(availableSizes[0]);
            if (availableColors.length > 0) {
                const firstColor = availableColors[0];
                setSelectedColor(firstColor);
                // Set images for default color
                const colorImages = getImagesForColor(product, firstColor);
                console.log('[ProductPage] Images for first color:', colorImages.length);
                setCurrentImages(colorImages);
            }
        }
    }, [product]);

    // Handle size selection with dynamic color filtering
    const handleSizeSelect = (size: string) => {
        console.log('[handleSizeSelect] Selected size:', size);
        setSelectedSize(size);

        // Get colors available for this size
        const availableColors = getAvailableColors(product!, size);
        console.log('[handleSizeSelect] Available colors for size:', availableColors);

        // If current color is no longer available, auto-select first available
        if (selectedColor && !availableColors.includes(selectedColor)) {
            if (availableColors.length > 0) {
                const newColor = availableColors[0];
                console.log('[handleSizeSelect] Auto-selecting color:', newColor);
                setSelectedColor(newColor);
                const newImages = getImagesForColor(product!, newColor);
                console.log('[handleSizeSelect] Loading images for new color:', newImages.length);
                setCurrentImages(newImages);
            } else {
                // No colors available for this size
                setSelectedColor('');
                setCurrentImages([]);
            }
        } else if (selectedColor) {
            // Color is still valid, just update images for this combination
            const newImages = getImagesForColor(product!, selectedColor);
            console.log('[handleSizeSelect] Updating images for existing color:', newImages.length);
            setCurrentImages(newImages);
        }
    };

    // Handle color selection with dynamic size filtering and image switching
    const handleColorSelect = (color: string) => {
        console.log('[handleColorSelect] Selected color:', color);
        setSelectedColor(color);

        // Switch images for selected color
        const newImages = getImagesForColor(product!, color);
        console.log('[handleColorSelect] Loading images:', newImages.length);
        setCurrentImages(newImages);

        // Get sizes available for this color
        const availableSizes = getAvailableSizes(product!, color);
        console.log('[handleColorSelect] Available sizes for color:', availableSizes);

        // If current size is no longer available, auto-select first available
        if (selectedSize && !availableSizes.includes(selectedSize)) {
            if (availableSizes.length > 0) {
                const newSize = availableSizes[0];
                console.log('[handleColorSelect] Auto-selecting size:', newSize);
                setSelectedSize(newSize);
            } else {
                setSelectedSize('');
            }
        }
    };

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
                    <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
                    <Link to="/" className="text-[#F4C430] underline">
                        Return to Home
                    </Link>
                </div>
            </div>
        );
    }

    const { addToCart } = useCart();

    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCart = () => {
        // Check if size/color selection is required
        const hasSize = usesAdvancedVariants(product)
            ? (product.variantCombinations?.some(vc => vc.stock > 0) || false)
            : product.variants.some(v => v.type === 'size');
        const hasColor = usesAdvancedVariants(product)
            ? (product.variantCombinations?.some(vc => vc.stock > 0) || false)
            : product.variants.some(v => v.type === 'color');

        if (!selectedSize && hasSize) {
            alert('Please select a size');
            return;
        }
        if (!selectedColor && hasColor) {
            alert('Please select a color');
            return;
        }

        // For advanced variants, check stock availability
        if (usesAdvancedVariants(product)) {
            if (!isVariantAvailable(product, selectedSize, selectedColor)) {
                alert('This combination is out of stock');
                return;
            }

            const stock = getVariantStock(product, selectedSize, selectedColor);
            if (stock !== null && quantity > stock) {
                alert(`Only ${stock} items available for this combination`);
                return;
            }
        }

        addToCart(product, quantity, selectedSize, selectedColor);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    const handleBuyNow = () => {
        // Check if size/color selection is required
        const hasSize = usesAdvancedVariants(product)
            ? (product.variantCombinations?.some(vc => vc.stock > 0) || false)
            : product.variants.some(v => v.type === 'size');
        const hasColor = usesAdvancedVariants(product)
            ? (product.variantCombinations?.some(vc => vc.stock > 0) || false)
            : product.variants.some(v => v.type === 'color');

        if (!selectedSize && hasSize) {
            alert('Please select a size');
            return;
        }
        if (!selectedColor && hasColor) {
            alert('Please select a color');
            return;
        }

        // For advanced variants, check stock availability
        if (usesAdvancedVariants(product)) {
            if (!isVariantAvailable(product, selectedSize, selectedColor)) {
                alert('This combination is out of stock');
                return;
            }

            const stock = getVariantStock(product, selectedSize, selectedColor);
            if (stock !== null && quantity > stock) {
                alert(`Only ${stock} items available for this combination`);
                return;
            }
        }

        addToCart(product, quantity, selectedSize, selectedColor);
        navigate('/cart');
    };

    const incrementQuantity = () => setQuantity((prev) => prev + 1);
    const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

    return (
        <div className="min-h-screen bg-white">
            <Header />

            <main className="max-w-7xl mx-auto px-4 pt-32 pb-16">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm mb-6 overflow-x-auto whitespace-nowrap">
                    <Link to="/" className="text-gray-600 hover:text-gray-900">
                        Home
                    </Link>
                    <span className="text-gray-400">/</span>
                    <Link to={`/collections/${product.category.toLowerCase()}`} className="text-gray-600 hover:text-gray-900">
                        {product.category}
                    </Link>
                    <span className="text-gray-400">/</span>
                    <span className="text-gray-900 font-semibold">{product.name}</span>
                </nav>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-16">
                    {/* Left: Image Gallery */}
                    <div>
                        <ImageGallery images={currentImages} productName={product.name} />
                    </div>

                    {/* Right: Product Details */}
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold mb-2">{product.name}</h1>

                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-4">
                            <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-5 h-5 ${i < Math.floor(product.rating)
                                            ? 'fill-[#F4C430] text-[#F4C430]'
                                            : 'text-gray-300'
                                            }`}
                                    />
                                ))}
                            </div>
                            <span className="text-sm text-gray-600">
                                {product.rating} ({product.reviewCount} reviews)
                            </span>
                        </div>

                        {/* Price */}
                        <div className="flex items-baseline gap-3 mb-2">
                            <span className="text-3xl font-bold">Rs. {product.price.toFixed(2)}</span>
                            {product.originalPrice && (
                                <span className="text-xl text-gray-400 line-through">
                                    Rs. {product.originalPrice.toFixed(2)}
                                </span>
                            )}
                        </div>
                        <p className="text-sm text-gray-500 mb-6">Tax included.</p>

                        {/* Size Chart Link (if sizes available) */}
                        {product.variants.some((v) => v.type === 'size') && (
                            <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-6">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                                Size Chart
                            </button>
                        )}

                        {/* Variant Selectors - Use Advanced for new products, Legacy for old */}
                        {usesAdvancedVariants(product) ? (
                            <>
                                <AdvancedVariantSelector
                                    product={product}
                                    type="size"
                                    selectedValue={selectedSize}
                                    selectedColor={selectedColor}
                                    onSelect={handleSizeSelect}
                                    label="SIZE"
                                />

                                <AdvancedVariantSelector
                                    product={product}
                                    type="color"
                                    selectedValue={selectedColor}
                                    selectedSize={selectedSize}
                                    onSelect={handleColorSelect}
                                    label="COLOR"
                                />
                            </>
                        ) : (
                            <>
                                <VariantSelector
                                    variants={product.variants}
                                    type="size"
                                    selectedValue={selectedSize}
                                    onSelect={handleSizeSelect}
                                    label="SIZE"
                                />

                                <VariantSelector
                                    variants={product.variants}
                                    type="color"
                                    selectedValue={selectedColor}
                                    onSelect={handleColorSelect}
                                    label="COLOR"
                                />
                            </>
                        )}

                        {/* Quantity Selector */}
                        <div className="mb-6">
                            <h3 className="text-sm font-semibold uppercase mb-3">QUANTITY</h3>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={decrementQuantity}
                                    className="w-10 h-10 border border-gray-300 rounded hover:bg-gray-100 flex items-center justify-center transition-colors"
                                >
                                    −
                                </button>
                                <span className="text-lg font-semibold w-12 text-center">{quantity}</span>
                                <button
                                    onClick={incrementQuantity}
                                    className="w-10 h-10 border border-gray-300 rounded hover:bg-gray-100 flex items-center justify-center transition-colors"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4 mb-8">
                            <button
                                onClick={handleAddToCart}
                                disabled={isAdded}
                                className={`flex-1 font-bold py-4 px-6 rounded transition-all active:scale-95 ${isAdded
                                    ? 'bg-green-600 text-white cursor-default scale-100'
                                    : 'bg-[#F4C430] text-black hover:bg-[#E5B520]'
                                    }`}
                            >
                                {isAdded ? 'Added to Cart ✓' : 'Add to cart'}
                            </button>
                            <button
                                onClick={handleBuyNow}
                                className="flex-1 bg-black text-white font-bold py-4 px-6 rounded hover:bg-gray-800 transition-transform active:scale-95"
                            >
                                Buy Now
                            </button>
                        </div>

                        {/* Product Description */}
                        <div className="border-t pt-6">
                            <h3 className="text-lg font-semibold mb-3">Product Details</h3>
                            <p className="text-gray-600 leading-relaxed">{product.description}</p>
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="mb-16">
                    <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
                    <div className="bg-gray-50 p-6 rounded-lg">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="text-4xl font-bold text-gray-900">{product.rating}</div>
                            <div>
                                <div className="flex items-center text-[#F4C430] mb-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'}`}
                                        />
                                    ))}
                                </div>
                                <p className="text-sm text-gray-500">Based on {product.reviewCount} reviews</p>
                            </div>
                        </div>
                        {/* Placeholder for reviews list - would be dynamic in real app */}
                        <div className="border-t border-gray-200 pt-4 mt-4">
                            <p className="text-gray-600 italic">"Absolutely love the fit and comfort. Will buy more!" - Sarah K.</p>
                        </div>
                    </div>
                </div>

                {/* People Also Viewed Section */}
                <div>
                    <h2 className="text-2xl font-bold mb-6">People Also Viewed</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                        {/* This would normally filter out current product */}
                        {[1, 2, 3, 4].map((item) => (
                            <div key={item} className="group cursor-pointer">
                                <div className="bg-gray-100 aspect-[3/4] mb-3 rounded-lg overflow-hidden">
                                    {/* Placeholder images */}
                                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                                        Product {item}
                                    </div>
                                </div>
                                <h3 className="font-semibold text-gray-900 group-hover:text-[#F4C430] transition-colors">Similar Product {item}</h3>
                                <p className="text-gray-500">Rs. {450 + item * 50}.00</p>
                            </div>
                        ))}
                    </div>
                </div>

            </main>

            <Footer />
        </div>
    );
};

export default ProductPage;
