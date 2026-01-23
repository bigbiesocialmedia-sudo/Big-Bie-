import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { Save, Plus, Trash2, Image as ImageIcon, Star, Search, Check } from 'lucide-react';

const HomeSettings: React.FC = () => {
    const { homeSettings, updateHomeSettings, products } = useAdmin();
    const [bannerImages, setBannerImages] = useState<string[]>(homeSettings.bannerImages);
    const [featuredProductIds, setFeaturedProductIds] = useState<string[]>(homeSettings.featuredProductIds);
    const [productSearch, setProductSearch] = useState('');

    const handleSave = () => {
        updateHomeSettings({
            bannerImages: bannerImages.filter(img => img.trim() !== ''),
            featuredProductIds
        });
        alert('Home settings saved successfully!');
    };

    // Banner Image Handlers
    const handleAddImage = () => setBannerImages([...bannerImages, '']);
    const handleImageChange = (index: number, value: string) => {
        const newImages = [...bannerImages];
        newImages[index] = value;
        setBannerImages(newImages);
    };
    const handleRemoveImage = (index: number) => {
        setBannerImages(bannerImages.filter((_, i) => i !== index));
    };

    // Featured Product Handlers
    const handleSelectProduct = (productId: string) => {
        if (featuredProductIds.includes(productId)) return;
        if (featuredProductIds.length >= 4) {
            alert('You can only select up to 4 featured products.');
            return;
        }
        setFeaturedProductIds([...featuredProductIds, productId]);
    };

    const handleRemoveProduct = (productId: string) => {
        setFeaturedProductIds(featuredProductIds.filter(id => id !== productId));
    };

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
        p.id.toLowerCase().includes(productSearch.toLowerCase())
    );

    return (
        <div className="max-w-4xl mx-auto pb-20">
            <h1 className="text-3xl font-bold mb-8">Home Customization</h1>

            <div className="space-y-8">
                {/* Home Screen Banner */}
                <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-2 mb-4">
                        <ImageIcon className="text-[#F4C430]" />
                        <h2 className="text-xl font-semibold">Home Screen Banner</h2>
                    </div>
                    <p className="text-sm text-gray-500 mb-4">
                        Manage the sliding banner images. These will loop automatically on the home screen.
                    </p>

                    <div className="space-y-4">
                        {bannerImages.map((img, index) => (
                            <div key={index} className="flex gap-2">
                                <input
                                    className="flex-1 border p-2 rounded"
                                    placeholder="Banner Image URL..."
                                    value={img}
                                    onChange={e => handleImageChange(index, e.target.value)}
                                />
                                {img && (
                                    <div className="w-10 h-10 bg-gray-100 rounded overflow-hidden">
                                        <img src={img} alt="preview" className="w-full h-full object-cover" />
                                    </div>
                                )}
                                <button
                                    onClick={() => handleRemoveImage(index)}
                                    className="p-2 text-red-500 hover:bg-red-50 rounded"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        ))}
                        <button
                            onClick={handleAddImage}
                            className="text-sm font-medium text-[#F4C430] hover:text-[#d4a010] flex items-center gap-1"
                        >
                            <Plus size={16} /> Add Banner Image
                        </button>
                    </div>
                </section>

                {/* Featured Products */}
                <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-2 mb-4">
                        <Star className="text-[#F4C430]" />
                        <h2 className="text-xl font-semibold">Featured Products</h2>
                    </div>
                    <p className="text-sm text-gray-500 mb-6">
                        Select products to display in the "Featured Collection" section. Maximum 4 products.
                    </p>

                    {/* Selected Products */}
                    <div className="mb-6">
                        <h3 className="text-sm font-medium mb-3">Selected Products ({featuredProductIds.length}/4)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {featuredProductIds.map(id => {
                                const product = products.find(p => p.id === id);
                                if (!product) return null;
                                return (
                                    <div key={id} className="flex items-center justify-between p-3 border border-[#F4C430] bg-[#FFFBE6] rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                                                <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-sm">{product.name}</p>
                                                <p className="text-xs text-gray-500">Rs. {product.price}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleRemoveProduct(id)}
                                            className="text-red-500 p-1 hover:bg-red-50 rounded"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                );
                            })}
                            {featuredProductIds.length === 0 && (
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
                                                <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
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
                                                disabled={featuredProductIds.length >= 4}
                                                className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${featuredProductIds.length >= 4
                                                        ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                                                        : 'bg-white text-black border-black hover:bg-black hover:text-white'
                                                    }`}
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
