import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';

const ProtectedAdminRoute: React.FC = () => {
    const { isAuthenticated, loadingAuth } = useAdmin();
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        // Check initially
        checkMobile();

        // Add listener
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    if (isMobile) {
        // Render 404 Not Found style for mobile users trying to access admin
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
                <p className="text-xl text-gray-600 mb-8">Page Not Found</p>
                <p className="text-gray-500 max-w-md">
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>
            </div>
        );
    }

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
