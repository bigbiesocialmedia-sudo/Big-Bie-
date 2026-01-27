import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ChevronDown, Search, SlidersHorizontal, X } from 'lucide-react';
import { Product } from '../types';
import ProductCard from './ProductCard';

interface ProductGridProps {
    category: string;
    products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ category, products }) => {
    // State
    const [searchQuery, setSearchQuery] = useState('');
    const [filterOpen, setFilterOpen] = useState(false);
    const [sortOption, setSortOption] = useState<'price_asc' | 'price_desc' | 'newest'>('newest');

    // Filters
    const [budgetFilter, setBudgetFilter] = useState<'all' | 'under-500' | '500-1000' | 'above-1000'>('all');
    const [categoryFilter, setCategoryFilter] = useState<string>('all');

    // URL Params
    const [searchParams] = useSearchParams();

    // Effect: Sync categoryFilter with URL param
    useEffect(() => {
        const typeParam = searchParams.get('type');
        if (typeParam) {
            setCategoryFilter(decodeURIComponent(typeParam));
        } else {
            setCategoryFilter('all');
        }
    }, [searchParams]);

    // Derived Data for Filters
    const uniqueCategories = Array.from(new Set(products.map(p => p.subCollection || p.category))).filter(Boolean);

    // Filtering Logic
    const filteredProducts = products.filter(product => {
        // 1. Search
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description?.toLowerCase().includes(searchQuery.toLowerCase());

        // 2. Budget
        let matchesBudget = true;
        if (budgetFilter === 'under-500') matchesBudget = product.price < 500;
        else if (budgetFilter === '500-1000') matchesBudget = product.price >= 500 && product.price <= 1000;
        else if (budgetFilter === 'above-1000') matchesBudget = product.price > 1000;

        // 3. Category (Sub-category)
        let matchesCategory = true;
        if (categoryFilter !== 'all') {
            matchesCategory = (product.subCollection === categoryFilter) || (product.category === categoryFilter);
        }

        return matchesSearch && matchesBudget && matchesCategory;
    });

    // Sorting Logic
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sortOption === 'price_asc') return a.price - b.price;
        if (sortOption === 'price_desc') return b.price - a.price;
        return 0; // 'newest' implied by default order
    });

    return (
        <div className="container mx-auto px-6 py-8">

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
                <Link to="/" className="hover:text-black transition-colors">Home</Link>
                <span>/</span>
                <span className="text-black font-medium">{category}</span>
                <span className="text-gray-400">({products.length} items)</span>
            </div>

            {/* Sticky Toolbar */}
            <div className="sticky top-20 z-30 bg-white/80 backdrop-blur-md px-4 py-4 rounded-2xl shadow-sm border border-gray-100 mb-8 transition-all">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">

                    {/* Search Bar */}
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder={`Search in ${category}...`}
                            className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black/5 focus:border-black transition-all outline-none text-sm"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
                            >
                                <X size={14} />
                            </button>
                        )}
                    </div>

                    {/* Filters & Sort */}
                    <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">

                        {/* Budget Filter */}
                        <div className="relative flex-shrink-0">
                            <select
                                value={budgetFilter}
                                onChange={(e) => setBudgetFilter(e.target.value as any)}
                                className="appearance-none bg-white border border-gray-200 pl-4 pr-10 py-2.5 rounded-xl text-sm font-medium hover:border-gray-300 focus:outline-none cursor-pointer"
                            >
                                <option value="all">Any Price</option>
                                <option value="under-500">Under ₹500</option>
                                <option value="500-1000">₹500 - ₹1000</option>
                                <option value="above-1000">Above ₹1000</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                        </div>

                        {/* Category Filter (Dynamic) */}
                        {uniqueCategories.length > 0 && (
                            <div className="relative flex-shrink-0">
                                <select
                                    value={categoryFilter}
                                    onChange={(e) => setCategoryFilter(e.target.value)}
                                    className="appearance-none bg-white border border-gray-200 pl-4 pr-10 py-2.5 rounded-xl text-sm font-medium hover:border-gray-300 focus:outline-none cursor-pointer"
                                >
                                    <option value="all">All Types</option>
                                    {uniqueCategories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                            </div>
                        )}

                        {/* Sort */}
                        <div className="relative flex-shrink-0">
                            <select
                                value={sortOption}
                                onChange={(e) => setSortOption(e.target.value as any)}
                                className="appearance-none bg-white border border-gray-200 pl-4 pr-10 py-2.5 rounded-xl text-sm font-medium hover:border-gray-300 focus:outline-none cursor-pointer"
                            >
                                <option value="newest">Newest First</option>
                                <option value="price_asc">Price: Low to High</option>
                                <option value="price_desc">Price: High to Low</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                        </div>

                    </div>
                </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-6 md:gap-x-6 md:gap-y-10">
                {sortedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {/* Empty State */}
            {sortedProducts.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="bg-gray-50 p-6 rounded-full mb-4">
                        <Search size={32} className="text-gray-300" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">No matches found</h3>
                    <p className="text-gray-500 text-sm max-w-md mx-auto">
                        We couldn't find any products matching your filters. Try adjusting your search query or price range.
                    </p>
                    <button
                        onClick={() => { setSearchQuery(''); setBudgetFilter('all'); setCategoryFilter('all'); }}
                        className="mt-6 text-blue-600 font-medium hover:underline text-sm"
                    >
                        Clear all filters
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProductGrid;
