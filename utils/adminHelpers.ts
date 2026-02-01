/**
 * Helper utilities for Color-First admin workflow
 */

/**
 * Generate a URL-friendly slug from a name
 * @param name - The name to convert to slug
 * @returns Lowercase slug (e.g., "75 CM" → "75cm", "Red" → "red")
 */
export const generateSlug = (name: string): string => {
    return name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '') // Remove invalid chars first
        .replace(/\s+/g, '-')         // Replace spaces with hyphens
        .replace(/-+/g, '-');         // Remove duplicate hyphens
};

/**
 * Sanitize a string for use as a Firebase key (no dots, slashes, etc.)
 * @param key - The unsafe key string
 * @returns Safe string
 */
export const sanitizeKey = (key: string): string => {
    return key.replace(/[./#$\[\]]/g, '-');
};

/**
 * Validate image URL format
 * @param url - The string to check
 * @returns true if valid URL format
 */
export const isValidUrl = (url: string): boolean => {
    try {
        new URL(url);
        return true;
    } catch (_) {
        return false;
    }
};

/**
 * Generate a hex color code from a color name
 * Uses a predefined mapping for common colors, generates unique hash for others
 * @param colorName - The color name (e.g., "Red", "Black", "Nude")
 * @returns Hex color code (e.g., "#FF0000")
 */
export const generateColorValue = (colorName: string): string => {
    const colorMap: Record<string, string> = {
        // Common colors
        'red': '#FF0000',
        'black': '#000000',
        'white': '#FFFFFF',
        'blue': '#0000FF',
        'green': '#00FF00',
        'yellow': '#FFFF00',
        'pink': '#FFC0CB',
        'purple': '#800080',
        'orange': '#FFA500',
        'brown': '#A52A2A',
        'gray': '#808080',
        'grey': '#808080',

        // Innerwear-specific colors
        'nude': '#D4A373',
        'beige': '#F5F5DC',
        'cream': '#FFFDD0',
        'navy': '#000080',
        'maroon': '#800000',
        'burgundy': '#800020',
        'coral': '#FF7F50',
        'peach': '#FFE5B4',
        'mint': '#98FF98',
        'lavender': '#E6E6FA',
    };

    const normalized = colorName.toLowerCase().trim();

    // Return from map if exists
    if (colorMap[normalized]) {
        return colorMap[normalized];
    }

    // Generate unique color from string hash
    let hash = 0;
    for (let i = 0; i < normalized.length; i++) {
        hash = normalized.charCodeAt(i) + ((hash << 5) - hash);
    }

    // Convert hash to hex color
    const color = (hash & 0x00FFFFFF).toString(16).toUpperCase();
    return '#' + '00000'.substring(0, 6 - color.length) + color;
};

/**
 * Generate variant combinations from color/size arrays and stock matrix
 * @param colors - Array of ProductColor objects
 * @param sizes - Array of ProductSize objects  
 * @param stockMatrix - Record mapping "size-color" to stock count
 * @returns Array of VariantCombination objects
 */
export const generateVariantCombinations = (
    colors: Array<{ id: string; name: string; value: string; images: string[] }>,
    sizes: Array<{ id: string; name: string; value: string }>,
    stockMatrix: Record<string, number>
): any[] => {
    const combinations: any[] = [];

    sizes.forEach(size => {
        colors.forEach(color => {
            const matrixKey = `${size.value}-${color.value}`;
            const stock = stockMatrix[matrixKey];

            // Only create combination if stock is defined and > 0
            if (stock !== undefined && stock >= 0) {
                // Sanitize values for the final object to match safeColors/safeSizes
                const safeSize = sanitizeKey(size.value);
                const safeColor = sanitizeKey(color.value);

                combinations.push({
                    id: `var-${safeSize}-${safeColor}`,
                    sku: `${safeSize.toUpperCase()}-${color.name.toUpperCase().replace(/[^A-Z0-9]/g, '')}`,
                    size: safeSize,
                    sizeLabel: size.name,
                    color: safeColor,
                    colorLabel: color.name,
                    stock: stock,
                    images: color.images, // Link images from color
                });
            }
        });
    });

    return combinations;
};
