
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, Search, ShoppingCart, ChevronDown, Menu, X } from 'lucide-react';
import { NAV_LINKS, Logo } from '../constants';
import { useCart } from '../context/CartContext';
import { useAdmin } from '../context/AdminContext';

const Header: React.FC = () => {
  const { cartCount } = useCart();
  const { subCollections } = useAdmin();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-white py-4 shadow-sm border-b border-gray-100">
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Left: Logo - positioned specifically like the screenshot */}
        <Link to="/" className="flex-shrink-0 cursor-pointer">
          <Logo />
        </Link>

        {/* Center: Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-10 flex-grow justify-center pl-10">
          {NAV_LINKS.map((link) => {
            // Dynamic Sub-Collections Check
            // Dynamic Sub-Collections Check
            // If the category exists in our dynamic subCollections (even if empty), use it.
            // Fallback to static link.dropdown only if the category key is missing from dynamic data.
            const dynamicSubs = subCollections && subCollections[link.label];
            const dropdownItems = dynamicSubs !== undefined ? dynamicSubs : link.dropdown;
            const hasDropdown = dropdownItems && dropdownItems.length > 0;

            return (
              <div key={link.label} className="group relative">
                <Link to={link.href} className="flex items-center text-lg font-medium tracking-wide text-black hover:text-[#F4C430] transition-colors py-2">
                  {link.label}
                  {hasDropdown && <ChevronDown size={16} className="ml-1 group-hover:rotate-180 transition-transform duration-300 opacity-70" />}
                </Link>
                {hasDropdown && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 bg-white shadow-2xl min-w-[220px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 p-4 rounded-xl border border-gray-100">
                    {dropdownItems!.map((sub) => {
                      // Check if sub is a DropdownItem object or a string
                      const isObject = typeof sub === 'object' && sub !== null && 'href' in sub;
                      const label = isObject ? (sub as any).label : sub;
                      let href = isObject ? (sub as any).href : '#';

                      if (!isObject && typeof sub === 'string') {
                        href = `${link.href}?type=${encodeURIComponent(sub)}`;
                      }

                      return (
                        <Link
                          key={label}
                          to={href}
                          className="block py-3 px-4 text-sm text-gray-800 hover:bg-[#F4C430]/10 hover:text-black transition-all rounded-lg"
                        >
                          {label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </nav>

        {/* Right: Icons */}
        <div className="flex items-center space-x-8 text-black">

          <button className="hover:text-[#F4C430] transition-transform hover:scale-110"><Search size={24} strokeWidth={1.5} /></button>
          <button className="hover:text-[#F4C430] transition-transform hover:scale-110 relative">
            <Link to="/cart">
              <ShoppingCart size={24} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#F4C430] text-black text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-md">
                  {cartCount}
                </span>
              )}
            </Link>
          </button>
          <button className="lg:hidden" onClick={() => setMobileMenuOpen(true)}>
            <Menu size={28} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {
        mobileMenuOpen && (
          <div className="fixed inset-0 bg-white z-[60] p-6 lg:hidden flex flex-col">
            <div className="flex justify-between items-center mb-12">
              <div className="p-2">
                <Logo />
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"><X size={30} className="text-black" /></button>
            </div>
            <nav className="space-y-8 overflow-y-auto">
              {NAV_LINKS.map((link) => {
                const dynamicSubs = subCollections && subCollections[link.label];
                const dropdownItems = dynamicSubs !== undefined ? dynamicSubs : link.dropdown;
                const hasDropdown = dropdownItems && dropdownItems.length > 0;

                return (
                  <div key={link.label} className="border-b border-gray-100 pb-6">
                    <Link
                      to={link.href}
                      className="text-2xl font-bold uppercase flex justify-between items-center text-gray-900"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                      {hasDropdown && <ChevronDown size={22} />}
                    </Link>
                    {/* Mobile Dropdown (Simplified) */}
                    {hasDropdown && (
                      <div className="mt-4 pl-4 space-y-3">
                        {dropdownItems!.map(sub => {
                          // Check if sub is a DropdownItem object or a string
                          const isObject = typeof sub === 'object' && sub !== null && 'href' in sub;
                          const label = isObject ? (sub as any).label : sub;
                          let href = isObject ? (sub as any).href : '#';

                          if (!isObject && typeof sub === 'string') {
                            href = `${link.href}?type=${encodeURIComponent(sub)}`;
                          }

                          return (
                            <Link
                              key={label}
                              to={href}
                              className="block text-gray-600 font-medium"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {label}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )
              })}
            </nav>
          </div>
        )
      }
    </header >
  );
};

export default Header;
