import React, { useState } from 'react';
import { ColorImageGroup } from '../../types';
import { Plus, Trash2 } from 'lucide-react';

interface VariantEntry {
    id: string;
    colorGroupId: string;
    sizes: string;        // Comma-separated: "75, 80, 85"
    stocks: string;       // Comma-separated: "10, 15, 8"
}

interface SimpleVariantCreatorProps {
    imageGroups: ColorImageGroup[];
    variants: VariantEntry[];
    onChange: (variants: VariantEntry[]) => void;
}

const SimpleVariantCreator: React.FC<SimpleVariantCreatorProps> = ({
    imageGroups,
    variants,
    onChange
}) => {
    const handleAddVariant = () => {
        if (imageGroups.length === 0) {
            alert('Please create at least one color group first');
            return;
        }

        const newVariant: VariantEntry = {
            id: `variant-${Date.now()}`,
            colorGroupId: imageGroups[0].id,
            sizes: '',
            stocks: ''
        };

        onChange([...variants, newVariant]);
    };

    const handleRemoveVariant = (variantId: string) => {
        onChange(variants.filter(v => v.id !== variantId));
    };

    const handleVariantChange = (variantId: string, field: keyof VariantEntry, value: string) => {
        const updated = variants.map(v => {
            if (v.id === variantId) {
                return { ...v, [field]: value };
            }
            return v;
        });
        onChange(updated);
    };

    const getSelectedGroup = (colorGroupId: string) => {
        return imageGroups.find(g => g.id === colorGroupId);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-3">
                <div>
                    <h3 className="text-lg font-semibold mb-1">Product Variants</h3>
                    <p className="text-sm text-gray-600">
                        Select a color group and add sizes with stock quantities
                    </p>
                </div>
                <button
                    type="button"
                    onClick={handleAddVariant}
                    className="bg-black text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-gray-800 transition"
                    disabled={imageGroups.length === 0}
                >
                    <Plus size={18} />
                    Add Variant
                </button>
            </div>

            {/* Guide */}
            {imageGroups.length === 0 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                    <p className="text-yellow-800 font-medium">
                        ⚠️ Please create color groups in the Image Library section first
                    </p>
                </div>
            )}

            {/* Variant Entries */}
            <div className="space-y-4">
                {variants.map((variant, index) => {
                    const selectedGroup = getSelectedGroup(variant.colorGroupId);

                    return (
                        <div
                            key={variant.id}
                            className="bg-white border-2 border-gray-200 rounded-xl p-5 shadow-sm relative"
                        >
                            {/* Delete Button */}
                            <button
                                type="button"
                                onClick={() => handleRemoveVariant(variant.id)}
                                className="absolute top-3 right-3 text-red-500 hover:bg-red-50 p-2 rounded transition"
                            >
                                <Trash2 size={18} />
                            </button>

                            <div className="pr-12">
                                <h4 className="font-semibold mb-4 text-gray-700">Variant #{index + 1}</h4>

                                {/* Color Group Selection */}
                                <div className="mb-4">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Select Color Group
                                    </label>
                                    <select
                                        className="w-full border-2 border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium"
                                        value={variant.colorGroupId}
                                        onChange={e => handleVariantChange(variant.id, 'colorGroupId', e.target.value)}
                                    >
                                        {imageGroups.map(group => (
                                            <option key={group.id} value={group.id}>
                                                {group.colorName} ({group.images.length} images)
                                            </option>
                                        ))}
                                    </select>

                                    {/* Image Preview */}
                                    {selectedGroup && selectedGroup.images.length > 0 && (
                                        <div className="mt-3 flex gap-2 flex-wrap">
                                            <span className="text-xs text-gray-600 font-medium mr-2">Linked images:</span>
                                            {selectedGroup.images.slice(0, 4).map((img, idx) => (
                                                <img
                                                    key={idx}
                                                    src={img}
                                                    alt={`${selectedGroup.colorName} ${idx + 1}`}
                                                    className="w-12 h-12 object-cover rounded border border-gray-300"
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).style.display = 'none';
                                                    }}
                                                />
                                            ))}
                                            {selectedGroup.images.length > 4 && (
                                                <div className="w-12 h-12 bg-gray-100 rounded border border-gray-300 flex items-center justify-center text-xs text-gray-600">
                                                    +{selectedGroup.images.length - 4}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Sizes Input */}
                                <div className="mb-4">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Sizes (comma-separated)
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full border-2 border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="e.g., 75, 80, 85 or S, M, L, XL"
                                        value={variant.sizes}
                                        onChange={e => handleVariantChange(variant.id, 'sizes', e.target.value)}
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        Separate each size with a comma
                                    </p>
                                </div>

                                {/* Stock Input */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Stock Quantities (same order as sizes)
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full border-2 border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="e.g., 10, 15, 8"
                                        value={variant.stocks}
                                        onChange={e => handleVariantChange(variant.id, 'stocks', e.target.value)}
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        Enter stock for each size in the same order
                                    </p>
                                </div>

                                {/* Preview Summary */}
                                {variant.sizes && variant.stocks && (
                                    <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
                                        <p className="text-xs font-semibold text-blue-900 mb-2">Preview:</p>
                                        <div className="text-sm text-blue-800">
                                            {variant.sizes.split(',').map((size, idx) => {
                                                const stocks = variant.stocks.split(',');
                                                const stock = stocks[idx]?.trim() || '?';
                                                return (
                                                    <span key={idx} className="inline-block bg-white px-2 py-1 rounded mr-2 mb-1 border border-blue-200">
                                                        {selectedGroup?.colorName} • {size.trim()} • Stock: {stock}
                                                    </span>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}

                {variants.length === 0 && imageGroups.length > 0 && (
                    <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                        <p className="text-gray-600 font-medium">No variants added yet</p>
                        <p className="text-sm text-gray-500 mt-1">Click "Add Variant" to create your first variant</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SimpleVariantCreator;
export type { VariantEntry };
