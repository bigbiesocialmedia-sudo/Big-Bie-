
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
  objectPosition?: string; // Optional: 'top', 'center', 'bottom', 'left', 'right' or specific values
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

// NEW: Combination-based variant (size + color = one variant) for advanced variant management
export interface VariantCombination {
  id: string;
  sku: string;              // Unique SKU for this combination
  size: string;             // Required: e.g., "75cm", "80cm"
  sizeLabel: string;        // Display label: "75 CM", "80 CM"
  color: string;            // Required: hex code or color name
  colorLabel: string;       // Display label: "Nude", "Black", "Red"
  stock: number;            // Numeric stock count
  price?: number;           // Optional price override for this combination
  images?: string[];        // Optional color-specific images for this combination
}

// NEW: Color-First Workflow - Simplified color management
export interface ProductColor {
  id: string;
  name: string;             // User-friendly name: "Red", "Black", "Nude"
  value: string;            // Auto-generated hex code or slug for internal use
  images: string[];         // Images for this color (uploaded once, used for all sizes)
}

// NEW: Color-First Workflow - Simplified size management
export interface ProductSize {
  id: string;
  name: string;             // User-friendly name: "75 CM", "80 CM", "XL"
  value: string;            // Auto-generated slug for internal use: "75cm", "80cm", "xl"
}

// NEW: Image-First Workflow - Visual color groups with images
export interface ColorImageGroup {
  id: string;
  colorName: string;        // User-friendly name: "Red", "Black", "Purple"
  colorValue: string;       // Auto-generated hex code for display
  images: string[];         // All images for this color group
}

export interface ProductReview {
  id: string;
  reviewerName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface MarketingSettings {
  isEnabled: boolean;
  bannerImage: string;
  heading: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

export interface AnnouncementBarSettings {
  isEnabled: boolean;
  text: string;
  textColor: string;
  backgroundColor: string;
  speed: 'slow' | 'normal' | 'fast';
  direction: 'ltr' | 'rtl';
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
  variants: ProductVariant[]; // Legacy: Simple independent variants
  createdAt?: string;
  reviews?: ProductReview[]; // NEW: Manual reviews

  // NEW: Optional fields for advanced variant management
  variantCombinations?: VariantCombination[]; // Advanced: Size+Color combinations with stock
  imagesByColor?: Record<string, string[]>; // Map color values to image arrays

  // NEW: Color-First Workflow fields
  productColors?: ProductColor[]; // Simplified: Colors with images (upload once)
  productSizes?: ProductSize[];   // Simplified: Available sizes

  // NEW: Image-First Workflow (User's Superior Concept)
  imageGroups?: ColorImageGroup[]; // Visual image library with color groups
}

export interface CartItem {
  productId: string;
  productName: string;
  productSlug: string;
  image: string;
  price: number;
  quantity: number;
  variantCombinationId?: string; // NEW: Track specific size+color combination (for advanced variants)
  selectedVariants: {
    size?: string;
    sizeLabel?: string; // Human-readable size label (e.g., "75 cm")
    color?: string;
    colorLabel?: string; // Human-readable color label (e.g., "Red")
  };
}

export interface ShippingRule {
  id: string;
  minQuantity: number;
  maxQuantity: number;
  amount: number;
}