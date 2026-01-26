import React from 'react';
import { ProductSize } from '../../types';
import { Trash2, Plus } from 'lucide-react';
import { generateSlug } from '../../utils/adminHelpers';

interface SizeManagerProps {
    sizes: ProductSize[];
    onChange: (sizes: ProductSize[]) => void;
}

const SizeManager: React.FC<SizeManagerProps> = ({ sizes, onChange }) => {

    const handleAddSize = () => {
        const newSize: ProductSize = {
            id: `size-${Date.now()}`,
            name: '',
            value: ''
        };
        onChange([...sizes, newSize]);
    };

    const handleSizeChange = (index: number, name: string) => {
        const updated = [...sizes];
        updated[index] = {
            ...updated[index],
            name: name,
            value: generateSlug(name) // Auto-generate value from name
        };
        onChange(updated);
    };

    const handleRemoveSize = (index: number) => {
        onChange(sizes.filter((_, i) => i !== index));
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
                <h3 className="text-lg font-semibold">Available Sizes</h3>
                <button
                    type="button"
                    onClick={handleAddSize}
                    className="bg-black text-white text-sm px-3 py-1.5 rounded flex items-center gap-1 hover:bg-gray-800"
                >
                    <Plus size={16} /> Add Size
                </button>
            </div>

            {sizes.length === 0 && (
                <p className="text-center text-gray-500 text-sm py-6 italic">
                    No sizes added yet. Click "Add Size" to start.
                </p>
            )}

            <div className="space-y-2">
                {sizes.map((size, index) => (
                    <div key={size.id} className="flex items-center gap-3 bg-gray-50 p-3 rounded border border-gray-200">
                        <div className="flex-1">
                            <input
                                type="text"
                                className="w-full border p-2 rounded"
                                placeholder="e.g., 75 CM, 80 CM, XL, XXL"
                                value={size.name}
                                onChange={e => handleSizeChange(index, e.target.value)}
                            />
                            {size.value && (
                                <p className="text-xs text-gray-500 mt-1">
                                    Auto-generated value: <code className="bg-gray-200 px-1 rounded">{size.value}</code>
                                </p>
                            )}
                        </div>

                        <button
                            type="button"
                            onClick={() => handleRemoveSize(index)}
                            className="text-red-500 hover:bg-red-50 p-2 rounded"
                            title="Delete Size"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SizeManager;
