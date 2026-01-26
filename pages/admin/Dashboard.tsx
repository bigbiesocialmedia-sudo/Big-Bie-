import React from 'react';
import { useAdmin } from '../../context/AdminContext';

const Dashboard: React.FC = () => {
    const { products } = useAdmin();

    const categoryStats = products.reduce((acc, product) => {
        const cat = product.category || 'Uncategorized';
        acc[cat] = (acc[cat] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const stats = [
        { label: 'Total Products', value: products.length, color: 'bg-blue-500' },
        { label: 'Total Categories', value: Object.keys(categoryStats).length, color: 'bg-green-500' },
    ];

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

            {/* Main Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <p className="text-gray-500 text-sm font-medium mb-2">{stat.label}</p>
                        <p className="text-4xl font-bold">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Category Breakdown */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
                <h2 className="text-xl font-bold mb-6">Available Products in Each Category</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {Object.entries(categoryStats).map(([category, count]) => (
                        <div key={category} className="p-4 bg-gray-50 rounded-lg border border-gray-100 flex justify-between items-center">
                            <span className="font-medium text-gray-700">{category}</span>
                            <span className="bg-black text-white text-sm font-bold px-3 py-1 rounded-full">
                                {count}
                            </span>
                        </div>
                    ))}
                    {Object.keys(categoryStats).length === 0 && (
                        <p className="text-gray-500 italic">No categories found.</p>
                    )}
                </div>
            </div>

            <div className="bg-yellow-50 p-8 rounded-xl border border-[#F4C430]">
                <h2 className="text-xl font-bold mb-2 text-black">Welcome to Big Bie Admin</h2>
                <p className="text-gray-700">
                    Manage your inventory, categories, and settings from here.
                </p>
            </div>
        </div>
    );
};

export default Dashboard;
