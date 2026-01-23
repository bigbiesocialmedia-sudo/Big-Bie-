// Sample product data for development
import { Product } from '../types';

export const SAMPLE_PRODUCTS: Product[] = [
    // --- EXISTING SAMPLE PRODUCTS ---
    {
        id: 'rose-camisole-slip',
        name: 'ROSE',
        slug: 'rose-camisole-slip',
        category: 'Slips',
        price: 122.00,
        originalPrice: 150.00,
        description: 'Premium quality camisole slip made with soft, breathable fabric. Perfect for daily wear with superior comfort and fit.',
        rating: 4.5,
        reviewCount: 12,
        images: [
            'https://images.unsplash.com/photo-1596462502278-27bfad4575a6?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1596462502278-27bfad4575a6?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?auto=format&fit=crop&q=80&w=800',
        ],
        variants: [
            { id: 'size-75', type: 'size', name: '75cm', value: '75', inStock: true },
            { id: 'size-95', type: 'size', name: '95cm', value: '95', inStock: true },
            { id: 'color-nude', type: 'color', name: 'Nude', value: '#D4A373', inStock: true },
            { id: 'color-green', type: 'color', name: 'Green', value: '#228B22', inStock: true },
        ],
    },
    {
        id: 'royal-panty',
        name: 'ROYAL',
        slug: 'royal-panty',
        category: 'Panties',
        price: 92.00,
        originalPrice: 110.00,
        description: 'Comfortable and stylish panty with excellent fit. Available in multiple colors and sizes to suit your preference.',
        rating: 5.0,
        reviewCount: 3,
        images: [
            'https://images.unsplash.com/photo-1616150840131-4043232187f5?auto=format&fit=crop&q=80&w=800',
        ],
        variants: [
            { id: 'size-75', type: 'size', name: '75 CM', value: '75', inStock: true },
            { id: 'size-80', type: 'size', name: '80 CM', value: '80', inStock: true },
            { id: 'color-darkpink', type: 'color', name: 'Dark Pink', value: '#E75480', inStock: true },
            { id: 'color-black', type: 'color', name: 'Black', value: '#000000', inStock: true },
        ],
    },
    {
        id: 'product-1',
        name: 'Classic Cotton Bra',
        slug: 'product-1',
        category: 'Bras',
        price: 450.00,
        originalPrice: 550.00,
        description: 'Experience ultimate comfort with our Classic Cotton Bra. Designed for everyday wear, it features breathable fabric.',
        rating: 4.8,
        reviewCount: 45,
        images: [
            'https://images.unsplash.com/photo-1620799140408-ed5341cd2431?auto=format&fit=crop&q=80&w=800',
        ],
        variants: [
            { id: 'size-32b', type: 'size', name: '32B', value: '32B', inStock: true },
            { id: 'color-white', type: 'color', name: 'White', value: '#FFFFFF', inStock: true },
        ],
    },

    // --- BRAS ---
    {
        id: 'bra-classic-cotton-2',
        name: 'Classic Cotton Bra (Elite)',
        slug: 'classic-cotton-bra-elite',
        category: 'Bras',
        price: 599,
        originalPrice: 799,
        description: 'Premium cotton bra for everyday comfort.',
        rating: 4.5,
        reviewCount: 10,
        images: ['https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=800'],
        variants: []
    },
    {
        id: 'bra-sports',
        name: 'Sports Bra',
        slug: 'sports-bra',
        category: 'Bras',
        price: 799,
        originalPrice: 999,
        description: 'High impact sports bra for active women.',
        rating: 4.7,
        reviewCount: 25,
        images: ['https://images.unsplash.com/photo-1556906994-32837e81c689?auto=format&fit=crop&q=80&w=800'],
        variants: []
    },
    {
        id: 'bra-lace',
        name: 'Lace Bra',
        slug: 'lace-bra',
        category: 'Bras',
        price: 899,
        originalPrice: 1199,
        description: 'Elegant lace bra with superior support.',
        rating: 4.6,
        reviewCount: 18,
        images: ['https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=800'],
        variants: []
    },
    {
        id: 'bra-wireless-comfort',
        name: 'Wireless Comfort Bra',
        slug: 'wireless-comfort-bra',
        category: 'Bras',
        price: 699,
        originalPrice: 899,
        description: 'Wire-free comfort for all-day wear.',
        rating: 4.4,
        reviewCount: 30,
        images: ['https://images.unsplash.com/photo-1556906994-32837e81c689?auto=format&fit=crop&q=80&w=800'],
        variants: []
    },
    {
        id: 'bra-push-up',
        name: 'Push-up Bra',
        slug: 'push-up-bra',
        category: 'Bras',
        price: 999,
        originalPrice: 1299,
        description: 'Enhanced lift and shape.',
        rating: 4.8,
        reviewCount: 40,
        images: ['https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=800'],
        variants: []
    },
    {
        id: 'bra-everyday-essentials',
        name: 'Everyday Essentials',
        slug: 'everyday-essentials-bra',
        category: 'Bras',
        price: 549,
        originalPrice: 699,
        description: 'Essential daily wear bra.',
        rating: 4.3,
        reviewCount: 50,
        images: ['https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=800'],
        variants: []
    },
    {
        id: 'bra-premium-silk',
        name: 'Premium Silk Bra',
        slug: 'premium-silk-bra',
        category: 'Bras',
        price: 1299,
        originalPrice: 1599,
        description: 'Luxurious silk for special occasions.',
        rating: 4.9,
        reviewCount: 15,
        images: ['https://images.unsplash.com/photo-1556906994-32837e81c689?auto=format&fit=crop&q=80&w=800'],
        variants: []
    },
    {
        id: 'bra-beginner',
        name: 'Beginner Bra',
        slug: 'beginner-bra',
        category: 'Bras',
        price: 499,
        originalPrice: 599,
        description: 'Perfect first bra for teenagers.',
        rating: 4.5,
        reviewCount: 22,
        images: ['https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=800'],
        variants: []
    },

    // --- PANTIES ---
    {
        id: 'panty-cotton-brief',
        name: 'Cotton Brief',
        slug: 'cotton-brief',
        category: 'Panties',
        price: 299,
        originalPrice: 399,
        description: 'Soft cotton brief for daily comfort.',
        rating: 4.5,
        reviewCount: 100,
        images: ['https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=800'],
        variants: []
    },
    {
        id: 'panty-hipster',
        name: 'Hipster Panty',
        slug: 'hipster-panty',
        category: 'Panties',
        price: 349,
        originalPrice: 449,
        description: 'Modern hipster cut.',
        rating: 4.4,
        reviewCount: 80,
        images: ['https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=800'],
        variants: []
    },
    {
        id: 'panty-lace-thong',
        name: 'Lace Thong',
        slug: 'lace-thong',
        category: 'Panties',
        price: 399,
        originalPrice: 499,
        description: 'Delicate lace thong.',
        rating: 4.6,
        reviewCount: 60,
        images: ['https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=800'],
        variants: []
    },
    {
        id: 'panty-seamless-brief',
        name: 'Seamless Brief',
        slug: 'seamless-brief',
        category: 'Panties',
        price: 329,
        originalPrice: 429,
        description: 'Invisible panty lines.',
        rating: 4.7,
        reviewCount: 90,
        images: ['https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=800'],
        variants: []
    },
    {
        id: 'panty-high-waist',
        name: 'High-waist Panty',
        slug: 'high-waist-panty',
        category: 'Panties',
        price: 379,
        originalPrice: 479,
        description: 'Tummy control high-waist panty.',
        rating: 4.5,
        reviewCount: 45,
        images: ['https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=800'],
        variants: []
    },
    {
        id: 'panty-bikini',
        name: 'Bikini Panty',
        slug: 'bikini-panty',
        category: 'Panties',
        price: 299,
        originalPrice: 399,
        description: 'Classic bikini cut.',
        rating: 4.6,
        reviewCount: 110,
        images: ['https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=800'],
        variants: []
    },
    {
        id: 'panty-cheeky-brief',
        name: 'Cheeky Brief',
        slug: 'cheeky-brief',
        category: 'Panties',
        price: 319,
        originalPrice: 419,
        description: 'Cheeky cut for a flattering look.',
        rating: 4.5,
        reviewCount: 55,
        images: ['https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=800'],
        variants: []
    },
    {
        id: 'panty-boy-short',
        name: 'Boy Short',
        slug: 'boy-short',
        category: 'Panties',
        price: 349,
        originalPrice: 449,
        description: 'Full coverage boy shorts.',
        rating: 4.7,
        reviewCount: 70,
        images: ['https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=800'],
        variants: []
    },

    // --- SLIPS ---
    {
        id: 'slip-cotton',
        name: 'Cotton Slip',
        slug: 'cotton-slip',
        category: 'Slips',
        price: 449,
        originalPrice: 549,
        description: 'Breathable cotton slip.',
        rating: 4.5,
        reviewCount: 30,
        images: ['https://images.unsplash.com/photo-1594633313593-bab3825d0caf?auto=format&fit=crop&q=80&w=800'],
        variants: []
    },
    {
        id: 'slip-lace-trim',
        name: 'Lace Trim Slip',
        slug: 'lace-trim-slip',
        category: 'Slips',
        price: 599,
        originalPrice: 699,
        description: 'Slip with elegant lace details.',
        rating: 4.6,
        reviewCount: 25,
        images: ['https://images.unsplash.com/photo-1594633313593-bab3825d0caf?auto=format&fit=crop&q=80&w=800'],
        variants: []
    },
    {
        id: 'slip-seamless-camisole',
        name: 'Seamless Camisole',
        slug: 'seamless-camisole',
        category: 'Slips',
        price: 399,
        originalPrice: 499,
        description: 'Smooth seamless camisole.',
        rating: 4.7,
        reviewCount: 40,
        images: ['https://images.unsplash.com/photo-1594633313593-bab3825d0caf?auto=format&fit=crop&q=80&w=800'],
        variants: []
    },
    {
        id: 'slip-silk',
        name: 'Silk Slip',
        slug: 'silk-slip',
        category: 'Slips',
        price: 899,
        originalPrice: 1099,
        description: 'Pure silk slip for nightwear.',
        rating: 4.8,
        reviewCount: 15,
        images: ['https://images.unsplash.com/photo-1594633313593-bab3825d0caf?auto=format&fit=crop&q=80&w=800'],
        variants: []
    },
    {
        id: 'slip-full-length',
        name: 'Full Length Slip',
        slug: 'full-length-slip',
        category: 'Slips',
        price: 549,
        originalPrice: 659,
        description: 'Full coverage slip.',
        rating: 4.5,
        reviewCount: 20,
        images: ['https://images.unsplash.com/photo-1594633313593-bab3825d0caf?auto=format&fit=crop&q=80&w=800'],
        variants: []
    },
    {
        id: 'slip-half',
        name: 'Half Slip',
        slug: 'half-slip',
        category: 'Slips',
        price: 379,
        originalPrice: 479,
        description: 'Waist half slip.',
        rating: 4.4,
        reviewCount: 35,
        images: ['https://images.unsplash.com/photo-1594633313593-bab3825d0caf?auto=format&fit=crop&q=80&w=800'],
        variants: []
    },
    {
        id: 'slip-adjustable-strap',
        name: 'Adjustable Strap Slip',
        slug: 'adjustable-strap-slip',
        category: 'Slips',
        price: 479,
        originalPrice: 579,
        description: 'Slip with adjustable straps for perfect fit.',
        rating: 4.6,
        reviewCount: 28,
        images: ['https://images.unsplash.com/photo-1594633313593-bab3825d0caf?auto=format&fit=crop&q=80&w=800'],
        variants: []
    },
    {
        id: 'slip-premium-cotton',
        name: 'Premium Cotton Slip',
        slug: 'premium-cotton-slip',
        category: 'Slips',
        price: 649,
        originalPrice: 799,
        description: 'High quality cotton slip.',
        rating: 4.7,
        reviewCount: 18,
        images: ['https://images.unsplash.com/photo-1594633313593-bab3825d0caf?auto=format&fit=crop&q=80&w=800'],
        variants: []
    },

    // --- KIDS ---
    {
        id: 'kids-girls-vest',
        name: 'Girls Cotton Vest',
        slug: 'girls-cotton-vest',
        category: 'Kids',
        price: 249,
        originalPrice: 299,
        description: 'Soft cotton vest for girls.',
        rating: 4.5,
        reviewCount: 50,
        images: ['https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&q=80&w=800'],
        variants: []
    },
    {
        id: 'kids-boys-brief-set',
        name: 'Boys Brief Set',
        slug: 'boys-brief-set',
        category: 'Kids',
        price: 299,
        originalPrice: 399,
        description: 'Pack of comfortable briefs for boys.',
        rating: 4.6,
        reviewCount: 60,
        images: ['https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&q=80&w=800'],
        variants: []
    },
    {
        id: 'kids-girls-training-bra',
        name: 'Girls Training Bra',
        slug: 'girls-training-bra',
        category: 'Kids',
        price: 349,
        originalPrice: 449,
        description: 'First bra for growing girls.',
        rating: 4.7,
        reviewCount: 40,
        images: ['https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&q=80&w=800'],
        variants: []
    },
    {
        id: 'kids-comfort-pack',
        name: 'Kids Comfort Pack',
        slug: 'kids-comfort-pack',
        category: 'Kids',
        price: 599,
        originalPrice: 799,
        description: 'Value pack of daily essentials.',
        rating: 4.8,
        reviewCount: 30,
        images: ['https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&q=80&w=800'],
        variants: []
    },
    {
        id: 'kids-girls-panty-set',
        name: 'Girls Panty Set',
        slug: 'girls-panty-set',
        category: 'Kids',
        price: 399,
        originalPrice: 499,
        description: 'Set of colorful panties.',
        rating: 4.6,
        reviewCount: 55,
        images: ['https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&q=80&w=800'],
        variants: []
    },
    {
        id: 'kids-boys-trunk',
        name: 'Boys Trunk',
        slug: 'boys-trunk',
        category: 'Kids',
        price: 279,
        originalPrice: 349,
        description: 'Comfortable trunks for boys.',
        rating: 4.5,
        reviewCount: 65,
        images: ['https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&q=80&w=800'],
        variants: []
    },
    {
        id: 'kids-printed-underwear',
        name: 'Printed Kids Underwear',
        slug: 'printed-kids-underwear',
        category: 'Kids',
        price: 329,
        originalPrice: 429,
        description: 'Fun prints for kids.',
        rating: 4.7,
        reviewCount: 45,
        images: ['https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&q=80&w=800'],
        variants: []
    },
    {
        id: 'kids-essentials-bundle',
        name: 'Kids Essentials Bundle',
        slug: 'kids-essentials-bundle',
        category: 'Kids',
        price: 699,
        originalPrice: 899,
        description: 'Complete set of innerwear essentials.',
        rating: 4.9,
        reviewCount: 20,
        images: ['https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&q=80&w=800'],
        variants: []
    },
];

// Helper function to get product by slug
export const getProductBySlug = (slug: string): Product | undefined => {
    return SAMPLE_PRODUCTS.find(product => product.slug === slug);
};

// Helper function to generate slug from product name
export const generateSlug = (name: string): string => {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
};
