
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
    image: '/Products/Home Collection/Bra.png',
    href: '/collections/bras',
  },
  {
    title: 'Kids',
    image: '/Products/Home Collection/Kids.png',
    href: '/collections/kids',
  },
  {
    title: 'Panties',
    image: '/Products/Home Collection/Panties.png',
    href: '/collections/panties',
  },
  {
    title: 'Slips',
    image: '/Products/Home Collection/Slips.png',
    href: '/collections/slips',
  },
];

import LogoImage from './Asset/Logo.png';

export const Logo = ({ className }: { className?: string }) => (
  <img src={LogoImage} alt="Big Bie Logo" className={`w-auto object-contain ${className || 'h-16'}`} />
);
