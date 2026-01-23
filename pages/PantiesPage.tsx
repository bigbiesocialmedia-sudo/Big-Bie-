import React from 'react';
import CollectionHero from '../components/CollectionHero';
import ProductGrid from '../components/ProductGrid';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAdmin } from '../context/AdminContext';

const PantiesPage: React.FC = () => {
    const { products } = useAdmin();
    const pantiesProducts = products.filter(p => p.category === 'Panties');

    return (
        <div className="min-h-screen">
            <Header />
            <CollectionHero
                title="Panties"
                imageUrl="https://images.unsplash.com/photo-1571513722275-4b41940f54b8?auto=format&fit=crop&q=80&w=1920"
            />
            <ProductGrid category="Panties" products={pantiesProducts} />
            <Footer />
        </div>
    );
};

export default PantiesPage;
