import React from 'react';
import { useAdmin } from '../../context/AdminContext';

const Dashboard: React.FC = () => {
    const { products } = useAdmin();

    const stats = [
        { label: 'Total Products', value: products.length, color: 'bg-blue-500' },
        { label: 'Low Stock', value: products.filter(p => p.variants && p.variants.some(v => !v.inStock)).length, color: 'bg-red-500' },
        { label: 'Categories', value: new Set(products.map(p => p.category)).size, color: 'bg-green-500' },
        { label: 'Total Reviews', value: products.reduce((acc, curr) => acc + curr.reviewCount, 0), color: 'bg-purple-500' },
    ];

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <p className="text-gray-500 text-sm font-medium mb-2">{stat.label}</p>
                        <p className="text-3xl font-bold">{stat.value}</p>
                    </div>
                ))}
            </div>

            <div className="mt-12 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold mb-4">Welcome to Big Bie Admin</h2>
                <p className="text-gray-600">
                    Use the sidebar to manage your inventory and settings.
                    Currently, you can view the dashboard stats above reflecting your client-side database.
                </p>
            </div>
        </div>
    );
};

export default Dashboard;
