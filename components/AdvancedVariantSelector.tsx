import React from 'react';
import { Product } from '../types';
import { getAvailableSizes, getAvailableColors, getSizeLabels, getColorLabels, isVariantAvailable } from '../utils/variantHelpers';

interface AdvancedVariantSelectorProps {
    product: Product;
    type: 'size' | 'color';
    selectedValue: string;
    selectedColor?: string;
    selectedSize?: string;
    onSelect: (value: string) => void;
    label: string;
}

const AdvancedVariantSelector: React.FC<AdvancedVariantSelectorProps> = ({
    product,
    type,
    selectedValue,
    selectedColor,
    selectedSize,
    onSelect,
    label,
}) => {
    // Get ALL values
    const allValues = type === 'size'
        ? getAvailableSizes(product)
        : getAvailableColors(product);

    const labels = type === 'size'
        ? getSizeLabels(product)
        : getColorLabels(product);

    if (allValues.length === 0) return null;

    return (
        <div className="mb-6">
            <h3 className="text-sm font-semibold uppercase mb-3">
                {label}
                {selectedValue && type === 'color' && labels[selectedValue] && (
                    <span className="text-gray-600 font-normal ml-2">
                        — {labels[selectedValue]}
                    </span>
                )}
            </h3>

            <div className="flex flex-wrap gap-2">
                {allValues.map((value) => {
                    const isSelected = selectedValue === value;
                    const displayLabel = labels[value] || value;

                    // CRITICAL FIX: Sizes are ALWAYS available (never disabled)
                    // Only colors are filtered based on selected size
                    let isAvailable = true;

                    if (type === 'color' && selectedSize) {
                        // Showing colors - check if this color has stock for selected size
                        isAvailable = isVariantAvailable(product, selectedSize, value);
                    }
                    // Note: type === 'size' always stays isAvailable = true

                    if (type === 'size') {
                        return (
                            <button
                                key={value}
                                onClick={() => onSelect(value)}
                                className={`min-w-[80px] px-4 py-2 border-2 rounded transition-all ${isSelected
                                        ? 'border-[#F4C430] bg-[#F4C430] text-white font-semibold'
                                        : 'border-gray-300 hover:border-gray-400'
                                    }`}
                            >
                                {displayLabel}
                            </button>
                        );
                    }

                    // Color circles - can be disabled
                    return (
                        <button
                            key={value}
                            onClick={() => isAvailable && onSelect(value)}
                            disabled={!isAvailable}
                            title={displayLabel}
                            className={`w-10 h-10 rounded-full border-2 transition-all relative ${isSelected
                                    ? 'border-[#F4C430] ring-2 ring-[#F4C430] ring-offset-2'
                                    : !isAvailable
                                        ? 'border-gray-300 opacity-40 cursor-not-allowed'
                                        : 'border-gray-300 hover:border-gray-400'
                                }`}
                            style={{ backgroundColor: isAvailable ? value : '#e5e7eb' }}
                        >
                            {!isAvailable && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-full h-0.5 bg-gray-500 rotate-45"></div>
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default AdvancedVariantSelector;
