import React from 'react';
import { ProductColor } from '../../types';
import { Trash2, Plus, ImageIcon } from 'lucide-react';
import { generateColorValue } from '../../utils/adminHelpers';

interface ColorManagerProps {
    colors: ProductColor[];
    onChange: (colors: ProductColor[]) => void;
}

const ColorManager: React.FC<ColorManagerProps> = ({ colors, onChange }) => {

    const handleAddColor = () => {
        const newColor: ProductColor = {
            id: `color-${Date.now()}`,
            name: '',
            value: '',
            images: []
        };
        onChange([...colors, newColor]);
    };

    const handleColorChange = (index: number, field: keyof ProductColor, value: any) => {
        const updated = [...colors];
        updated[index] = { ...updated[index], [field]: value };

        // Auto-generate value when name changes
        if (field === 'name' && value) {
            updated[index].value = generateColorValue(value);
        }

        onChange(updated);
    };

    const handleRemoveColor = (index: number) => {
        onChange(colors.filter((_, i) => i !== index));
    };

    const handleAddImage = (colorIndex: number) => {
        const updated = [...colors];
        updated[colorIndex].images = [...updated[colorIndex].images, ''];
        onChange(updated);
    };

    const handleImageChange = (colorIndex: number, imageIndex: number, value: string) => {
        const updated = [...colors];
        updated[colorIndex].images[imageIndex] = value;
        onChange(updated);
    };

    const handleRemoveImage = (colorIndex: number, imageIndex: number) => {
        const updated = [...colors];
        updated[colorIndex].images = updated[colorIndex].images.filter((_, i) => i !== imageIndex);
        onChange(updated);
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
                <h3 className="text-lg font-semibold">Product Colors</h3>
                <button
                    type="button"
                    onClick={handleAddColor}
                    className="bg-black text-white text-sm px-3 py-1.5 rounded flex items-center gap-1 hover:bg-gray-800"
                >
                    <Plus size={16} /> Add Color
                </button>
            </div>

            {colors.length === 0 && (
                <p className="text-center text-gray-500 text-sm py-6 italic">
                    No colors added yet. Click "Add Color" to start.
                </p>
            )}

            <div className="space-y-4">
                {colors.map((color, colorIndex) => (
                    <div key={color.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <div className="flex items-start gap-3 mb-3">
                            {/* Color Swatch Preview */}
                            <div className="flex-shrink-0 mt-1">
                                <div
                                    className="w-12 h-12 rounded border-2 border-gray-300"
                                    style={{ backgroundColor: color.value || '#CCCCCC' }}
                                    title={color.value}
                                />
                            </div>

                            {/* Color Name Input */}
                            <div className="flex-1">
                                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
                                    Color Name
                                </label>
                                <input
                                    type="text"
                                    className="w-full border p-2 rounded"
                                    placeholder="e.g., Red, Black, Nude"
                                    value={color.name}
                                    onChange={e => handleColorChange(colorIndex, 'name', e.target.value)}
                                />
                                {color.value && (
                                    <p className="text-xs text-gray-500 mt-1">
                                        Auto-generated value: <code className="bg-gray-200 px-1 rounded">{color.value}</code>
                                    </p>
                                )}
                            </div>

                            {/* Delete Color Button */}
                            <button
                                type="button"
                                onClick={() => handleRemoveColor(colorIndex)}
                                className="text-red-500 hover:bg-red-50 p-2 rounded"
                                title="Delete Color"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>

                        {/* Images for this color */}
                        <div className="border-t pt-3 mt-3">
                            <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">
                                Images for {color.name || 'this color'}
                                <span className="text-gray-400 font-normal ml-1">(upload once, used for all sizes)</span>
                            </label>

                            <div className="space-y-2">
                                {color.images.map((img, imgIndex) => (
                                    <div key={imgIndex} className="flex gap-2">
                                        <input
                                            type="text"
                                            className="flex-1 border p-2 rounded text-sm"
                                            placeholder="Image URL..."
                                            value={img}
                                            onChange={e => handleImageChange(colorIndex, imgIndex, e.target.value)}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveImage(colorIndex, imgIndex)}
                                            className="p-2 text-red-500 hover:bg-red-50 rounded"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                ))}

                                <button
                                    type="button"
                                    onClick={() => handleAddImage(colorIndex)}
                                    className="text-xs font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1"
                                >
                                    <ImageIcon size={14} /> Add Image
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ColorManager;
