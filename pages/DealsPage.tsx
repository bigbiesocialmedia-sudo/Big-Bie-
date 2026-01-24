import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const DealsPage: React.FC = () => {
    useEffect(() => {
        document.title = 'Deals & Bulk Orders - Big Bie Innerwear | Special Offers';
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', 'Get exclusive deals and bulk order discounts on Big Bie innerwear. Perfect for retailers, hotels, institutions, and bulk buyers.');
        } else {
            const meta = document.createElement('meta');
            meta.name = 'description';
            meta.content = 'Get exclusive deals and bulk order discounts on Big Bie innerwear. Perfect for retailers, hotels, institutions, and bulk buyers.';
            document.head.appendChild(meta);
        }
    }, []);

    return (
        <>
            <Header />
            <main className="min-h-screen bg-white pt-24">
                <div className="container mx-auto px-6 max-w-5xl py-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-black mb-8">Deals & Bulk Orders</h1>

                    <div className="prose prose-lg max-w-none">
                        <p className="text-lg text-gray-700 leading-relaxed mb-6">
                            Looking for bulk orders or special deals? Big Bie offers competitive pricing for retailers,
                            hotels, institutions, and bulk buyers. Whether you need 100 pieces or 10,000, we've got you covered.
                        </p>

                        <div className="bg-[#F4C430] p-8 rounded-lg my-12 text-black">
                            <h2 className="text-3xl font-bold mb-4">Why Choose Big Bie for Bulk Orders?</h2>
                            <p className="text-lg leading-relaxed mb-4">
                                We understand the needs of businesses and institutions. Our bulk ordering service is designed
                                to provide you with the best quality at the best prices, with flexible payment options and
                                reliable delivery.
                            </p>
                        </div>

                        <h2 className="text-3xl font-bold text-black mt-12 mb-6">Bulk Order Benefits</h2>

                        <div className="grid md:grid-cols-2 gap-8 my-8">
                            <div className="border-l-4 border-[#F4C430] pl-6">
                                <h3 className="text-2xl font-bold text-black mb-3">Volume Discounts</h3>
                                <p className="text-gray-700">
                                    Get up to 30% off on bulk orders. The more you order, the more you save. Special pricing
                                    tiers available for different quantities.
                                </p>
                            </div>

                            <div className="border-l-4 border-[#F4C430] pl-6">
                                <h3 className="text-2xl font-bold text-black mb-3">Custom Packaging</h3>
                                <p className="text-gray-700">
                                    Need custom packaging or branding? We offer customization options for large orders to
                                    meet your specific requirements.
                                </p>
                            </div>

                            <div className="border-l-4 border-[#F4C430] pl-6">
                                <h3 className="text-2xl font-bold text-black mb-3">Flexible Payment</h3>
                                <p className="text-gray-700">
                                    Multiple payment options including credit terms for verified businesses. We make it easy
                                    for you to do business with us.
                                </p>
                            </div>

                            <div className="border-l-4 border-[#F4C430] pl-6">
                                <h3 className="text-2xl font-bold text-black mb-3">Fast Delivery</h3>
                                <p className="text-gray-700">
                                    Priority processing and shipping for bulk orders. We ensure your order reaches you on time,
                                    every time.
                                </p>
                            </div>
                        </div>

                        <h2 className="text-3xl font-bold text-black mt-12 mb-6">Who Can Benefit?</h2>
                        <div className="space-y-4 mb-8">
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h3 className="font-bold text-black text-xl mb-2">🏢 Retailers & Distributors</h3>
                                <p className="text-gray-700">
                                    Stock your store with premium quality innerwear at wholesale prices. Become a Big Bie partner today.
                                </p>
                            </div>

                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h3 className="font-bold text-black text-xl mb-2">🏨 Hotels & Hospitality</h3>
                                <p className="text-gray-700">
                                    Bulk innerwear supplies for your guest rooms and spa services. Quality products that enhance guest experience.
                                </p>
                            </div>

                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h3 className="font-bold text-black text-xl mb-2">🏫 Institutions & Organizations</h3>
                                <p className="text-gray-700">
                                    Schools, hospitals, NGOs, and other organizations can benefit from our bulk pricing and reliable service.
                                </p>
                            </div>

                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h3 className="font-bold text-black text-xl mb-2">🎁 Corporate Gifting</h3>
                                <p className="text-gray-700">
                                    High-quality innerwear makes for practical corporate gifts. Customization and branding options available.
                                </p>
                            </div>
                        </div>

                        <div className="bg-[#F4C430]/20 p-8 rounded-lg mt-12">
                            <h2 className="text-3xl font-bold text-black mb-4">Get a Quote</h2>
                            <p className="text-lg text-gray-700 mb-4">
                                Ready to place a bulk order? Contact our sales team for a customized quote tailored to your needs.
                            </p>
                            <div className="space-y-3">
                                <p className="text-lg text-gray-700">
                                    📞 <strong>Call:</strong> +91 831-0306547
                                </p>
                                <p className="text-lg text-gray-700">
                                    📧 <strong>Email:</strong> <a href="mailto:bulkorders@bigbie.com" className="text-[#F4C430] font-semibold hover:underline">bulkorders@bigbie.com</a>
                                </p>
                                <p className="text-lg text-gray-700">
                                    💬 <strong>WhatsApp:</strong> +91 98765 43210
                                </p>
                            </div>
                            <button className="mt-6 px-8 py-3 bg-black text-white font-semibold hover:bg-black/90 transition-colors">
                                Request Quote
                            </button>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default DealsPage;
