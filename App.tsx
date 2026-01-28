
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import ScrollToTop from './components/ScrollToTop';
import WhatsAppButton from './components/WhatsAppButton';
import Hero from './components/Hero';
import FeaturedCollection from './components/FeaturedCollection';
import CategoryGrid from './components/CategoryGrid';
import StorySection from './components/StorySection';
import WhyChooseSection from './components/WhyChooseSection';
import Footer from './components/Footer';
import BrasPage from './pages/BrasPage';
import PantiesPage from './pages/PantiesPage';
import KidsPage from './pages/KidsPage';
import SlipsPage from './pages/SlipsPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OurStoryPage from './pages/OurStoryPage';
import DealsPage from './pages/DealsPage';
import ContactUsPage from './pages/ContactUsPage';
import CareersPage from './pages/CareersPage';
import LegalPage from './pages/LegalPage';
import Header from './components/Header';
import MarketingPopup from './components/MarketingPopup';
// Admin Imports
import { AdminProvider } from './context/AdminContext';
import ProtectedAdminRoute from './components/ProtectedAdminRoute';
import LoginPage from './pages/admin/LoginPage';
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import CollectionsPage from './pages/admin/CollectionsPage';
import InventoryList from './pages/admin/InventoryList';
import ProductForm from './pages/admin/ProductForm';
import SettingsPage from './pages/admin/SettingsPage';
import HomeSettings from './pages/admin/HomeSettings';
import MarketingPage from './pages/admin/MarketingPage';
import ShippingPage from './pages/admin/ShippingPage';
import { Navigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <CategoryGrid />
        <FeaturedCollection />
        <StorySection />
        <WhyChooseSection />
      </main>
      <Footer />
    </>
  );
};

const App: React.FC = () => {
  return (
    <AdminProvider>
      <CartProvider>
        <div className="relative min-h-screen">
          <ScrollToTop />
          <WhatsAppButton />
          <MarketingPopup />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/collections/bras" element={<BrasPage />} />
            <Route path="/collections/slips" element={<SlipsPage />} />
            <Route path="/collections/panties" element={<PantiesPage />} />
            <Route path="/collections/kids" element={<KidsPage />} />
            <Route path="/products/:productSlug" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />

            {/* About Section Routes */}
            <Route path="/about/our-story" element={<OurStoryPage />} />
            <Route path="/about/deals" element={<DealsPage />} />

            <Route path="/about/contact-us" element={<ContactUsPage />} />
            <Route path="/about/careers" element={<CareersPage />} />

            {/* Legal Page */}
            <Route path="/legal" element={<LegalPage />} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<LoginPage />} />
            <Route path="/admin" element={<ProtectedAdminRoute />}>
              <Route element={<AdminLayout />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="collections" element={<CollectionsPage />} />
                <Route path="inventory" element={<InventoryList />} />
                <Route path="inventory/new" element={<ProductForm />} />
                <Route path="inventory/edit/:id" element={<ProductForm />} />
                <Route path="settings" element={<SettingsPage />} />
                <Route path="home-settings" element={<HomeSettings />} />
                <Route path="marketing" element={<MarketingPage />} />
                <Route path="shipping" element={<ShippingPage />} />
                <Route index element={<Navigate to="dashboard" replace />} />
              </Route>
            </Route>
          </Routes>
        </div>
      </CartProvider>
    </AdminProvider>
  );
};

export default App;
