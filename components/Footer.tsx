
import React from 'react';
import { Link } from 'react-router-dom';
import { Logo, NAV_LINKS } from '../constants';
import { useAdmin } from '../context/AdminContext';

const Footer: React.FC = () => {
  const { subCollections } = useAdmin();

  // Get all collection links from NAV_LINKS (excluding Home and About)
  const collections = NAV_LINKS.filter(link =>
    link.href.startsWith('/collections/')
  );

  return (
    <footer className="bg-[#F4C430] pt-16 pb-8">
      <div className="container mx-auto px-6 max-w-7xl">

        {/* Newsletter Section */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
            Sign up and save More
          </h2>
          <p className="text-black/80 max-w-2xl mb-6 leading-relaxed">
            Subscribe to get to know about the latest product offers, special offers, free giveaways, once-in-a-lifetime deals and much more. Stay tuned with Big Bie!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border-2 border-black/10 focus:border-black focus:outline-none transition-colors"
            />
            <button className="px-8 py-3 bg-black text-white font-semibold hover:bg-black/90 transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>

        {/* Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          {/* Logo Column */}
          <div>
            <Logo className="h-24" />
          </div>

          {/* Collections Column - DYNAMIC */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-6 text-black">
              COLLECTIONS
            </h4>
            <ul className="space-y-3">
              {collections.map((collection) => {
                // Get dynamic subcollections from admin or fallback to static dropdown
                const dynamicSubs = subCollections && subCollections[collection.label];
                const subs = dynamicSubs !== undefined ? dynamicSubs : collection.dropdown;
                const hasSubs = subs && subs.length > 0;

                return (
                  <li key={collection.label}>
                    <Link to={collection.href} className="text-black/80 hover:text-black transition-colors font-medium">
                      {collection.label}
                    </Link>
                    {hasSubs && (
                      <ul className="ml-4 mt-2 space-y-2">
                        {subs.map((sub) => (
                          <li key={sub}>
                            <a href="#" className="text-black/60 hover:text-black transition-colors text-sm">
                              {sub}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* About Column */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-6 text-black">
              ABOUT
            </h4>
            <ul className="space-y-3">
              <li><Link to="/about/our-story" className="text-black/80 hover:text-black transition-colors">Our Story</Link></li>
              <li><Link to="/about/deals" className="text-black/80 hover:text-black transition-colors">Deals</Link></li>
              <li><Link to="/about/contact-us" className="text-black/80 hover:text-black transition-colors">Contact Us</Link></li>
              <li><Link to="/legal#shipping" className="text-black/80 hover:text-black transition-colors">Shipping & Delivery</Link></li>
              <li><Link to="/legal#privacy" className="text-black/80 hover:text-black transition-colors">Privacy Policy</Link></li>
              <li><Link to="/legal#terms" className="text-black/80 hover:text-black transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/legal#refund" className="text-black/80 hover:text-black transition-colors">Refund Policy</Link></li>
            </ul>
          </div>

          {/* Address Column */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-6 text-black">
              ADDRESS
            </h4>
            <div className="space-y-3 text-black/80">
              <p>
                Big Bie,<br />
                Bangalore, Karnataka, India
              </p>
              <p>
                Customer Care: +91 831-0306547
              </p>
              <p>
                Email: customercare@bigbie.com
              </p>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;
