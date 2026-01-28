import React, { useState, useEffect } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { Save, Megaphone, Image as ImageIcon, Link as LinkIcon, ToggleLeft, ToggleRight, Type, AlignLeft, Paintbrush, Zap, MoveRight, MoveLeft, X } from 'lucide-react';

const MarketingPage: React.FC = () => {
    // Marketing presets
    const PRESET_BG_COLORS = [
        { name: 'Classic Black', value: '#000000' },
        { name: 'Urgent Red', value: '#FF0000' },
        { name: 'Trust Blue', value: '#1976D2' },
        { name: 'Brand Yellow', value: '#F4C430' },
        { name: 'Premium Gray', value: '#333333' }
    ];

    const PRESET_TEXT_COLORS = [
        { name: 'White', value: '#FFFFFF' },
        { name: 'Black', value: '#000000' },
        { name: 'Light Gray', value: '#F5F5F5' }
    ];

    const {
        marketingSettings,
        updateMarketingSettings,
        announcementBarSettings,
        updateAnnouncementBarSettings,
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

    // Announcement Bar State
    const [barEnabled, setBarEnabled] = useState(announcementBarSettings.isEnabled);
    const [barText, setBarText] = useState(announcementBarSettings.text);
    const [barTextColor, setBarTextColor] = useState(announcementBarSettings.textColor);
    const [barBgColor, setBarBgColor] = useState(announcementBarSettings.backgroundColor);
    const [barSpeed, setBarSpeed] = useState(announcementBarSettings.speed);
    const [barDirection, setBarDirection] = useState(announcementBarSettings.direction);
    const [loadingBar, setLoadingBar] = useState(false);

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

    useEffect(() => {
        setBarEnabled(announcementBarSettings.isEnabled);
        setBarText(announcementBarSettings.text);
        setBarTextColor(announcementBarSettings.textColor);
        setBarBgColor(announcementBarSettings.backgroundColor);
        setBarSpeed(announcementBarSettings.speed);
        setBarDirection(announcementBarSettings.direction);
    }, [announcementBarSettings]);

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
            alert('Marketing pop-up settings saved successfully!');
        } catch (error: any) {
            console.error("Marketing Settings Error:", error);
            alert('Failed to save settings: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSaveBar = async () => {
        setLoadingBar(true);
        try {
            await updateAnnouncementBarSettings({
                isEnabled: barEnabled,
                text: barText,
                textColor: barTextColor,
                backgroundColor: barBgColor,
                speed: barSpeed,
                direction: barDirection
            });
            alert('Announcement Bar settings saved successfully!');
        } catch (error: any) {
            console.error("Announcement Bar Settings Error:", error);
            alert('Failed to save settings: ' + error.message);
        } finally {
            setLoadingBar(false);
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

            {/* Announcement Bar Section */}
            <div className="mt-16 pt-16 border-t border-gray-100">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">Global Announcement Bar</h1>
                        <p className="text-gray-500 mt-1">Configure scrolling text bar at the very top of your website.</p>
                    </div>
                    <button
                        onClick={() => setBarEnabled(!barEnabled)}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${barEnabled
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-gray-100 text-gray-500'
                            }`}
                    >
                        {barEnabled ? <ToggleRight className="w-6 h-6" /> : <ToggleLeft className="w-6 h-6" />}
                        {barEnabled ? 'ANNOUNCEMENT ACTIVE' : 'ANNOUNCEMENT DISABLED'}
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Editor */}
                    <div className="space-y-6">
                        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <div className="flex items-center gap-2 mb-6">
                                <Megaphone className="text-blue-500" />
                                <h2 className="text-xl font-semibold">Bar Content & Style</h2>
                            </div>

                            <div className="space-y-5">
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-2">
                                        <Type size={16} className="text-gray-400" />
                                        Announcement Text
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Free Shipping on all orders!"
                                        className="w-full border p-3 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all"
                                        value={barText}
                                        onChange={e => setBarText(e.target.value)}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-3">
                                            <Paintbrush size={16} className="text-gray-400" />
                                            Background Color
                                        </label>
                                        <div className="grid grid-cols-3 gap-3">
                                            {PRESET_BG_COLORS.map(color => (
                                                <button
                                                    key={color.value}
                                                    onClick={() => setBarBgColor(color.value)}
                                                    className={`group relative flex flex-col items-center gap-1.5 p-2 rounded-xl border-2 transition-all ${barBgColor === color.value ? 'border-blue-500 bg-blue-50 shadow-md scale-105' : 'border-gray-100 hover:border-blue-200'}`}
                                                >
                                                    <div className="w-10 h-10 rounded-lg shadow-inner flex items-center justify-center" style={{ backgroundColor: color.value }}>
                                                        {barBgColor === color.value && <div className={`w-3 h-3 rounded-full ${color.value === '#FFFFFF' ? 'bg-black' : 'bg-white'}`}></div>}
                                                    </div>
                                                    <span className="text-[10px] font-bold text-gray-600 group-hover:text-blue-600">{color.name}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-3">
                                            <Paintbrush size={16} className="text-gray-400" />
                                            Text Color
                                        </label>
                                        <div className="grid grid-cols-3 gap-3">
                                            {PRESET_TEXT_COLORS.map(color => (
                                                <button
                                                    key={color.value}
                                                    onClick={() => setBarTextColor(color.value)}
                                                    className={`group relative flex flex-col items-center gap-1.5 p-2 rounded-xl border-2 transition-all ${barTextColor === color.value ? 'border-blue-500 bg-blue-50 shadow-md scale-105' : 'border-gray-100 hover:border-blue-200'}`}
                                                >
                                                    <div className="w-10 h-10 rounded-lg shadow-inner border border-gray-100 flex items-center justify-center" style={{ backgroundColor: color.value }}>
                                                        {barTextColor === color.value && <div className={`w-3 h-3 rounded-full ${color.value === '#FFFFFF' ? 'bg-black' : 'bg-white'}`}></div>}
                                                    </div>
                                                    <span className="text-[10px] font-bold text-gray-600 group-hover:text-blue-600">{color.name}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-2">
                                            <Zap size={16} className="text-gray-400" />
                                            Scroll Speed
                                        </label>
                                        <select
                                            className="w-full border p-3 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all"
                                            value={barSpeed}
                                            onChange={e => setBarSpeed(e.target.value as any)}
                                        >
                                            <option value="slow">Slow</option>
                                            <option value="normal">Normal</option>
                                            <option value="fast">Fast</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-2">
                                            <AlignLeft size={16} className="text-gray-400" />
                                            Direction
                                        </label>
                                        <div className="flex bg-gray-100 p-1 rounded-xl">
                                            <button
                                                onClick={() => setBarDirection('rtl')}
                                                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg font-bold transition-all ${barDirection === 'rtl' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                                            >
                                                <MoveLeft size={18} /> RTL
                                            </button>
                                            <button
                                                onClick={() => setBarDirection('ltr')}
                                                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg font-bold transition-all ${barDirection === 'ltr' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                                            >
                                                LTR <MoveRight size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <button
                            onClick={handleSaveBar}
                            disabled={loadingBar}
                            className="w-full bg-blue-600 text-white font-bold text-lg py-4 rounded-2xl shadow-xl hover:bg-blue-700 transition-all active:scale-[0.98] flex justify-center items-center gap-2 disabled:opacity-75"
                        >
                            <Save size={24} />
                            {loadingBar ? 'Saving...' : 'Save Announcement Settings'}
                        </button>
                    </div>

                    {/* Preview */}
                    <div className="sticky top-8">
                        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                            Live Preview
                        </h2>
                        <div className="bg-gray-100 p-8 rounded-3xl border-4 border-white shadow-inner flex flex-col gap-8 min-h-[500px]">
                            {/* Mock Site Header Area */}
                            <div className="w-full bg-white rounded-xl shadow-lg pb-12 overflow-hidden">
                                {barEnabled && (
                                    <div
                                        className="py-2 overflow-hidden flex items-center px-4"
                                        style={{ backgroundColor: barBgColor, color: barTextColor }}
                                    >
                                        <div className="flex-1 whitespace-nowrap text-xs font-bold font-mono">
                                            {barText || 'Scrolling text preview...'}
                                        </div>
                                    </div>
                                )}
                                <div className="p-4 border-b flex justify-between items-center">
                                    <div className="w-24 h-6 bg-gray-200 rounded"></div>
                                    <div className="flex gap-4">
                                        <div className="w-8 h-4 bg-gray-100 rounded"></div>
                                        <div className="w-8 h-4 bg-gray-100 rounded"></div>
                                        <div className="w-8 h-4 bg-gray-100 rounded"></div>
                                    </div>
                                </div>
                                <div className="p-8 space-y-4">
                                    <div className="w-3/4 h-8 bg-gray-50 rounded"></div>
                                    <div className="w-full h-32 bg-gray-50 rounded"></div>
                                </div>
                            </div>
                            <p className="text-center text-sm text-gray-400 italic">This is how the bar appears above your header.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarketingPage;
