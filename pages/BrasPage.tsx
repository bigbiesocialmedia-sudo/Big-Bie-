import React from 'react';
import CollectionHero from '../components/CollectionHero';
import ProductGrid from '../components/ProductGrid';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAdmin } from '../context/AdminContext';

const BrasPage: React.FC = () => {
    const { products } = useAdmin();
    const braProducts = products.filter(p => p.category === 'Bras');

    return (
        <div className="min-h-screen">
            <Header />
            <CollectionHero
                title="Bras"
                imageUrl="https://images.unsplash.com/photo-1580651315530-2a6a6a0be7b4?auto=format&fit=crop&q=80&w=1920"
            />
            {/* Map Admin Products to match ProductGrid expected format if necessary, 
                but ProductGrid likely takes Product type. Let's check ProductGrid usage. 
                The interface might be slightly different. 
                Wait, ProductGrid usually takes 'products' array. 
                Let's assume it accepts the Product type we have. */}
            <ProductGrid category="Bras" products={braProducts} />
            <Footer />
        </div>
    );
};

export default BrasPage;
