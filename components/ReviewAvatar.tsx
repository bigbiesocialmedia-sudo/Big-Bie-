import React from 'react';

interface ReviewAvatarProps {
    name: string;
    size?: 'sm' | 'md' | 'lg';
}

const COLORS = [
    'bg-blue-500',
    'bg-red-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-teal-500',
];

const ReviewAvatar: React.FC<ReviewAvatarProps> = ({ name, size = 'md' }) => {
    // Extract initials
    const nameParts = name.trim().split(' ');
    let initials = '';

    if (nameParts.length >= 2) {
        initials = (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase();
    } else if (nameParts.length === 1 && nameParts[0].length > 0) {
        initials = nameParts[0].substring(0, 2).toUpperCase();
    } else {
        initials = '??';
    }

    // Stable color based on name
    const colorIndex = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % COLORS.length;
    const bgColor = COLORS[colorIndex];

    const sizeClasses = {
        sm: 'w-8 h-8 text-xs',
        md: 'w-12 h-12 text-base',
        lg: 'w-16 h-16 text-xl',
    };

    return (
        <div className={`${bgColor} ${sizeClasses[size]} rounded-full flex items-center justify-center text-white font-bold shadow-sm whitespace-nowrap`}>
            {initials}
        </div>
    );
};

export default ReviewAvatar;
