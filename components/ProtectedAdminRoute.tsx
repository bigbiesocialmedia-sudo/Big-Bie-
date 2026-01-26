import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';

const ProtectedAdminRoute: React.FC = () => {
    const { isAuthenticated, loadingAuth } = useAdmin();

    if (loadingAuth) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 border-4 border-[#F4C430] border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-gray-600 font-medium">Verifying access...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/admin/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedAdminRoute;
