
import React from 'react';
import { NavItem, Category } from './types';

export const BRAND_COLOR = "#F4C430";

export const NAV_LINKS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Bras', href: '/collections/bras', dropdown: ['Daily Wear', 'Sports', 'Bridal', 'Maternity'] },
  { label: 'Slips', href: '/collections/slips' },
  { label: 'Panties', href: '/collections/panties', dropdown: ['Hipsters', 'Bikinis', 'Boy Shorts'] },
  { label: 'Kids', href: '/collections/kids' },
  {
    label: 'About',
    href: '#',
    dropdown: [
      { label: 'Our Story', href: '/about/our-story' },
      { label: 'Deals', href: '/about/deals' },
      { label: 'Contact Us', href: '/about/contact-us' }
    ]
  },
];

export const CATEGORIES: Category[] = [
  {
    title: 'Bras',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfad4575a6?auto=format&fit=crop&q=80&w=800',
    href: '/collections/bras',
  },
  {
    title: 'Kids',
    image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&q=80&w=800',
    href: '/collections/kids',
  },
  {
    title: 'Panties',
    image: 'https://images.unsplash.com/photo-1616150841131-4043232187f5?auto=format&fit=crop&q=80&w=800',
    href: '/collections/panties',
  },
  {
    title: 'Slips',
    image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&q=80&w=800',
    href: '/collections/slips',
  },
];

import LogoImage from './Asset/Logo.png';

export const Logo = ({ className }: { className?: string }) => (
  <img src={LogoImage} alt="Big Bie Logo" className={`w-auto object-contain ${className || 'h-9'}`} />
);
