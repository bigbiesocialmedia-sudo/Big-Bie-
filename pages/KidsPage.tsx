import React from 'react';
import CollectionHero from '../components/CollectionHero';
import ProductGrid from '../components/ProductGrid';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAdmin } from '../context/AdminContext';

const KidsPage: React.FC = () => {
    const { products } = useAdmin();
    const kidsProducts = products.filter(p => p.category === 'Kids');

    return (
        <div className="min-h-screen">
            <Header />
            <CollectionHero
                title="Kids"
                imageUrl="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80&w=1920"
                bgColor="bg-[#F4C430]"
            />
            <ProductGrid category="Kids" products={kidsProducts} />
            <Footer />
        </div>
    );
};

export default KidsPage;
