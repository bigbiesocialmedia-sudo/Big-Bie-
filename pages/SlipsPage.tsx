import React from 'react';
import CollectionHero from '../components/CollectionHero';
import ProductGrid from '../components/ProductGrid';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAdmin } from '../context/AdminContext';

const SlipsPage: React.FC = () => {
    const { products } = useAdmin();
    const slipsProducts = products.filter(p => p.category === 'Slips');

    return (
        <div className="min-h-screen">
            <Header />
            <CollectionHero
                title="Slips"
                imageUrl="/Products/Slips.png"
                bgColor="bg-[#D4C4B0]"
            />
            <ProductGrid category="Slips" products={slipsProducts} />
            <Footer />
        </div>
    );
};

export default SlipsPage;
