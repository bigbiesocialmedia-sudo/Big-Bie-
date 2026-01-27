import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { Save, Plus, Trash2, Star, Search, Check } from 'lucide-react';

const HomeSettings: React.FC = () => {
    const { homeSettings, updateHomeSettings, products } = useAdmin();
    const [featuredProductIds, setFeaturedProductIds] = useState<string[]>(homeSettings.featuredProductIds);
    const [productSearch, setProductSearch] = useState('');

    // Add Image State
    const [isAddingImage, setIsAddingImage] = useState(false);
    const [newImageUrl, setNewImageUrl] = useState('');

    const handleSave = () => {
        updateHomeSettings({
            bannerImages: homeSettings.bannerImages,
            featuredProductIds,
            heroImages: homeSettings.heroImages
        });
        alert('Home settings saved successfully!');
    };

    const handleAddImage = () => {
        if (!newImageUrl.trim()) return;
        const currentImages = homeSettings.heroImages || [];
        updateHomeSettings({
            ...homeSettings,
            heroImages: [...currentImages, newImageUrl.trim()]
        });
        setNewImageUrl('');
        setIsAddingImage(false);
    };

    // ... (rest of the file until the Hero Section Images part)

    // Featured Product Handlers
    const handleSelectProduct = (productId: string) => {
        if (featuredProductIds.includes(productId)) return;
        setFeaturedProductIds([...featuredProductIds, productId]);
    };

    const handleRemoveProduct = (productId: string) => {
        setFeaturedProductIds(featuredProductIds.filter(id => id !== productId));
    };

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
        p.id.toLowerCase().includes(productSearch.toLowerCase())
    );

    // Filter out ghost products (IDs that no longer exist)
    const validFeaturedProducts = featuredProductIds
        .map(id => products.find(p => p.id === id))
        .filter(p => p !== undefined) as any[];

    // Effect to clean up invalid IDs if products change
    React.useEffect(() => {
        const validIds = featuredProductIds.filter(id => products.some(p => p.id === id));
        if (validIds.length !== featuredProductIds.length) {
            setFeaturedProductIds(validIds);
        }
    }, [products, featuredProductIds]);

    // ... (GetProductImage helper)

    const getProductImage = (product: any) => {
        // 1. Global Image
        if (product.images && product.images.length > 0) return product.images[0];
        // 2. Fallback: Legacy Variants
        if (product.variants && product.variants.length > 0 && product.variants[0].images?.[0]) {
            return product.variants[0].images[0];
        }
        // 3. Fallback: New Variant Combinations
        if (product.variantCombinations && product.variantCombinations.length > 0 && product.variantCombinations[0].images?.[0]) {
            return product.variantCombinations[0].images[0];
        }
        // 4. Default
        return 'https://placehold.co/100?text=No+Image';
    };

    return (
        <div className="max-w-4xl mx-auto pb-20 relative">
            {/* Custom Image Input Modal */}
            {isAddingImage && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl">
                        <h3 className="text-xl font-bold mb-4">Add New Image</h3>
                        <input
                            type="text"
                            placeholder="Enter image URL (e.g., https://...)"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                            value={newImageUrl}
                            onChange={(e) => setNewImageUrl(e.target.value)}
                            autoFocus
                        />
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setIsAddingImage(false)}
                                className="px-5 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddImage}
                                className="px-5 py-2 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
                            >
                                Add Image
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <h1 className="text-3xl font-bold mb-8">Home Customization</h1>

            <div className="space-y-8">


                {/* Hero Slider Images */}
                <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-2 mb-4">
                        <Star className="text-[#F4C430]" />
                        <h2 className="text-xl font-semibold">Hero Section Images</h2>
                    </div>
                    <p className="text-sm text-gray-500 mb-6">
                        Manage the auto-sliding images in the Hero section (Max 5 images).
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                        {homeSettings.heroImages?.map((img, idx) => (
                            <div key={idx} className="relative group aspect-[4/5] rounded-lg overflow-hidden border border-gray-200">
                                <img src={img} alt={`Hero ${idx}`} className="w-full h-full object-cover" />
                                <button
                                    onClick={() => {
                                        const newImages = homeSettings.heroImages?.filter((_, i) => i !== idx) || [];
                                        updateHomeSettings({ ...homeSettings, heroImages: newImages });
                                    }}
                                    className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        ))}
                        {(homeSettings.heroImages?.length || 0) < 5 && (
                            <div className="aspect-[4/5] rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 hover:border-[#F4C430] hover:text-[#F4C430] transition-colors bg-gray-50 cursor-pointer"
                                onClick={() => {
                                    setNewImageUrl('');
                                    setIsAddingImage(true);
                                }}
                            >
                                <div className="flex flex-col items-center gap-2">
                                    <Plus size={24} />
                                    <span className="text-xs font-medium">Add Image</span>
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                {/* Featured Products */}
                <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-2 mb-4">
                        <Star className="text-[#F4C430]" />
                        <h2 className="text-xl font-semibold">Featured Products</h2>
                    </div>
                    <p className="text-sm text-gray-500 mb-6">
                        Select products to display in the "Featured Collection" section.
                    </p>

                    {/* Selected Products */}
                    <div className="mb-6">
                        <h3 className="text-sm font-medium mb-3">Selected Products ({validFeaturedProducts.length})</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {validFeaturedProducts.map(product => (
                                <div key={product.id} className="flex items-center justify-between p-3 border border-[#F4C430] bg-[#FFFBE6] rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                                            <img
                                                src={getProductImage(product)}
                                                alt={product.name}
                                                className="w-full h-full object-cover"
                                                onError={(e) => (e.target as HTMLImageElement).src = 'https://placehold.co/100?text=Error'}
                                            />
                                        </div>
                                        <div>
                                            <p className="font-medium text-sm">{product.name}</p>
                                            <p className="text-xs text-gray-500">Rs. {product.price}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleRemoveProduct(product.id)}
                                        className="text-red-500 p-1 hover:bg-red-50 rounded"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))}
                            {validFeaturedProducts.length === 0 && (
                                <p className="text-gray-400 text-sm italic col-span-2">No products selected.</p>
                            )}
                        </div>
                    </div>

                    {/* Product Search & Selection */}
                    <div className="border-t pt-6">
                        <h3 className="text-sm font-medium mb-3">Add Products</h3>
                        <div className="relative mb-4">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="w-full pl-10 pr-4 py-2 border rounded-lg"
                                value={productSearch}
                                onChange={e => setProductSearch(e.target.value)}
                            />
                        </div>

                        <div className="max-h-[300px] overflow-y-auto border rounded-lg divide-y">
                            {filteredProducts.map(product => {
                                const isSelected = featuredProductIds.includes(product.id);
                                return (
                                    <div key={product.id} className="flex items-center justify-between p-3 hover:bg-gray-50">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                                                <img
                                                    src={getProductImage(product)}
                                                    alt={product.name}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => (e.target as HTMLImageElement).src = 'https://placehold.co/100?text=Error'}
                                                />
                                            </div>
                                            <div>
                                                <p className="font-medium text-sm">{product.name}</p>
                                                <p className="text-xs text-gray-500">{product.category}</p>
                                            </div>
                                        </div>
                                        {isSelected ? (
                                            <span className="text-green-600 flex items-center text-xs font-medium gap-1">
                                                <Check size={14} /> Added
                                            </span>
                                        ) : (
                                            <button
                                                onClick={() => handleSelectProduct(product.id)}
                                                className="text-xs px-3 py-1.5 rounded-full border transition-colors bg-white text-black border-black hover:bg-black hover:text-white"
                                            >
                                                Add
                                            </button>
                                        )}
                                    </div>
                                );
                            })}
                            {filteredProducts.length === 0 && (
                                <div className="p-4 text-center text-gray-500 text-sm">No products found</div>
                            )}
                        </div>
                    </div>
                </section>

                <div className="sticky bottom-4">
                    <button
                        onClick={handleSave}
                        className="w-full bg-black text-white font-bold text-lg py-4 rounded-xl shadow-lg hover:bg-gray-800 transition-transform active:scale-95 flex justify-center items-center gap-2"
                    >
                        <Save size={24} />
                        Save Settings
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HomeSettings;
