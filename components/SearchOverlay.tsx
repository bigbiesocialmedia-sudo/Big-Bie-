import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';
import { Product } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Product[]>([]);
    const { products } = useAdmin();
    const navigate = useNavigate();
    const inputRef = useRef<HTMLInputElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            setTimeout(() => inputRef.current?.focus(), 100);
        } else {
            document.body.style.overflow = 'auto';
            setQuery('');
        }
    }, [isOpen]);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen, onClose]);

    // Robust Image Gathering logic
    const getProductImage = (product: Product) => {
        let images: string[] = [];

        if (product.variantCombinations && product.variantCombinations.length > 0) {
            const variantImages = product.variantCombinations.flatMap(v => v.images || []);
            if (variantImages.length > 0) images = [...images, ...variantImages];
        }

        if (images.length === 0 && product.imageGroups && product.imageGroups.length > 0) {
            const groupImages = product.imageGroups.flatMap(g => g.images || []);
            if (groupImages.length > 0) images = [...images, ...groupImages];
        }

        if (images.length === 0 && product.images && product.images.length > 0) {
            images = product.images;
        }

        const uniqueImages = Array.from(new Set(images));
        return uniqueImages[0] || 'https://images.unsplash.com/photo-1620799140408-ed5341cd2431?auto=format&fit=crop&q=80&w=800';
    };

    useEffect(() => {
        if (query.trim().length === 0) {
            setResults([]);
            return;
        }

        const lowercaseQuery = query.toLowerCase();

        // Comprehensive Filtering: Name, Category, or Sub-collection
        const filtered = products.filter(p => {
            const nameMatch = p.name.toLowerCase().includes(lowercaseQuery);
            const categoryMatch = p.category.toLowerCase().includes(lowercaseQuery);
            const subMatch = p.subCollection?.toLowerCase().includes(lowercaseQuery);
            return nameMatch || categoryMatch || subMatch;
        });

        // Smart Re-ordering: Prioritize startsWith Name, then Category/SubMatch
        const startsWithName = filtered.filter(p => p.name.toLowerCase().startsWith(lowercaseQuery));
        const others = filtered.filter(p => !p.name.toLowerCase().startsWith(lowercaseQuery));

        setResults([...startsWithName, ...others].slice(0, 6));
    }, [query, products]);

    const handleResultClick = (product: Product) => {
        navigate(`/products/${product.slug}`);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-4 sm:pt-32">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
                    />

                    {/* Compact Modal */}
                    <motion.div
                        ref={modalRef}
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        className="relative w-full max-w-lg bg-white rounded-[32px] shadow-2xl overflow-hidden border border-gray-100"
                    >
                        <div className="p-4 border-b border-gray-50 flex items-center gap-2">
                            <div className="flex-grow flex items-center bg-gray-50 rounded-2xl px-4 py-2">
                                <Search className="text-gray-400 mr-2" size={18} />
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Search BIG BIE..."
                                    className="flex-grow bg-transparent border-none py-1.5 text-base focus:ring-0 outline-none placeholder:text-gray-400 font-medium text-gray-900"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Escape') onClose();
                                        if (e.key === 'Enter' && results.length > 0) handleResultClick(results[0]);
                                    }}
                                />
                                {query && (
                                    <button onClick={() => setQuery('')} className="p-1 hover:bg-gray-200 rounded-full">
                                        <X size={14} className="text-gray-400" />
                                    </button>
                                )}
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                            {query.trim().length > 0 ? (
                                <div className="p-2">
                                    {results.length > 0 ? (
                                        <>
                                            <p className="px-4 py-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Smart Suggestions</p>
                                            {results.map((product) => (
                                                <button
                                                    key={product.id}
                                                    onClick={() => handleResultClick(product)}
                                                    className="w-full flex items-center gap-4 p-3 hover:bg-[#F4C430]/10 rounded-2xl transition-all group text-left"
                                                >
                                                    <div className="w-14 h-14 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                                                        <img
                                                            src={getProductImage(product)}
                                                            alt={product.name}
                                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                        />
                                                    </div>
                                                    <div className="flex-grow min-w-0">
                                                        <h4 className="text-sm font-bold text-gray-900 truncate leading-tight">{product.name}</h4>
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-[10px] font-semibold text-gray-400">{product.category}</span>
                                                            <span className="text-xs font-black text-gray-900">₹{product.price}</span>
                                                        </div>
                                                    </div>
                                                    <ChevronRight size={16} className="text-gray-300 group-hover:text-[#F4C430] group-hover:translate-x-1 transition-all" />
                                                </button>
                                            ))}
                                        </>
                                    ) : (
                                        <div className="py-12 text-center text-gray-400">
                                            <p className="text-sm font-medium">No results found for "{query}"</p>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="p-6">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Quick search Collections</p>
                                    <div className="flex flex-wrap gap-2">
                                        {['Bras', 'Panties', 'Slips', 'Kids'].map(cat => (
                                            <button
                                                key={cat}
                                                onClick={() => setQuery(cat)}
                                                className="px-4 py-2 rounded-xl bg-gray-50 text-xs font-bold text-gray-600 hover:bg-[#F4C430] hover:text-white transition-all shadow-sm border border-gray-100"
                                            >
                                                {cat}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default SearchOverlay;
