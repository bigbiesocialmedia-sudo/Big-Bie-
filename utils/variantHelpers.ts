import { Product, VariantCombination, ProductVariant } from '../types';

/**
 * Check if a product uses the advanced variant system (combination-based)
 * @param product - The product to check
 * @returns true if product has variant combinations, false if using legacy variants
 */
export const usesAdvancedVariants = (product: Product): boolean => {
    return Boolean(product.variantCombinations && product.variantCombinations.length > 0);
};

/**
 * Get all available sizes for a product, optionally filtered by selected color
 * @param product - The product
 * @param selectedColor - Optional color filter
 * @returns Array of available size values
 */
export const getAvailableSizes = (
    product: Product,
    selectedColor?: string
): string[] => {
    if (!usesAdvancedVariants(product)) {
        // Legacy system: return all sizes that are marked as in stock
        return product.variants
            .filter(v => v.type === 'size' && v.inStock)
            .map(v => v.value);
    }

    // Advanced system: filter combinations by color and stock
    const combinations = product.variantCombinations!;
    const availableSizes = combinations
        .filter(vc =>
            vc.stock > 0 &&
            (!selectedColor || vc.color === selectedColor)
        )
        .map(vc => vc.size);

    // Return unique sizes only
    return [...new Set(availableSizes)];
};

/**
 * Get all available colors for a product, optionally filtered by selected size
 * @param product - The product
 * @param selectedSize - Optional size filter
 * @returns Array of available color values
 */
export const getAvailableColors = (
    product: Product,
    selectedSize?: string
): string[] => {
    if (!usesAdvancedVariants(product)) {
        // Legacy system: return all colors that are marked as in stock
        return product.variants
            .filter(v => v.type === 'color' && v.inStock)
            .map(v => v.value);
    }

    // Advanced system: filter combinations by size and stock
    const combinations = product.variantCombinations!;
    const availableColors = combinations
        .filter(vc =>
            vc.stock > 0 &&
            (!selectedSize || vc.size === selectedSize)
        )
        .map(vc => vc.color);

    // Return unique colors only
    return [...new Set(availableColors)];
};

/**
 * Get color labels mapped to their values
 * @param product - The product
 * @param selectedSize - Optional size filter
 * @returns Map of color values to their display labels
 */
export const getColorLabels = (
    product: Product,
    selectedSize?: string
): Record<string, string> => {
    if (!usesAdvancedVariants(product)) {
        // Legacy system: use variant names as labels
        const colorVariants = product.variants.filter(v => v.type === 'color' && v.inStock);
        const labels: Record<string, string> = {};
        colorVariants.forEach(v => {
            labels[v.value] = v.name;
        });
        return labels;
    }

    // Advanced system: use combination labels
    const combinations = product.variantCombinations!;
    const labels: Record<string, string> = {};

    combinations
        .filter(vc => vc.stock > 0 && (!selectedSize || vc.size === selectedSize))
        .forEach(vc => {
            labels[vc.color] = vc.colorLabel;
        });

    return labels;
};

/**
 * Get size labels mapped to their values
 * @param product - The product
 * @param selectedColor - Optional color filter
 * @returns Map of size values to their display labels
 */
export const getSizeLabels = (
    product: Product,
    selectedColor?: string
): Record<string, string> => {
    if (!usesAdvancedVariants(product)) {
        // Legacy system: use variant names as labels
        const sizeVariants = product.variants.filter(v => v.type === 'size' && v.inStock);
        const labels: Record<string, string> = {};
        sizeVariants.forEach(v => {
            labels[v.value] = v.name;
        });
        return labels;
    }

    // Advanced system: use combination labels
    const combinations = product.variantCombinations!;
    const labels: Record<string, string> = {};

    combinations
        .filter(vc => vc.stock > 0 && (!selectedColor || vc.color === selectedColor))
        .forEach(vc => {
            labels[vc.size] = vc.sizeLabel;
        });

    return labels;
};

/**
 * Get a specific variant combination by size and color
 * @param product - The product
 * @param size - Size value
 * @param color - Color value
 * @returns The matching variant combination or null
 */
export const getVariantCombination = (
    product: Product,
    size: string,
    color: string
): VariantCombination | null => {
    if (!usesAdvancedVariants(product)) {
        return null;
    }

    return product.variantCombinations!.find(
        vc => vc.size === size && vc.color === color
    ) || null;
};

/**
 * Get images for a specific color selection
 * @param product - The product
 * @param color - Selected color value (optional)
 * @returns Array of image URLs for the selected color
 */
export const getImagesForColor = (
    product: Product,
    color?: string
): string[] => {
    // If no color selected, return default product images
    if (!color) {
        // Fallback: if main images empty, try imageGroups
        if (product.images.length === 0 && product.imageGroups && product.imageGroups.length > 0) {
            const allImages: string[] = [];
            product.imageGroups.forEach(group => {
                if (group.images) allImages.push(...group.images);
            });
            return allImages.length > 0 ? allImages : product.images;
        }
        return product.images;
    }

    // Check if product has imagesByColor mapping
    if (product.imagesByColor && product.imagesByColor[color]) {
        return product.imagesByColor[color];
    }

    // Check variant combination for color-specific images
    if (usesAdvancedVariants(product)) {
        const combinations = product.variantCombinations!.filter(vc => vc.color === color);
        if (combinations.length > 0 && combinations[0].images && combinations[0].images.length > 0) {
            return combinations[0].images;
        }
    }

    // Fallback: Check imageGroups for Image-First products
    if (product.imageGroups && product.imageGroups.length > 0) {
        const group = product.imageGroups.find(g => g.colorValue === color);
        if (group && group.images && group.images.length > 0) {
            return group.images;
        }
    }

    // Final fallback to product images
    return product.images;
};

/**
 * Check if a specific size+color combination is available
 * @param product - The product
 * @param size - Size value
 * @param color - Color value
 * @returns true if combination has stock, false otherwise
 */
export const isVariantAvailable = (
    product: Product,
    size: string,
    color: string
): boolean => {
    if (!usesAdvancedVariants(product)) {
        // Legacy system: check if both size and color exist and are in stock
        const hasSize = product.variants.some(v => v.type === 'size' && v.value === size && v.inStock);
        const hasColor = product.variants.some(v => v.type === 'color' && v.value === color && v.inStock);
        return hasSize && hasColor;
    }

    // Advanced system: check if specific combination exists and has stock
    const combination = getVariantCombination(product, size, color);
    return combination !== null && combination.stock > 0;
};

/**
 * Get the stock count for a specific combination
 * @param product - The product
 * @param size - Size value
 * @param color - Color value
 * @returns Stock count or null if not applicable
 */
export const getVariantStock = (
    product: Product,
    size: string,
    color: string
): number | null => {
    if (!usesAdvancedVariants(product)) {
        return null; // Legacy system doesn't track numeric stock
    }

    const combination = getVariantCombination(product, size, color);
    return combination ? combination.stock : 0;
};
