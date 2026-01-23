import React from 'react';
import { ProductVariant } from '../types';

interface VariantSelectorProps {
    variants: ProductVariant[];
    type: 'size' | 'color';
    selectedValue: string;
    onSelect: (value: string) => void;
    label: string;
}

const VariantSelector: React.FC<VariantSelectorProps> = ({
    variants,
    type,
    selectedValue,
    onSelect,
    label,
}) => {
    const filteredVariants = variants.filter((v) => v.type === type);

    if (filteredVariants.length === 0) return null;

    return (
        <div className="mb-6">
            <h3 className="text-sm font-semibold uppercase mb-3">
                {label}
                {selectedValue && type === 'color' && (
                    <span className="text-gray-600 font-normal ml-2">
                        — {filteredVariants.find((v) => v.value === selectedValue)?.name}
                    </span>
                )}
            </h3>

            <div className="flex flex-wrap gap-2">
                {filteredVariants.map((variant) => {
                    const isSelected = selectedValue === variant.value;
                    const isOutOfStock = !variant.inStock;

                    if (type === 'size') {
                        return (
                            <button
                                key={variant.id}
                                onClick={() => !isOutOfStock && onSelect(variant.value)}
                                disabled={isOutOfStock}
                                className={`min-w-[80px] px-4 py-2 border-2 rounded transition-all ${isSelected
                                        ? 'border-[#F4C430] bg-[#F4C430] text-white font-semibold'
                                        : isOutOfStock
                                            ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed line-through'
                                            : 'border-gray-300 hover:border-gray-400'
                                    }`}
                            >
                                {variant.name}
                            </button>
                        );
                    }

                    // Color variant
                    return (
                        <button
                            key={variant.id}
                            onClick={() => !isOutOfStock && onSelect(variant.value)}
                            disabled={isOutOfStock}
                            title={variant.name}
                            className={`w-10 h-10 rounded-full border-2 transition-all ${isSelected
                                    ? 'border-[#F4C430] ring-2 ring-[#F4C430] ring-offset-2'
                                    : isOutOfStock
                                        ? 'border-gray-300 opacity-40 cursor-not-allowed'
                                        : 'border-gray-300 hover:border-gray-400'
                                } ${isOutOfStock ? 'relative' : ''}`}
                            style={{ backgroundColor: isOutOfStock ? '#e5e7eb' : variant.value }}
                        >
                            {isOutOfStock && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-full h-0.5 bg-gray-400 rotate-45"></div>
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default VariantSelector;
