import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Building2, Globe, Truck, Users, Package, CheckCircle2, ArrowRight } from 'lucide-react';

const DealsPage: React.FC = () => {
    const { systemSettings } = useAdmin();
    // Prioritize officialNumber for Dealership inquiries, fallback to whatsappNumber
    const adminWhatsApp = systemSettings.officialNumber || systemSettings.whatsappNumber || '+916383548872';

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        businessLocation: '',
        dealershipType: 'Retail Dealership',
        volume: '',
        phone: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Construct WhatsApp Message
        const message = `
*New Dealership Inquiry*
Name: ${formData.name}
Phone: ${formData.phone}
Location: ${formData.businessLocation}
Type: ${formData.dealershipType}
Expected Volume: ${formData.volume}
        `.trim();

        const encodedMessage = encodeURIComponent(message);
        // Sanitize phone number: remove any non-digit characters (spaces, dashes, parens, +)
        const cleanPhone = adminWhatsApp.replace(/\D/g, '');
        const url = `https://wa.me/${cleanPhone}?text=${encodedMessage}`;

        window.open(url, '_blank');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <>
            <Header />
            <main className="min-h-screen bg-white pt-32">
                {/* Hero Section */}
                <div className="relative bg-black text-white py-20 lg:py-32 overflow-hidden">
                    <img
                        src="https://images.pexels.com/photos/33175650/pexels-photo-33175650.jpeg"
                        alt="Warehouse Distribution"
                        className="absolute inset-0 w-full h-full object-cover opacity-30"
                    />
                    <div className="container mx-auto px-6 relative z-10">
                        <span className="inline-block bg-[#F4C430] text-black font-bold text-xs px-3 py-1 mb-4 rounded-full uppercase tracking-wider">
                            Partner With Us
                        </span>
                        <h1 className="text-4xl lg:text-6xl font-black mb-6 leading-tight">
                            Dealership & <br />Distribution Opportunities
                        </h1>
                        <p className="text-xl text-gray-300 max-w-2xl font-light mb-8">
                            Become an authorized dealer or distributor with Big B Innerwears.
                            Partner with a fast-growing manufacturer supplying high-demand products across India and global markets.
                        </p>
                        <a href="#apply-form" className="bg-white text-black px-8 py-4 font-bold rounded-lg hover:bg-gray-100 transition-colors inline-flex items-center gap-2">
                            Apply for Dealership <ArrowRight size={20} />
                        </a>
                    </div>
                </div>

                {/* Why Partner Section */}
                <section className="py-20 bg-gray-50">
                    <div className="container mx-auto px-6 max-w-6xl">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Why Partner with Big B?</h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                Check the facts. We are built for volume, consistency, and dealer profitability.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                { icon: <Globe className="text-[#F4C430]" size={40} />, title: "Proven Market Demand", desc: "India’s innerwear market is growing at 14%+ CAGR. We supply high-frequency essentials like panties and slips." },
                                { icon: <Users className="text-[#F4C430]" size={40} />, title: "High Dealer Margins", desc: "Competitive wholesale pricing ensuring strong ROI for retailers and distributors." },
                                { icon: <Package className="text-[#F4C430]" size={40} />, title: "Consistent Supply", desc: "Reliable manufacturing base in Tamil Nadu ensures stock availability and timely dispatch." },
                            ].map((item, idx) => (
                                <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                    <div className="bg-black/5 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                                        {item.icon}
                                    </div>
                                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                                    <p className="text-gray-600 leading-relaxed text-sm">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Dealership Models */}
                <section className="py-20">
                    <div className="container mx-auto px-6 max-w-6xl">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl lg:text-4xl font-bold mb-6">Dealership Models</h2>
                                <p className="text-gray-600 mb-8">We offer flexible partnership models based on your business size and market reach.</p>

                                <div className="space-y-6">
                                    {[
                                        { title: "Retail Dealership", desc: "For garment shops, innerwear stores, and fashion outlets." },
                                        { title: "Wholesale Distribution", desc: "For bulk buyers supplying multiple retailers across districts." },
                                        { title: "Export Distribution", desc: "Bulk supply for GCC, Southeast Asia, Africa, and Europe." },
                                        { title: "OEM / Private Label", desc: "For brands looking to sell under their own label." }
                                    ].map((model, idx) => (
                                        <div key={idx} className="flex gap-4">
                                            <div className="mt-1"><CheckCircle2 className="text-green-600" size={24} /></div>
                                            <div>
                                                <h4 className="text-lg font-bold">{model.title}</h4>
                                                <p className="text-gray-500 text-sm">{model.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="relative h-[500px] bg-gray-100 rounded-3xl overflow-hidden">
                                <img
                                    src="https://images.pexels.com/photos/4487361/pexels-photo-4487361.jpeg"
                                    alt="Distribution Models"
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Product Categories */}
                <section className="py-20 bg-black text-white">
                    <div className="container mx-auto px-6 max-w-6xl">
                        <div className="mb-12">
                            <h2 className="text-3xl font-bold mb-4">Product Categories</h2>
                            <p className="text-gray-400">High-movement SKUs optimized for mass-market acceptance.</p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {['Ladies Slips', 'Cotton Panties', 'Camisoles', 'Non-Wired Bras'].map((cat, idx) => (
                                <div key={idx} className="border border-white/20 p-6 rounded-xl hover:bg-white/5 transition-colors">
                                    <h3 className="text-xl font-bold mb-2">{cat}</h3>
                                    <p className="text-xs text-gray-400">Ready Stock Available</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Application Form */}
                <section id="apply-form" className="py-24 bg-[#F4C430]">
                    <div className="container mx-auto px-6 max-w-4xl">
                        <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12">
                            <div className="text-center mb-10">
                                <h2 className="text-3xl font-bold mb-3">Apply for Dealership</h2>
                                <p className="text-gray-500">
                                    Submit your details below. Our team will review and contact you via WhatsApp/Phone.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black outline-none transition-all"
                                            placeholder="Enter your name"
                                            value={formData.name}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            required
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black outline-none transition-all"
                                            placeholder="WhatsApp Number"
                                            value={formData.phone}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Business Location</label>
                                    <input
                                        type="text"
                                        name="businessLocation"
                                        required
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black outline-none transition-all"
                                        placeholder="City, State"
                                        value={formData.businessLocation}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Dealership Type</label>
                                        <select
                                            name="dealershipType"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black outline-none transition-all"
                                            value={formData.dealershipType}
                                            onChange={handleChange}
                                        >
                                            <option>Retail Dealership</option>
                                            <option>Wholesale Distribution</option>
                                            <option>Export Partner</option>
                                            <option>OEM / Private Label</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Expected Monthly Volume</label>
                                        <select
                                            name="volume"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black outline-none transition-all"
                                            value={formData.volume}
                                            onChange={handleChange}
                                        >
                                            <option value="" disabled>Select Volume</option>
                                            <option>Small (Start-up)</option>
                                            <option>Medium (Existing Shop)</option>
                                            <option>Large (Distributor)</option>
                                            <option>Bulk (Export)</option>
                                        </select>
                                    </div>
                                </div>

                                <button type="submit" className="w-full bg-black text-white font-bold py-4 rounded-xl hover:bg-gray-800 transition-transform active:scale-95 text-lg flex justify-center items-center gap-2">
                                    <Building2 size={20} />
                                    Confirm
                                </button>
                            </form>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default DealsPage;
