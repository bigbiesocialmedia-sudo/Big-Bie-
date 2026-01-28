import React, { useState, useEffect } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { Save, Megaphone, Image as ImageIcon, Link as LinkIcon, ToggleLeft, ToggleRight, Type, AlignLeft } from 'lucide-react';

const MarketingPage: React.FC = () => {
    const {
        marketingSettings,
        updateMarketingSettings,
        products,
        subCollections
    } = useAdmin();

    const [isEnabled, setIsEnabled] = useState(marketingSettings.isEnabled);
    const [bannerImage, setBannerImage] = useState(marketingSettings.bannerImage);
    const [heading, setHeading] = useState(marketingSettings.heading);
    const [description, setDescription] = useState(marketingSettings.description);
    const [buttonText, setButtonText] = useState(marketingSettings.buttonText);
    const [buttonLink, setButtonLink] = useState(marketingSettings.buttonLink);
    const [loading, setLoading] = useState(false);

    // Hierarchical Link Selection State
    const [linkMode, setLinkMode] = useState<'standard' | 'collections' | 'products'>('standard');
    const [selectedCollection, setSelectedCollection] = useState('');
    const [selectedSubCollection, setSelectedSubCollection] = useState('');
    const [selectedProduct, setSelectedProduct] = useState('');

    useEffect(() => {
        setIsEnabled(marketingSettings.isEnabled);
        setBannerImage(marketingSettings.bannerImage);
        setHeading(marketingSettings.heading);
        setDescription(marketingSettings.description);
        setButtonText(marketingSettings.buttonText);
        setButtonLink(marketingSettings.buttonLink);

        // Try to determine linkMode from existing link
        if (marketingSettings.buttonLink.startsWith('/products/')) {
            setLinkMode('products');
        } else if (marketingSettings.buttonLink.includes('?type=')) {
            setLinkMode('collections');
        } else {
            setLinkMode('standard');
        }
    }, [marketingSettings]);

    // Handle Link Generation
    useEffect(() => {
        if (linkMode === 'collections' && selectedCollection) {
            const slug = selectedCollection.toLowerCase();
            let link = `/collections/${slug}`;
            if (selectedSubCollection && selectedSubCollection !== 'all') {
                link += `?type=${encodeURIComponent(selectedSubCollection)}`;
            }
            setButtonLink(link);
        } else if (linkMode === 'products' && selectedProduct) {
            setButtonLink(`/products/${selectedProduct}`);
        }
    }, [linkMode, selectedCollection, selectedSubCollection, selectedProduct]);

    const handleSave = async () => {
        setLoading(true);
        try {
            await updateMarketingSettings({
                isEnabled,
                bannerImage,
                heading,
                description,
                buttonText,
                buttonLink
            });
            alert('Marketing settings saved successfully!');
        } catch (error: any) {
            console.error("Marketing Settings Error:", error);
            alert('Failed to save settings: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto pb-20">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Marketing Pop-up</h1>
                    <p className="text-gray-500 mt-1">Configure your official marketing announcement pop-up.</p>
                </div>
                <button
                    onClick={() => setIsEnabled(!isEnabled)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${isEnabled
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-500'
                        }`}
                >
                    {isEnabled ? <ToggleRight className="w-6 h-6" /> : <ToggleLeft className="w-6 h-6" />}
                    {isEnabled ? 'POP-UP ACTIVE' : 'POP-UP DISABLED'}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Editor */}
                <div className="space-y-6">
                    <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex items-center gap-2 mb-6">
                            <Megaphone className="text-[#F4C430]" />
                            <h2 className="text-xl font-semibold">Content Settings</h2>
                        </div>

                        <div className="space-y-5">
                            <div>
                                <label className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-2">
                                    <ImageIcon size={16} className="text-gray-400" />
                                    Banner Image URL
                                </label>
                                <input
                                    type="text"
                                    placeholder="https://images.unsplash.com/..."
                                    className="w-full border p-3 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#F4C430] transition-all"
                                    value={bannerImage}
                                    onChange={e => setBannerImage(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-2">
                                    <Type size={16} className="text-gray-400" />
                                    Heading
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g. End of Season Sale!"
                                    className="w-full border p-3 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#F4C430] transition-all"
                                    value={heading}
                                    onChange={e => setHeading(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-2">
                                    <AlignLeft size={16} className="text-gray-400" />
                                    Description
                                </label>
                                <textarea
                                    rows={3}
                                    placeholder="Tell your customers more about the offer..."
                                    className="w-full border p-3 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#F4C430] transition-all"
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                />
                            </div>
                        </div>
                    </section>

                    <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex items-center gap-2 mb-6">
                            <LinkIcon className="text-[#F4C430]" />
                            <h2 className="text-xl font-semibold">Call to Action</h2>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-800 mb-2">Button Text</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Shop Now"
                                    className="w-full border p-3 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#F4C430] transition-all"
                                    value={buttonText}
                                    onChange={e => setButtonText(e.target.value)}
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="block text-sm font-bold text-gray-800">Select Destination Page</label>

                                {/* Level 1: Main Destination */}
                                <select
                                    className="w-full border p-3 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#F4C430] transition-all"
                                    value={linkMode === 'standard' ? buttonLink : linkMode}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        if (val === 'collections' || val === 'products') {
                                            setLinkMode(val as any);
                                        } else {
                                            setLinkMode('standard');
                                            setButtonLink(val);
                                        }
                                    }}
                                >
                                    <optgroup label="General Pages">
                                        <option value="/">Home Page</option>
                                        <option value="/about/our-story">Our Story</option>
                                        <option value="/about/deals">Dealership</option>
                                        <option value="/about/careers">Careers</option>
                                        <option value="/about/contact-us">Contact Us</option>
                                    </optgroup>
                                    <optgroup label="Dynamic Content">
                                        <option value="collections">Collection Pages...</option>
                                        <option value="products">Specific Product...</option>
                                    </optgroup>
                                </select>

                                {/* Level 2: Collection Selection */}
                                {(linkMode === 'collections' || linkMode === 'products') && (
                                    <select
                                        className="w-full border p-3 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#F4C430] transition-all animate-in fade-in slide-in-from-top-2"
                                        value={selectedCollection}
                                        onChange={(e) => setSelectedCollection(e.target.value)}
                                    >
                                        <option value="">Select Collection</option>
                                        {Object.keys(subCollections).map(col => (
                                            <option key={col} value={col}>{col}</option>
                                        ))}
                                    </select>
                                )}

                                {/* Level 3: Sub-Collection Selection */}
                                {selectedCollection && (
                                    <select
                                        className="w-full border p-3 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#F4C430] transition-all animate-in fade-in slide-in-from-top-2"
                                        value={selectedSubCollection}
                                        onChange={(e) => setSelectedSubCollection(e.target.value)}
                                    >
                                        <option value="all">All in {selectedCollection}</option>
                                        {(subCollections[selectedCollection] || []).map(sub => (
                                            <option key={sub} value={sub}>{sub}</option>
                                        ))}
                                    </select>
                                )}

                                {/* Level 4: Product Selection */}
                                {linkMode === 'products' && selectedSubCollection && (
                                    <select
                                        className="w-full border p-3 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#F4C430] transition-all animate-in fade-in slide-in-from-top-2"
                                        value={selectedProduct}
                                        onChange={(e) => setSelectedProduct(e.target.value)}
                                    >
                                        <option value="">Select Product</option>
                                        {products
                                            .filter(p => p.category === selectedCollection && (selectedSubCollection === 'all' || p.subCollection === selectedSubCollection))
                                            .map(p => (
                                                <option key={p.id} value={p.slug}>{p.name}</option>
                                            ))
                                        }
                                    </select>
                                )}

                                <div className="p-3 bg-gray-100 rounded-lg border border-dashed border-gray-300">
                                    <p className="text-[10px] uppercase font-bold text-gray-400 mb-1">Generated URL:</p>
                                    <code className="text-xs text-blue-600 break-all">{buttonLink}</code>
                                </div>
                            </div>
                        </div>
                    </section>

                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className="w-full bg-black text-white font-bold text-lg py-4 rounded-2xl shadow-xl hover:bg-gray-800 transition-all active:scale-[0.98] flex justify-center items-center gap-2 disabled:opacity-75"
                    >
                        <Save size={24} />
                        {loading ? 'Saving...' : 'Save Marketing Settings'}
                    </button>
                </div>

                {/* Live Preview */}
                <div className="sticky top-8">
                    <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                        Live Preview
                    </h2>
                    <div className="bg-gray-100 p-8 rounded-3xl border-4 border-white shadow-inner flex items-center justify-center min-h-[500px]">
                        {/* Mock Pop-up */}
                        <div className="bg-white w-full max-w-[350px] rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 scale-100 opacity-100">
                            <div className="h-48 overflow-hidden relative">
                                <img
                                    src={bannerImage}
                                    alt="Banner"
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&q=80&w=1200';
                                    }}
                                />
                                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold leading-none">
                                    X
                                </div>
                            </div>
                            <div className="p-8 text-center">
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">{heading || 'Your Heading Here'}</h3>
                                <p className="text-gray-600 mb-8 leading-relaxed">{description || 'Your description text will appear here. Keep it professional and engaging.'}</p>
                                <button className="w-full bg-black text-white py-4 rounded-xl font-bold shadow-lg hover:shadow-[#F4C430]/20 transition-all">
                                    {buttonText || 'Button Text'}
                                </button>
                            </div>
                        </div>
                    </div>
                    <p className="text-center text-sm text-gray-400 mt-4 italic">This is how your pop-up will look to customers.</p>
                </div>
            </div>
        </div>
    );
};

export default MarketingPage;
