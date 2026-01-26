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
                imageUrl="https://images.pexels.com/photos/15045410/pexels-photo-15045410.jpeg"
                objectPosition="object-[center_80%]"
            />
            <ProductGrid category="Panties" products={pantiesProducts} />
            <Footer />
        </div>
    );
};

export default PantiesPage;
