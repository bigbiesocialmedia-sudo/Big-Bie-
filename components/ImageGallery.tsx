import React, { useState } from 'react';

interface ImageGalleryProps {
    images: string[];
    productName: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, productName }) => {
    const [selectedImage, setSelectedImage] = useState(0);

    return (
        <div className="flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible pb-2 md:pb-0 w-full md:w-24 scrollbar-hide">
                {images.map((image, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`flex-shrink-0 w-20 md:w-full border-2 rounded-lg overflow-hidden transition-all ${selectedImage === index
                            ? 'border-[#F4C430] shadow-md'
                            : 'border-gray-200 hover:border-gray-300'
                            }`}
                    >
                        <img
                            src={image}
                            alt={`${productName} thumbnail ${index + 1}`}
                            className="w-full h-20 md:h-24 object-cover"
                        />
                    </button>
                ))}
            </div>

            {/* Main Image Display */}
            <div className="flex-1 bg-gray-100 rounded-lg overflow-hidden relative group">
                <img
                    src={images[selectedImage]}
                    alt={productName}
                    className="w-full h-[400px] md:h-[600px] object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </div>
        </div>
    );
};

export default ImageGallery;
