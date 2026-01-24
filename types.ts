
// Fix: Added React import to resolve the 'React' namespace error for React.ReactNode
import React from 'react';

export interface DropdownItem {
  label: string;
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
  dropdown?: string[] | DropdownItem[];
}

export interface Category {
  title: string;
  image: string;
  href: string;
}

export interface FeatureIcon {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface ProductVariant {
  id: string;
  type: 'size' | 'color';
  name: string; // e.g., "75 CM", "Red"
  value: string; // e.g., "75cm", "#FF0000"
  price?: number; // Optional variant-specific pricing
  images?: string[]; // Optional variant-specific images
  inStock: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string; // SEO-friendly URL slug
  category: string;
  subCollection?: string;
  price: number;
  originalPrice?: number; // For showing discounts
  description: string;
  rating: number;
  reviewCount: number;
  images: string[]; // Product images
  variants: ProductVariant[];
  createdAt?: string;
}

export interface CartItem {
  productId: string;
  productName: string;
  productSlug: string;
  image: string;
  price: number;
  quantity: number;
  selectedVariants: {
    size?: string;
    color?: string;
  };
}