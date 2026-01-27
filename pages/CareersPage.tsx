import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Briefcase, ArrowRight, MapPin, Clock, CheckCircle2, TrendingUp, Users, Building2 } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

const CareersPage: React.FC = () => {
    const { systemSettings } = useAdmin();
    // Prioritize officialNumber for Careers inquiries, fallback to whatsappNumber
    const officialPhone = systemSettings?.officialNumber || systemSettings?.whatsappNumber || '+916383548872';

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const jobs = [
        {
            title: "Sales & Distribution Executive",
            location: "Bangalore / Field-based",
            exp: "1–3 years preferred",
            responsibilities: [
                "Handle dealers, distributors, and wholesale buyers",
                "Manage repeat orders and follow-ups",
                "Expand presence in Tier 2 & Tier 3 cities"
            ],
            skills: ["Communication skills", "Basic understanding of garments or wholesale trade", "Willingness to travel"]
        },
        {
            title: "Export & Operations Coordinator",
            location: "Bangalore",
            exp: "1–3 years",
            responsibilities: [
                "Assist with export documentation",
                "Coordinate logistics and shipment schedules",
                "Communicate with international buyers"
            ],
            skills: ["Basic export/import knowledge", "Documentation and coordination skills", "Attention to detail"]
        },
        {
            title: "Warehouse & Inventory Executive",
            location: "Bangalore",
            exp: "Fresher / Experienced",
            responsibilities: [
                "Stock management",
                "Packing & dispatch coordination",
                "Inventory tracking"
            ],
            skills: ["Basic inventory handling", "Discipline and accuracy"]
        },
        {
            title: "Production & Quality Supervisor",
            location: "Tamil Nadu (Manufacturing Units)",
            exp: "2+ years preferred",
            responsibilities: [
                "Monitor production quality",
                "Coordinate with stitching units",
                "Ensure fabric and finishing standards"
            ],
            skills: ["Garment manufacturing knowledge", "Quality control experience"]
        },
        {
            title: "Accounts & Admin Executive",
            location: "Bangalore",
            exp: "1–2 years",
            responsibilities: [
                "Billing & invoicing",
                "Dealer account coordination",
                "Basic compliance support"
            ],
            skills: ["Tally / basic accounting knowledge", "Office administration skills"]
        }
    ];

    return (
        <>
            <Header />
            <main className="min-h-screen bg-white pt-32">
                {/* Hero Section */}
                <div className="bg-black text-white py-20">
                    <div className="container mx-auto px-6 max-w-4xl text-center">
                        <span className="inline-block bg-[#F4C430] text-black font-bold text-xs px-3 py-1 mb-4 rounded-full uppercase tracking-wider">
                            We are Hiring
                        </span>
                        <h1 className="text-4xl lg:text-6xl font-black mb-6">Careers at Big B Innerwears</h1>
                        <p className="text-xl font-bold mb-4">
                            Build a Stable Career in Women’s Innerwear Manufacturing, Wholesale & Exports
                        </p>
                        <p className="text-lg text-gray-400 font-light max-w-3xl mx-auto">
                            At Big B Innerwears, we are building a dependable, growth-driven business in women’s innerwear manufacturing, wholesale distribution, and exports. We believe in steady work, long-term growth, and honest business, not hype.
                        </p>
                        <p className="mt-4 text-gray-300 italic">
                            If you’re looking for a stable career in the textile, garment, wholesale, or export industry—this is the right place.
                        </p>
                    </div>
                </div>

                {/* Why Work With Us */}
                <section className="py-20 bg-gray-50">
                    <div className="container mx-auto px-6 max-w-6xl">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl font-bold mb-6">Why Work With Big B Innerwears?</h2>
                                <p className="text-gray-600 mb-6">
                                    We operate in an essential products industry. Women’s innerwear is not seasonal, not trend-dependent, and not optional—meaning consistent demand and long-term job security.
                                </p>
                                <h3 className="text-xl font-bold mb-4">What We Offer</h3>
                                <div className="space-y-4">
                                    {[
                                        "Stable employment in a growing company",
                                        "Exposure to wholesale, retail, and export markets",
                                        "Practical, hands-on work experience",
                                        "Growth based on performance, not politics",
                                        "Direct access to decision-makers (no corporate nonsense)"
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex gap-3">
                                            <CheckCircle2 className="text-green-600 flex-shrink-0" size={20} />
                                            <span className="text-gray-700">{item}</span>
                                        </div>
                                    ))}
                                </div>
                                <p className="mt-6 font-medium text-[#F4C430]">
                                    We value discipline, responsibility, and consistency over fancy resumes.
                                </p>
                            </div>
                            <div className="h-[400px] bg-gray-200 rounded-3xl overflow-hidden relative shadow-lg">
                                <img
                                    src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1200"
                                    alt="Teamwork at Big B Innerwears"
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/20"></div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Current Job Openings */}
                <section className="py-20">
                    <div className="container mx-auto px-6 max-w-6xl">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold mb-4">Current Job Openings</h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                We regularly hire for the following roles as part of our expansion in India and international markets.
                            </p>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-8">
                            {jobs.map((job, idx) => (
                                <div key={idx} className="bg-white border border-gray-200 p-8 rounded-2xl hover:border-[#F4C430] hover:shadow-lg transition-all group">
                                    <h3 className="text-2xl font-bold mb-2 group-hover:text-[#F4C430] transition-colors">{job.title}</h3>

                                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-6">
                                        <span className="flex items-center gap-1 bg-gray-50 px-3 py-1 rounded-full"><MapPin size={14} /> {job.location}</span>
                                        <span className="flex items-center gap-1 bg-gray-50 px-3 py-1 rounded-full"><Clock size={14} /> {job.exp}</span>
                                    </div>

                                    <div className="mb-4">
                                        <h4 className="font-semibold text-gray-900 mb-2">Responsibilities:</h4>
                                        <ul className="list-disc list-inside space-y-1 text-gray-600 text-sm">
                                            {job.responsibilities.map((resp, i) => (
                                                <li key={i}>{resp}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-2">Skills Required:</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {job.skills.map((skill, si) => (
                                                <span key={si} className="bg-gray-100 text-gray-700 text-xs font-medium px-2 py-1 rounded">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mt-8 pt-6 border-t border-gray-100">
                                        <a href="#apply-section" className="text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all">
                                            Apply for this role <ArrowRight size={16} className="text-[#F4C430]" />
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Who Should Apply & Growth */}
                <section className="py-20 bg-black text-white">
                    <div className="container mx-auto px-6 max-w-6xl">
                        <div className="grid md:grid-cols-2 gap-16">
                            {/* Who Should Apply */}
                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <Users className="text-[#F4C430]" size={32} />
                                    <h2 className="text-3xl font-bold">Who Should Apply?</h2>
                                </div>
                                <p className="text-gray-400 mb-6 text-lg">
                                    This is not a startup playground. You’ll do well here if you:
                                </p>
                                <ul className="space-y-4">
                                    {[
                                        "Want long-term stability",
                                        "Are comfortable with routine and responsibility",
                                        "Respect deadlines and systems",
                                        "Want to grow with a company, not jump every 6 months"
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex gap-3">
                                            <div className="w-1.5 h-1.5 bg-[#F4C430] rounded-full mt-2.5 flex-shrink-0"></div>
                                            <span className="text-gray-300">{item}</span>
                                        </div>
                                    ))}
                                </ul>
                                <p className="mt-6 text-white font-medium">Freshers with the right attitude are welcome.</p>
                            </div>

                            {/* Career Growth */}
                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <TrendingUp className="text-[#F4C430]" size={32} />
                                    <h2 className="text-3xl font-bold">Career Growth</h2>
                                </div>
                                <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800">
                                    <div className="mb-6">
                                        <h3 className="text-xl font-bold mb-3 text-gray-200">As we expand into:</h3>
                                        <ul className="grid grid-cols-1 gap-2 text-gray-400">
                                            <li>• Pan-India distribution</li>
                                            <li>• Export markets (GCC, Southeast Asia, Africa, Europe)</li>
                                            <li>• Private label & OEM manufacturing</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-3 text-gray-200">Employees grow into:</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {[
                                                "Regional Sales Managers",
                                                "Export Operations Leads",
                                                "Production Heads",
                                                "Warehouse & Logistics Managers"
                                            ].map((role, idx) => (
                                                <span key={idx} className="bg-gray-800 border border-gray-700 text-gray-300 px-3 py-1 rounded text-sm">
                                                    {role}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="mt-6 py-4 border-t border-gray-800 text-center">
                                        <span className="text-[#F4C430] font-bold uppercase tracking-widest text-sm">Growth is earned, not promised.</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* How to Apply */}
                <section id="apply-section" className="py-20 bg-white border-t border-gray-100">
                    <div className="container mx-auto px-6 max-w-5xl">
                        <div className="flex flex-col md:flex-row gap-12 items-start justify-between">
                            {/* Left Side: Call to Action */}
                            <div className="md:w-1/2">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="bg-black text-white p-3 rounded-xl">
                                        <Briefcase size={24} />
                                    </div>
                                    <h2 className="text-3xl font-bold text-gray-900">Ready to Apply?</h2>
                                </div>
                                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                                    Join a business that builds, not burns out. If you're ready for stability and growth, we want to hear from you.
                                </p>

                                <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
                                    <h4 className="font-bold mb-4 flex items-center gap-2 text-gray-900">
                                        <CheckCircle2 size={18} className="text-black" />
                                        Please include in your application:
                                    </h4>
                                    <ul className="text-sm text-gray-600 space-y-3">
                                        <li className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div> Updated resume
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div> Preferred role
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div> Current location
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div> Expected salary
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Right Side: Contact Methods */}
                            <div className="md:w-1/2 w-full">
                                <div className="grid gap-4">
                                    <a href="mailto:bigbinnerwears@gmail.com" className="group bg-white p-6 rounded-2xl border border-gray-200 hover:border-black transition-all shadow-sm hover:shadow-md flex items-center justify-between">
                                        <div>
                                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email your details</span>
                                            <div className="text-xl font-bold mt-1 text-gray-900 group-hover:text-[#F4C430] transition-colors">bigbinnerwears@gmail.com</div>
                                        </div>
                                        <ArrowRight className="text-gray-300 group-hover:text-black transition-colors" />
                                    </a>

                                    <a href={`tel:${officialPhone.replace(/\D/g, '')}`} className="group bg-white p-6 rounded-2xl border border-gray-200 hover:border-black transition-all shadow-sm hover:shadow-md flex items-center justify-between">
                                        <div>
                                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">WhatsApp / Call</span>
                                            <div className="text-xl font-bold mt-1 text-gray-900 group-hover:text-[#F4C430] transition-colors">{officialPhone}</div>
                                        </div>
                                        <ArrowRight className="text-gray-300 group-hover:text-black transition-colors" />
                                    </a>
                                </div>

                                <div className="mt-8 text-center md:text-left pl-2">
                                    <p className="text-sm text-gray-400">
                                        Shortlisted candidates will be contacted directly.
                                    </p>
                                    <div className="flex items-center gap-2 mt-2 text-sm font-medium text-gray-900">
                                        <Building2 size={16} className="text-gray-400" />
                                        Big B Innerwears, Bangalore
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default CareersPage;
