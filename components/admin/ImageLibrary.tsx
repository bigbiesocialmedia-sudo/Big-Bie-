import React, { useState } from 'react';
import { ColorImageGroup } from '../../types';
import { Plus, Trash2, Image as ImageIcon } from 'lucide-react';
import { generateColorValue } from '../../utils/adminHelpers';

interface ImageLibraryProps {
    imageGroups: ColorImageGroup[];
    onChange: (groups: ColorImageGroup[]) => void;
}

const ImageLibrary: React.FC<ImageLibraryProps> = ({ imageGroups, onChange }) => {
    const [newGroupName, setNewGroupName] = useState('');

    const handleCreateGroup = () => {
        if (!newGroupName.trim()) {
            alert('Please enter a color name');
            return;
        }

        const newGroup: ColorImageGroup = {
            id: `group-${Date.now()}`,
            colorName: newGroupName,
            colorValue: generateColorValue(newGroupName),
            images: []
        };

        onChange([...imageGroups, newGroup]);
        setNewGroupName('');
    };

    const handleDeleteGroup = (groupId: string) => {
        onChange(imageGroups.filter(g => g.id !== groupId));
    };

    const handleAddImageToGroup = (groupId: string) => {
        const updated = imageGroups.map(group => {
            if (group.id === groupId) {
                return { ...group, images: [...group.images, ''] };
            }
            return group;
        });
        onChange(updated);
    };

    const handleImageChange = (groupId: string, imageIndex: number, value: string) => {
        const updated = imageGroups.map(group => {
            if (group.id === groupId) {
                const newImages = [...group.images];
                newImages[imageIndex] = value;
                return { ...group, images: newImages };
            }
            return group;
        });
        onChange(updated);
    };

    const handleRemoveImage = (groupId: string, imageIndex: number) => {
        const updated = imageGroups.map(group => {
            if (group.id === groupId) {
                return { ...group, images: group.images.filter((_, i) => i !== imageIndex) };
            }
            return group;
        });
        onChange(updated);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="border-b pb-3">
                <h3 className="text-lg font-semibold mb-1">Image Library</h3>
                <p className="text-sm text-gray-600">
                    Upload and organize product images by color. Each color group will be available when creating variants.
                </p>
            </div>

            {/* Existing Groups */}
            <div className="space-y-4">
                {imageGroups.map(group => (
                    <div
                        key={group.id}
                        className="bg-gradient-to-r from-gray-50 to-white p-5 rounded-xl border-2 border-gray-200 shadow-sm"
                    >
                        {/* Group Header */}
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                {/* Color Swatch */}
                                <div
                                    className="w-10 h-10 rounded-lg border-2 border-gray-300 shadow-sm"
                                    style={{ backgroundColor: group.colorValue }}
                                    title={group.colorValue}
                                />
                                <div>
                                    <h4 className="font-semibold text-lg">{group.colorName}</h4>
                                    <p className="text-xs text-gray-500">{group.images.length} image(s)</p>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() => handleDeleteGroup(group.id)}
                                className="text-red-500 hover:bg-red-50 p-2 rounded transition"
                                title="Delete Color Group"
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>

                        {/* Images */}
                        <div className="space-y-2">
                            {group.images.map((img, imgIndex) => (
                                <div key={imgIndex} className="flex gap-2">
                                    <input
                                        type="text"
                                        className="flex-1 border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Image URL..."
                                        value={img}
                                        onChange={e => handleImageChange(group.id, imgIndex, e.target.value)}
                                    />
                                    {img && (
                                        <div className="w-12 h-12 flex-shrink-0">
                                            <img
                                                src={img}
                                                alt="Preview"
                                                className="w-full h-full object-cover rounded border border-gray-300"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).style.display = 'none';
                                                }}
                                            />
                                        </div>
                                    )}
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveImage(group.id, imgIndex)}
                                        className="p-2 text-red-500 hover:bg-red-50 rounded"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}

                            <button
                                type="button"
                                onClick={() => handleAddImageToGroup(group.id)}
                                className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1 mt-2"
                            >
                                <ImageIcon size={16} /> Add Image to {group.colorName}
                            </button>
                        </div>
                    </div>
                ))}

                {imageGroups.length === 0 && (
                    <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                        <ImageIcon size={48} className="mx-auto text-gray-400 mb-3" />
                        <p className="text-gray-600 font-medium">No color groups yet</p>
                        <p className="text-sm text-gray-500 mt-1">Create your first color group below to get started</p>
                    </div>
                )}
            </div>

            {/* Create New Group */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                    <Plus size={18} />
                    Create New Color Group
                </h4>
                <div className="flex gap-2">
                    <input
                        type="text"
                        className="flex-1 border border-blue-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Color name (e.g., Red, Black, Purple)"
                        value={newGroupName}
                        onChange={e => setNewGroupName(e.target.value)}
                        onKeyPress={e => e.key === 'Enter' && handleCreateGroup()}
                    />
                    <button
                        type="button"
                        onClick={handleCreateGroup}
                        className="bg-blue-600 text-white px-4 py-2 rounded font-medium hover:bg-blue-700 transition flex items-center gap-2"
                    >
                        <Plus size={18} />
                        Create Group
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ImageLibrary;
