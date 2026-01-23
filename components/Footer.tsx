
import React from 'react';
import { Logo } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#F4C430] pt-16 pb-8">
      <div className="container mx-auto px-6 max-w-7xl">

        {/* Newsletter Section */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
            Sign up and save More
          </h2>
          <p className="text-black/80 max-w-2xl mb-6 leading-relaxed">
            Subscribe to get to know about the latest product offers, special offers, free giveaways, once-in-a-lifetime deals and much more. Stay tuned with Prithvi!
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
            <Logo />
          </div>

          {/* New Arrivals Column */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-6 text-black">
              NEW ARRIVALS
            </h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-black/80 hover:text-black transition-colors">Bras</a></li>
              <li><a href="#" className="text-black/80 hover:text-black transition-colors">Slips</a></li>
              <li><a href="#" className="text-black/80 hover:text-black transition-colors">Kids</a></li>
              <li><a href="#" className="text-black/80 hover:text-black transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-black/80 hover:text-black transition-colors">Refund policy</a></li>
            </ul>
          </div>

          {/* About Column */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-6 text-black">
              ABOUT
            </h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-black/80 hover:text-black transition-colors">Our Story</a></li>
              <li><a href="#" className="text-black/80 hover:text-black transition-colors">Bulk Order</a></li>
              <li><a href="#" className="text-black/80 hover:text-black transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-black/80 hover:text-black transition-colors">Shipping & Delivery</a></li>
              <li><a href="#" className="text-black/80 hover:text-black transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-black/80 hover:text-black transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="text-black/80 hover:text-black transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Address Column */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-6 text-black">
              ADDRESS
            </h4>
            <div className="space-y-3 text-black/80">
              <p>
                SF No. 386/1, Jeeva Nagar Extn, Sullenpet,<br />
                Mangalam P.O, Tirupur.
              </p>
              <p>
                Customer Care: 1800 572 7703
              </p>
              <p>
                Email: customercare@prithvimail.com
              </p>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;
