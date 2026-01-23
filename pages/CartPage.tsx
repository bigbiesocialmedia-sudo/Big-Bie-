
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';

const CartPage: React.FC = () => {
    const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
    const navigate = useNavigate();

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-grow flex flex-col items-center justify-center p-4">
                    <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
                    <p className="text-gray-600 mb-8">Looks like you haven't added anything yet.</p>
                    <Link
                        to="/"
                        className="bg-[#F4C430] text-black font-bold py-3 px-8 rounded hover:bg-[#E5B520] transition-colors"
                    >
                        Start Shopping
                    </Link>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <main className="container mx-auto px-4 py-8 mb-12">
                <h1 className="text-3xl font-bold mb-8 text-center md:text-left mt-10">Your Shopping Cart</h1>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Cart Items */}
                    <div className="lg:w-2/3">
                        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                            {cartItems.map((item) => (
                                <div
                                    key={`${item.productId}-${item.selectedVariants.size}-${item.selectedVariants.color}`}
                                    className="flex gap-4 p-4 border-b border-gray-100 last:border-0"
                                >
                                    {/* Product Image - Fixed Size */}
                                    <div className="w-24 h-32 flex-shrink-0 bg-gray-50 rounded-md overflow-hidden">
                                        <img
                                            src={item.image}
                                            alt={item.productName}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Product Details & Controls */}
                                    <div className="flex-grow flex flex-col justify-between py-1">

                                        {/* Top Row: Title & Price */}
                                        <div className="flex justify-between items-start gap-2">
                                            <div>
                                                <Link to={`/products/${item.productSlug}`} className="text-sm sm:text-base font-semibold text-gray-900 line-clamp-2 hover:text-[#F4C430]">
                                                    {item.productName}
                                                </Link>
                                                <div className="text-xs text-gray-500 mt-1 space-x-2">
                                                    {item.selectedVariants.size && <span className="bg-gray-100 px-1.5 py-0.5 rounded">Size: {item.selectedVariants.size}</span>}
                                                    {item.selectedVariants.color && <span className="bg-gray-100 px-1.5 py-0.5 rounded">Color: {item.selectedVariants.color}</span>}
                                                </div>
                                            </div>
                                            <div className="text-sm sm:text-lg font-bold whitespace-nowrap">
                                                Rs. {item.price.toFixed(0)}
                                            </div>
                                        </div>

                                        {/* Bottom Row: Quantity & Remove */}
                                        <div className="flex justify-between items-end mt-2">

                                            {/* Compact Quantity Control */}
                                            <div className="flex items-center border border-gray-300 rounded-lg h-8">
                                                <button
                                                    onClick={() => updateQuantity(item.productId, item.quantity - 1, item.selectedVariants.size, item.selectedVariants.color)}
                                                    className="w-8 h-full flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded-l-lg disabled:opacity-50"
                                                    disabled={item.quantity <= 1}
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.productId, item.quantity + 1, item.selectedVariants.size, item.selectedVariants.color)}
                                                    className="w-8 h-full flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded-r-lg"
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>

                                            {/* Remove Button */}
                                            <button
                                                onClick={() => removeFromCart(item.productId, item.selectedVariants.size, item.selectedVariants.color)}
                                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:w-1/3">
                        <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                            <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>Rs. {cartTotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span className="text-green-600">Free</span>
                                </div>
                                <div className="border-t pt-4 flex justify-between font-bold text-lg">
                                    <span>Total</span>
                                    <span>Rs. {cartTotal.toFixed(2)}</span>
                                </div>
                            </div>

                            <Link
                                to="/checkout"
                                className="w-full bg-black text-white font-bold py-4 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                            >
                                Proceed to Checkout
                                <ArrowRight size={20} />
                            </Link>

                            <div className="mt-4 text-center">
                                <Link to="/" className="text-sm text-gray-500 hover:text-black underline">
                                    Continue Shopping
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default CartPage;
