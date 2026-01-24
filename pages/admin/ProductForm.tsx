import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import { Product, ProductVariant } from '../../types';
import { generateSlug } from '../../data/products';
import { Save, Plus, Trash2, ArrowLeft, Image as ImageIcon } from 'lucide-react';

const CATEGORIES = ['Bras', 'Panties', 'Slips', 'Kids'];
const VARIANT_TYPES = ['size', 'color'];

const ProductForm: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { products, addProduct, updateProduct, subCollections } = useAdmin();

    const isEditMode = Boolean(id);
    const existingProduct = products.find(p => p.id === id);

    // Form State
    const [name, setName] = useState('');
    const [category, setCategory] = useState(CATEGORIES[0]);
    const [subCollection, setSubCollection] = useState('');
    const [price, setPrice] = useState('');
    const [originalPrice, setOriginalPrice] = useState('');
    const [description, setDescription] = useState('');
    const [rating, setRating] = useState('0');
    const [reviewCount, setReviewCount] = useState('0');
    const [images, setImages] = useState<string[]>(['']);

    // Complex Variant State
    const [variants, setVariants] = useState<ProductVariant[]>([]);

    useEffect(() => {
        if (isEditMode && existingProduct) {
            setName(existingProduct.name);
            setCategory(existingProduct.category);
            setSubCollection(existingProduct.subCollection || '');
            setPrice(existingProduct.price.toString());
            setOriginalPrice(existingProduct.originalPrice?.toString() || '');
            setDescription(existingProduct.description);
            setRating(existingProduct.rating.toString());
            setReviewCount(existingProduct.reviewCount.toString());
            setImages(existingProduct.images.length > 0 ? existingProduct.images : ['']);
            setVariants(existingProduct.variants);
        }
    }, [isEditMode, existingProduct]);

    const handleAddImage = () => setImages([...images, '']);
    const handleImageChange = (index: number, value: string) => {
        const newImages = [...images];
        newImages[index] = value;
        setImages(newImages);
    };
    const handleRemoveImage = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
    };

    // Variant Handlers
    const handleAddVariant = () => {
        setVariants([
            ...variants,
            {
                id: `var-${Date.now()}`,
                type: 'size', // Default
                name: '',
                value: '',
                inStock: true,
                images: []
            }
        ]);
    };

    const handleRemoveVariant = (index: number) => {
        setVariants(variants.filter((_, i) => i !== index));
    };

    const handleVariantChange = (index: number, field: keyof ProductVariant, value: any) => {
        const newVariants = [...variants];
        newVariants[index] = { ...newVariants[index], [field]: value };
        setVariants(newVariants);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const productData: Product = {
            id: isEditMode ? id! : `prod-${Date.now()}`,
            name,
            slug: isEditMode ? existingProduct!.slug : generateSlug(name),
            category,
            subCollection,
            price: parseFloat(price),
            originalPrice: originalPrice ? parseFloat(originalPrice) : undefined,
            description,
            rating: parseFloat(rating),
            reviewCount: parseInt(reviewCount),
            images: images.filter(img => img.trim() !== ''),
            variants: variants
        };

        try {
            if (isEditMode) {
                await updateProduct(productData);
            } else {
                await addProduct(productData);
            }
            // Only navigate AFTER the database confirms success
            navigate('/admin/inventory');
        } catch (error) {
            console.error("Failed to save product:", error);
            alert("Failed to save product. Please try again.");
        }
    };

    return (
        <div className="max-w-4xl mx-auto pb-20">
            <div className="flex items-center gap-4 mb-6">
                <button
                    onClick={() => navigate('/admin/inventory')}
                    className="p-2 hover:bg-gray-100 rounded-full"
                >
                    <ArrowLeft size={24} />
                </button>
                <h1 className="text-3xl font-bold">{isEditMode ? 'Edit Product' : 'Add New Product'}</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">

                {/* Basic Info */}
                <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
                    <h2 className="text-xl font-semibold border-b pb-2">Basic Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Product Name</label>
                            <input
                                required
                                className="w-full border p-2 rounded"
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Category</label>
                            <select
                                className="w-full border p-2 rounded"
                                value={category}
                                onChange={e => {
                                    setCategory(e.target.value);
                                    setSubCollection(''); // Reset sub-collection on category change
                                }}
                            >
                                <option value="">Select Category</option>
                                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>

                        {/* Sub-Collection Dropdown (Dynamic) */}
                        {category && subCollections[category] && subCollections[category].length > 0 && (
                            <div>
                                <label className="block text-sm font-medium mb-1">Sub-Collection</label>
                                <select
                                    className="w-full border p-2 rounded"
                                    value={subCollection}
                                    onChange={e => setSubCollection(e.target.value)}
                                >
                                    <option value="">Select Sub-Collection</option>
                                    {subCollections[category].map(sub => (
                                        <option key={sub} value={sub}>{sub}</option>
                                    ))}
                                </select>
                            </div>
                        )}
                        <div>
                            <label className="block text-sm font-medium mb-1">Price</label>
                            <input
                                required type="number" step="0.01"
                                className="w-full border p-2 rounded"
                                value={price} onChange={e => setPrice(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Original Price (Optional)</label>
                            <input
                                type="number" step="0.01"
                                className="w-full border p-2 rounded"
                                value={originalPrice} onChange={e => setOriginalPrice(e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea
                            required rows={4}
                            className="w-full border p-2 rounded"
                            value={description} onChange={e => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Rating (0-5)</label>
                            <input
                                type="number" step="0.1" max="5"
                                className="w-full border p-2 rounded"
                                value={rating} onChange={e => setRating(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Review Count</label>
                            <input
                                type="number"
                                className="w-full border p-2 rounded"
                                value={reviewCount} onChange={e => setReviewCount(e.target.value)}
                            />
                        </div>
                    </div>
                </section>

                {/* Images */}
                <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
                    <h2 className="text-xl font-semibold border-b pb-2">Global Images</h2>
                    <div className="space-y-2">
                        {images.map((img, index) => (
                            <div key={index} className="flex gap-2">
                                <input
                                    className="flex-1 border p-2 rounded"
                                    placeholder="Image URL (e.g., https://source.unsplash.com/...)"
                                    value={img}
                                    onChange={e => handleImageChange(index, e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveImage(index)}
                                    className="p-2 text-red-500 hover:bg-red-50 rounded"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={handleAddImage}
                            className="text-sm font-medium text-[#F4C430] hover:text-[#d4a010] flex items-center gap-1"
                        >
                            <Plus size={16} /> Add Image URL
                        </button>
                    </div>
                </section>

                {/* Variants */}
                <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
                    <div className="flex justify-between items-center border-b pb-2">
                        <h2 className="text-xl font-semibold">Product Variants</h2>
                        <button
                            type="button"
                            onClick={handleAddVariant}
                            className="bg-black text-white text-sm px-3 py-1.5 rounded flex items-center gap-1 hover:bg-gray-800"
                        >
                            <Plus size={16} /> Add Variant
                        </button>
                    </div>

                    <div className="space-y-6">
                        {variants.map((variant, index) => (
                            <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200 relative">
                                <button
                                    type="button"
                                    onClick={() => handleRemoveVariant(index)}
                                    className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                                >
                                    <Trash2 size={18} />
                                </button>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Type</label>
                                        <select
                                            className="w-full border p-1 rounded"
                                            value={variant.type}
                                            onChange={e => handleVariantChange(index, 'type', e.target.value)}
                                        >
                                            {VARIANT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Name (Label)</label>
                                        <input
                                            className="w-full border p-1 rounded"
                                            placeholder="e.g. Red / XL"
                                            value={variant.name}
                                            onChange={e => handleVariantChange(index, 'name', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Value (ID/Code)</label>
                                        <input
                                            className="w-full border p-1 rounded"
                                            placeholder="e.g. #FF0000 / xl"
                                            value={variant.value}
                                            onChange={e => handleVariantChange(index, 'value', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Stock</label>
                                        <label className="flex items-center gap-2 cursor-pointer mt-1.5">
                                            <input
                                                type="checkbox"
                                                checked={variant.inStock}
                                                onChange={e => handleVariantChange(index, 'inStock', e.target.checked)}
                                            />
                                            <span className="text-sm">In Stock</span>
                                        </label>
                                    </div>
                                </div>

                                {/* Variant Images */}
                                <div className="mt-4 border-t pt-2">
                                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">Variant Specific Images</label>
                                    <div className="space-y-2">
                                        {(variant.images || []).map((img, imgIndex) => (
                                            <div key={imgIndex} className="flex gap-2">
                                                <input
                                                    className="flex-1 border p-1 rounded text-sm"
                                                    placeholder="Variant Image URL..."
                                                    value={img}
                                                    onChange={e => {
                                                        const newVariants = [...variants];
                                                        const currentImages = newVariants[index].images || [];
                                                        currentImages[imgIndex] = e.target.value;
                                                        newVariants[index].images = currentImages;
                                                        setVariants(newVariants);
                                                    }}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const newVariants = [...variants];
                                                        newVariants[index].images = (newVariants[index].images || []).filter((_, i) => i !== imgIndex);
                                                        setVariants(newVariants);
                                                    }}
                                                    className="p-1 text-red-500 hover:bg-red-50 rounded"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const newVariants = [...variants];
                                                newVariants[index].images = [...(newVariants[index].images || []), ''];
                                                setVariants(newVariants);
                                            }}
                                            className="text-xs font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1"
                                        >
                                            <ImageIcon size={14} /> Add Variant Image
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {variants.length === 0 && (
                            <p className="text-center text-gray-500 text-sm py-4 italic">No variants added yet.</p>
                        )}
                    </div>
                </section>

                <div className="sticky bottom-4">
                    <button
                        type="submit"
                        className="w-full bg-[#F4C430] text-black font-bold text-lg py-4 rounded-xl shadow-lg hover:bg-[#E5B520] transition-transform active:scale-95 flex justify-center items-center gap-2"
                    >
                        <Save size={24} />
                        Save Product
                    </button>
                </div>

            </form>
        </div>
    );
};

export default ProductForm;
