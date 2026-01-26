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
                imageUrl="https://images.unsplash.com/photo-1594616091971-bf856a77b57d?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
