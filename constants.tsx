
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
      { label: 'Dealership', href: '/about/deals' },
      { label: 'Careers', href: '/about/careers' },
      { label: 'Contact Us', href: '/about/contact-us' }
    ]
  },
];

export const CATEGORIES: Category[] = [
  {
    title: 'Bras',
    image: 'https://i.pinimg.com/736x/8f/b5/72/8fb572931b93c3424d0a3955da3c989b.jpg',
    href: '/collections/bras',
  },
  {
    title: 'Kids',
    image: 'https://i.pinimg.com/1200x/44/1e/a7/441ea7e1f619e256a3d68ab3140f3319.jpg',
    href: '/collections/kids',
  },
  {
    title: 'Panties',
    image: 'https://i.pinimg.com/1200x/31/8d/a5/318da51432b723697579e5092b899161.jpg',
    href: '/collections/panties',
    objectPosition: 'object-bottom', // Adjust image alignment
  },
  {
    title: 'Slips',
    image: 'https://i.pinimg.com/736x/bf/57/1d/bf571d631b6abe2ce3b315976c0fa573.jpg',
    href: '/collections/slips',
  },
];

import LogoImage from './Asset/logo.jpeg';

export const Logo = ({ className }: { className?: string }) => (
  <img src={LogoImage} alt="Big Bie Logo" className={`w-auto object-contain ${className || 'h-16'}`} />
);
