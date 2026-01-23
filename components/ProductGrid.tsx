import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { Product } from '../types';
import ProductCard from './ProductCard';

interface ProductGridProps {
    category: string;
    products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ category, products }) => {
    const [filterOpen, setFilterOpen] = useState(false);
    const [sortOpen, setSortOpen] = useState(false);
    const [sortOption, setSortOption] = useState<'price_asc' | 'price_desc' | 'newest'>('newest');

    // Filter Logic can be expanded here. For now, we take products as passed.
    // Sorting Logic
    const sortedProducts = [...products].sort((a, b) => {
        if (sortOption === 'price_asc') return a.price - b.price;
        if (sortOption === 'price_desc') return b.price - a.price;
        return 0; // 'newest' assumed as default order or date if available
    });

    return (
        <div className="container mx-auto px-6 py-8">

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
                <Link to="/" className="hover:text-black transition-colors">Home</Link>
                <span>/</span>
                <span className="text-black">{category}</span>
            </div>

            {/* Filter and Sort Bar */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">

                {/* Filter Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setFilterOpen(!filterOpen)}
                        className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-black transition-colors"
                    >
                        Filter
                        <ChevronDown size={16} className={`transition-transform ${filterOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {filterOpen && (
                        <div className="absolute top-full mt-2 left-0 bg-white border border-gray-200 rounded shadow-lg py-2 w-48 z-10">
                            <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50">All {category}</button>
                            {/* Potential dynamic filters based on variants or sub-categories */}
                        </div>
                    )}
                </div>

                {/* Sort Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setSortOpen(!sortOpen)}
                        className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-black transition-colors"
                    >
                        {sortOption === 'price_asc' ? 'Price, low to high' :
                            sortOption === 'price_desc' ? 'Price, high to low' : 'Newest first'}
                        <ChevronDown size={16} className={`transition-transform ${sortOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {sortOpen && (
                        <div className="absolute top-full mt-2 right-0 bg-white border border-gray-200 rounded shadow-lg py-2 w-48 z-10">
                            <button
                                onClick={() => { setSortOption('price_asc'); setSortOpen(false); }}
                                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                            >
                                Price, low to high
                            </button>
                            <button
                                onClick={() => { setSortOption('price_desc'); setSortOpen(false); }}
                                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                            >
                                Price, high to low
                            </button>
                            <button
                                onClick={() => { setSortOption('newest'); setSortOpen(false); }}
                                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                            >
                                Newest first
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {sortedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
            {sortedProducts.length === 0 && (
                <div className="text-center py-20 text-gray-500">
                    No products found in this category.
                </div>
            )}
        </div>
    );
};

export default ProductGrid;
