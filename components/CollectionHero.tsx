
import React from 'react';
import { motion } from 'framer-motion';

interface CollectionHeroProps {
    title: string;
    imageUrl: string;
    bgColor?: string;
    objectPosition?: string;
}

const CollectionHero: React.FC<CollectionHeroProps> = ({ title, imageUrl, bgColor = 'bg-gray-200', objectPosition = 'object-center' }) => {
    return (
        <section className={`relative w-full h-[450px] overflow-hidden ${bgColor}`}>
            <motion.div
                initial={{ scale: 1.05, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 w-full h-full"
            >
                <img
                    src={imageUrl}
                    alt={title}
                    className={`w-full h-full object-cover ${objectPosition}`}
                />
            </motion.div>

            {/* Title Overlay */}
            <div className="absolute inset-0 flex items-center px-6 lg:px-12">
                <motion.h1
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="text-5xl lg:text-6xl font-bold text-white drop-shadow-2xl"
                >
                    {title}
                </motion.h1>
            </div>
        </section>
    );
};

export default CollectionHero;
