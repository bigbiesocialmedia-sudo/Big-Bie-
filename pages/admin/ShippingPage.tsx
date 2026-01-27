import React, { useState, useEffect } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { ShippingRule } from '../../types';
import { Save, Plus, Trash2, Truck, ArrowRight } from 'lucide-react';

const ShippingPage: React.FC = () => {
    const { shippingRules, updateShippingRules } = useAdmin();
    const [rules, setRules] = useState<ShippingRule[]>([]);

    useEffect(() => {
        setRules(shippingRules);
    }, [shippingRules]);

    const handleAddRule = () => {
        const newRule: ShippingRule = {
            id: `ship-${Date.now()}`,
            minQuantity: 1,
            maxQuantity: 5,
            amount: 0
        };
        setRules([...rules, newRule]);
    };

    const handleRemoveRule = (id: string) => {
        setRules(rules.filter(r => r.id !== id));
    };

    const handleRuleChange = (index: number, field: keyof ShippingRule, value: string) => {
        const newRules = [...rules];
        const numValue = parseInt(value) || 0;
        newRules[index] = { ...newRules[index], [field]: numValue };
        setRules(newRules);
    };

    const handleSave = async () => {
        // Sort rules by minQuantity before saving
        const sortedRules = [...rules].sort((a, b) => a.minQuantity - b.minQuantity);
        await updateShippingRules(sortedRules);
        alert('Shipping rules saved successfully!');
    };

    return (
        <div className="max-w-5xl mx-auto pb-20">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-2">
                        <Truck className="text-[#F4C430]" /> Shipping Settings
                    </h1>
                    <p className="text-gray-500 mt-1">Manage shipping costs based on quantity ranges.</p>
                </div>
                <button
                    onClick={handleSave}
                    className="bg-[#F4C430] text-black font-bold px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-[#E5B520] transition-colors shadow-md"
                >
                    <Save size={20} /> Save Changes
                </button>
            </div>

            <section className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                    <h2 className="font-semibold text-lg text-gray-800">Quantity-Based Shipping Ranges</h2>
                    <p className="text-sm text-gray-500">Define price tiers by setting a minimum and maximum product count.</p>
                </div>

                <div className="p-6">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-xs font-bold text-gray-400 uppercase tracking-wider border-b">
                                <th className="pb-4 pr-4">Min. Quantity</th>
                                <th className="pb-4 w-8"></th>
                                <th className="pb-4 px-4">Max. Quantity</th>
                                <th className="pb-4 px-4">Shipping Amount (Rs.)</th>
                                <th className="pb-4 w-16 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {rules.map((rule, index) => (
                                <tr key={rule.id} className="group hover:bg-gray-50/50">
                                    <td className="py-5 pr-4">
                                        <div className="flex items-center bg-gray-50 rounded-lg pr-3">
                                            <input
                                                type="number"
                                                className="w-full bg-transparent border-none rounded-lg px-3 py-2.5 outline-none focus:ring-0 text-gray-900 font-medium"
                                                value={rule.minQuantity}
                                                onChange={(e) => handleRuleChange(index, 'minQuantity', e.target.value)}
                                                placeholder="1"
                                                min="0"
                                            />
                                            <span className="text-xs text-gray-400 font-bold uppercase">Min</span>
                                        </div>
                                    </td>
                                    <td className="py-5 text-center text-gray-300">
                                        <ArrowRight size={16} />
                                    </td>
                                    <td className="py-5 px-4">
                                        <div className="flex items-center bg-gray-50 rounded-lg pr-3">
                                            <input
                                                type="number"
                                                className="w-full bg-transparent border-none rounded-lg px-3 py-2.5 outline-none focus:ring-0 text-gray-900 font-medium"
                                                value={rule.maxQuantity}
                                                onChange={(e) => handleRuleChange(index, 'maxQuantity', e.target.value)}
                                                placeholder="5"
                                                min="0"
                                            />
                                            <span className="text-xs text-gray-400 font-bold uppercase">Max</span>
                                        </div>
                                    </td>
                                    <td className="py-5 px-4">
                                        <div className="relative group/input">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">Rs.</span>
                                            <input
                                                type="number"
                                                className="w-full border border-gray-200 rounded-lg pl-10 pr-3 py-2.5 outline-none focus:ring-2 focus:ring-[#F4C430]/20 focus:border-[#F4C430] group-hover/input:border-gray-300 transition-all font-bold"
                                                value={rule.amount}
                                                onChange={(e) => handleRuleChange(index, 'amount', e.target.value)}
                                                placeholder="0 for free"
                                                min="0"
                                            />
                                        </div>
                                    </td>
                                    <td className="py-5 text-right">
                                        <button
                                            onClick={() => handleRemoveRule(rule.id)}
                                            className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                            title="Delete Tier"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {rules.length === 0 && (
                        <div className="text-center py-16 border-2 border-dashed rounded-xl mt-4 border-gray-100 bg-gray-50/30">
                            <Truck className="mx-auto text-gray-200 mb-4" size={48} />
                            <p className="text-gray-400 font-medium">No shipping ranges defined yet.</p>
                            <p className="text-gray-300 text-sm mt-1">Add your first range to start charging for shipping.</p>
                        </div>
                    )}

                    <button
                        onClick={handleAddRule}
                        className="mt-6 w-full py-4 border-2 border-dashed border-gray-200 rounded-xl text-gray-500 hover:border-[#F4C430] hover:text-[#F4C430] hover:bg-[#F4C430]/5 transition-all flex items-center justify-center gap-2 font-bold"
                    >
                        <Plus size={24} /> Add New Shipping Range
                    </button>
                </div>
            </section>

            <div className="mt-8 bg-black text-white p-8 rounded-2xl shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                    <h3 className="text-[#F4C430] text-xl font-bold mb-4 flex items-center gap-2">
                        <Truck size={24} /> How logic works:
                    </h3>
                    <div className="grid md:grid-cols-2 gap-8 text-gray-300 text-sm leading-relaxed">
                        <div className="space-y-4">
                            <div className="flex gap-3">
                                <div className="w-6 h-6 rounded-full bg-[#F4C430] text-black flex items-center justify-center font-bold flex-shrink-0 text-xs">1</div>
                                <p>The system counts the <strong>TOTAL items</strong> in the cart.</p>
                            </div>
                            <div className="flex gap-3">
                                <div className="w-6 h-6 rounded-full bg-[#F4C430] text-black flex items-center justify-center font-bold flex-shrink-0 text-xs">2</div>
                                <p>It checks which <strong>Range</strong> the count falls into (e.g., 6 items falls into 6-10 range).</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex gap-3">
                                <div className="w-6 h-6 rounded-full bg-[#F4C430] text-black flex items-center justify-center font-bold flex-shrink-0 text-xs">3</div>
                                <p>If shipping amount is <strong>0</strong>, the website displays <strong>"Free Shipping"</strong>.</p>
                            </div>
                            <div className="flex gap-3">
                                <div className="w-6 h-6 rounded-full bg-[#F4C430] text-black flex items-center justify-center font-bold flex-shrink-0 text-xs">4</div>
                                <p>If quantity is outside all ranges, the <strong>closest match</strong> is used.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#F4C430]/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
            </div>
        </div>
    );
};

export default ShippingPage;
