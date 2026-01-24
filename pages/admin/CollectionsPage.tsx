import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { Trash2, Plus, Layers, FolderPlus } from 'lucide-react';

const CollectionsPage: React.FC = () => {
    const { subCollections, updateSubCollections } = useAdmin();
    const [newSub, setNewSub] = useState<Record<string, string>>({});

    const handleAdd = (category: string) => {
        if (!newSub[category]?.trim()) return;

        const current = subCollections[category] || [];
        const newName = newSub[category].trim();

        if (current.includes(newName)) {
            alert('This sub-collection already exists!');
            return;
        }

        const updated = {
            ...subCollections,
            [category]: [...current, newName]
        };

        updateSubCollections(updated);
        setNewSub({ ...newSub, [category]: '' });
    };

    const handleDelete = (category: string, sub: string) => {
        if (!confirm(`Are you sure you want to remove "${sub}" from ${category}?`)) return;

        const updated = {
            ...subCollections,
            [category]: subCollections[category].filter(s => s !== sub)
        };

        updateSubCollections(updated);
    };

    return (
        <div className="max-w-6xl mx-auto pb-20">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                    <Layers className="text-[#F4C430]" size={32} />
                    Collections Management
                </h1>
                <p className="text-gray-500 mt-2 text-lg">
                    Manage sub-collections for your main product categories. These will appear in the website navigation and product forms.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.keys(subCollections).map(category => (
                    <div key={category} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                        <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-gray-800">{category}</h2>
                            <span className="text-xs font-medium bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                                {subCollections[category]?.length || 0} subs
                            </span>
                        </div>

                        <div className="p-6">
                            {/* Sub-collection List */}
                            <div className="flex flex-wrap gap-2 mb-6 min-h-[50px]">
                                {(subCollections[category] || []).map(sub => (
                                    <span key={sub} className="group flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium shadow-sm hover:border-[#F4C430] transition-colors">
                                        {sub}
                                        <button
                                            onClick={() => handleDelete(category, sub)}
                                            className="text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                            title="Delete sub-collection"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </span>
                                ))}
                                {(subCollections[category] || []).length === 0 && (
                                    <div className="flex flex-col items-center justify-center w-full py-6 text-gray-400 border-2 border-dashed border-gray-100 rounded-lg">
                                        <FolderPlus size={24} className="mb-2 opacity-50" />
                                        <span className="text-sm italic">No sub-collections defined yet.</span>
                                    </div>
                                )}
                            </div>

                            {/* Add New Input */}
                            <div className="mt-auto">
                                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                                    Add New Sub-Collection
                                </label>
                                <div className="flex gap-2 relative">
                                    <input
                                        type="text"
                                        className="flex-1 bg-gray-50 border border-gray-200 rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#F4C430]/50 focus:border-[#F4C430] transition-all"
                                        placeholder={`e.g., "Daily Wear"`}
                                        value={newSub[category] || ''}
                                        onChange={e => setNewSub({ ...newSub, [category]: e.target.value })}
                                        onKeyDown={e => e.key === 'Enter' && handleAdd(category)}
                                    />
                                    <button
                                        onClick={() => handleAdd(category)}
                                        disabled={!newSub[category]?.trim()}
                                        className="bg-black text-white px-5 rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <Plus size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CollectionsPage;
