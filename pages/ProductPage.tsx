import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
// import { getProductBySlug } from '../data/products'; // REMOVED: Static data source
import { useCart } from '../context/CartContext';
import { useAdmin } from '../context/AdminContext'; // ADDED: Dynamic data source
import Header from '../components/Header';
import Footer from '../components/Footer';
import ImageGallery from '../components/ImageGallery';
import VariantSelector from '../components/VariantSelector';
import { Star } from 'lucide-react';

const ProductPage: React.FC = () => {
    const { productSlug } = useParams<{ productSlug: string }>();
    const navigate = useNavigate();

    // Use AdminContext to get the "Live" list of products (including new ones)
    const { products } = useAdmin();
    const product = products.find(p => p.slug === productSlug); // Find in live data

    const [selectedSize, setSelectedSize] = useState<string>('');
    const [selectedColor, setSelectedColor] = useState<string>('');
    const [quantity, setQuantity] = useState<number>(1);

    // Set default variants on load
    useEffect(() => {
        if (product) {
            const defaultSize = product.variants.find((v) => v.type === 'size' && v.inStock);
            const defaultColor = product.variants.find((v) => v.type === 'color' && v.inStock);

            if (defaultSize) setSelectedSize(defaultSize.value);
            if (defaultColor) setSelectedColor(defaultColor.value);
        }
    }, [product]);

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
        if (!selectedSize && product.variants.some(v => v.type === 'size')) {
            alert('Please select a size');
            return;
        }
        if (!selectedColor && product.variants.some(v => v.type === 'color')) {
            alert('Please select a color');
            return;
        }

        addToCart(product, quantity, selectedSize, selectedColor);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    const handleBuyNow = () => {
        if (!selectedSize && product.variants.some(v => v.type === 'size')) {
            alert('Please select a size');
            return;
        }
        if (!selectedColor && product.variants.some(v => v.type === 'color')) {
            alert('Please select a color');
            return;
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
                        <ImageGallery images={product.images} productName={product.name} />
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

                        {/* Variant Selectors */}
                        <VariantSelector
                            variants={product.variants}
                            type="size"
                            selectedValue={selectedSize}
                            onSelect={setSelectedSize}
                            label="SIZE"
                        />

                        <VariantSelector
                            variants={product.variants}
                            type="color"
                            selectedValue={selectedColor}
                            onSelect={setSelectedColor}
                            label="COLOR"
                        />

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
