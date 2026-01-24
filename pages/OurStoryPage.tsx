import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const OurStoryPage: React.FC = () => {
    useEffect(() => {
        document.title = 'Our Story - Big Bie Innerwear | Quality Comfort Since Day One';
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', 'Discover the Big Bie story. Learn about our journey in creating high-quality, comfortable, and affordable innerwear for the whole family.');
        } else {
            const meta = document.createElement('meta');
            meta.name = 'description';
            meta.content = 'Discover the Big Bie story. Learn about our journey in creating high-quality, comfortable, and affordable innerwear for the whole family.';
            document.head.appendChild(meta);
        }
    }, []);

    return (
        <>
            <Header />
            <main className="min-h-screen bg-white pt-24">
                <div className="container mx-auto px-6 max-w-5xl py-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-black mb-8">Our Story</h1>

                    <div className="prose prose-lg max-w-none">
                        <p className="text-lg text-gray-700 leading-relaxed mb-6">
                            Welcome to Big Bie, where comfort meets style in every piece of innerwear we create.
                            Our journey began with a simple mission: to provide high-quality, comfortable, and
                            affordable innerwear for the whole family.
                        </p>

                        <h2 className="text-3xl font-bold text-black mt-12 mb-6">Our Beginning</h2>
                        <p className="text-lg text-gray-700 leading-relaxed mb-6">
                            Founded with a passion for excellence, Big Bie has grown from a small family business
                            to a trusted name in innerwear. We understand that the foundation of a great day starts
                            with the right undergarments, and that's exactly what we deliver.
                        </p>

                        <h2 className="text-3xl font-bold text-black mt-12 mb-6">Our Values</h2>
                        <div className="grid md:grid-cols-3 gap-8 my-8">
                            <div className="bg-[#F4C430]/10 p-6 rounded-lg">
                                <h3 className="text-xl font-bold text-black mb-3">Quality First</h3>
                                <p className="text-gray-700">
                                    We never compromise on the quality of materials and craftsmanship in our products.
                                </p>
                            </div>
                            <div className="bg-[#F4C430]/10 p-6 rounded-lg">
                                <h3 className="text-xl font-bold text-black mb-3">Customer Focused</h3>
                                <p className="text-gray-700">
                                    Your comfort and satisfaction are at the heart of everything we do.
                                </p>
                            </div>
                            <div className="bg-[#F4C430]/10 p-6 rounded-lg">
                                <h3 className="text-xl font-bold text-black mb-3">Innovation</h3>
                                <p className="text-gray-700">
                                    We continuously evolve our designs to meet the changing needs of modern living.
                                </p>
                            </div>
                        </div>

                        <h2 className="text-3xl font-bold text-black mt-12 mb-6">Today</h2>
                        <p className="text-lg text-gray-700 leading-relaxed mb-6">
                            Today, Big Bie serves thousands of satisfied customers across the country, offering
                            a comprehensive range of innerwear for women, men, and kids. Our commitment to quality,
                            comfort, and affordability remains unwavering.
                        </p>

                        <p className="text-lg text-gray-700 leading-relaxed">
                            Thank you for being part of our journey. We look forward to serving you and your family
                            for years to come.
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default OurStoryPage;
