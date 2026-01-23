
import React from 'react';
import { NavItem, Category } from './types';

export const BRAND_COLOR = "#F4C430";

export const NAV_LINKS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Bras', href: '/collections/bras', dropdown: ['Daily Wear', 'Sports', 'Bridal', 'Maternity'] },
  { label: 'Slips', href: '/collections/slips' },
  { label: 'Panties', href: '/collections/panties', dropdown: ['Hipsters', 'Bikinis', 'Boy Shorts'] },
  { label: 'Kids', href: '/collections/kids' },
  { label: 'About', href: '#', dropdown: ['Our Story', 'Careers', 'Quality Promise'] },
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

export const Logo = () => (
  <div className="flex items-center justify-center bg-[#F4C430] text-black font-bold text-xl px-4 py-2 rounded shadow-md border border-black/10">
    LOGO
  </div>
);
