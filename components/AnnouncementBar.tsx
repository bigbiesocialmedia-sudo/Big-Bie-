import React, { useEffect, useRef } from 'react';
import { useAdmin } from '../context/AdminContext';

const AnnouncementBar: React.FC = () => {
    const { announcementBarSettings } = useAdmin();
    const { isEnabled, text, textColor, backgroundColor, speed, direction } = announcementBarSettings;
    const barRef = useRef<HTMLDivElement>(null);

    // Update global height variable for Header to offset correctly
    useEffect(() => {
        const updateHeight = () => {
            if (isEnabled && barRef.current) {
                const height = barRef.current.offsetHeight;
                document.documentElement.style.setProperty('--announcement-height', `${height}px`);
            } else {
                document.documentElement.style.setProperty('--announcement-height', '0px');
            }
        };

        updateHeight();
        window.addEventListener('resize', updateHeight);

        const observer = new MutationObserver(updateHeight);
        if (barRef.current) {
            observer.observe(barRef.current, { attributes: true, childList: true, subtree: true });
        }

        return () => {
            window.removeEventListener('resize', updateHeight);
            observer.disconnect();
            document.documentElement.style.setProperty('--announcement-height', '0px');
        };
    }, [isEnabled, text]);

    if (!isEnabled) return null;

    // Map speed to animation duration
    const speedMap = {
        slow: '40s',
        normal: '25s',
        fast: '15s'
    };

    return (
        <div
            ref={barRef}
            className="fixed top-0 left-0 w-full overflow-hidden z-[60] py-2 flex items-center border-b border-white/10"
            style={{ backgroundColor, color: textColor }}
        >
            <style>
                {`
                @keyframes marquee-rtl {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                @keyframes marquee-ltr {
                    0% { transform: translateX(-50%); }
                    100% { transform: translateX(0); }
                }
                .marquee-content {
                    display: flex;
                    width: max-content;
                    animation: ${direction === 'rtl' ? 'marquee-rtl' : 'marquee-ltr'} ${speedMap[speed] || speedMap.normal} linear infinite;
                }
                .marquee-content:hover {
                    animation-play-state: paused;
                }
                .marquee-item {
                    display: flex;
                    align-items: center;
                    padding: 0 30px;
                    white-space: nowrap;
                    font-size: 13px;
                    font-weight: 800;
                    letter-spacing: 0.05em;
                    text-transform: uppercase;
                }
                .separator {
                    margin-left: 30px;
                    opacity: 0.4;
                }
                `}
            </style>

            <div className="flex-1 overflow-hidden pointer-events-none">
                <div className="marquee-content">
                    {/* Render 10 items in the first half */}
                    {[...Array(10)].map((_, i) => (
                        <div key={i} className="marquee-item">
                            {text}
                            <span className="separator">•</span>
                        </div>
                    ))}
                    {/* Render 10 items in the second half for seamless loop */}
                    {[...Array(10)].map((_, i) => (
                        <div key={`dup-${i}`} className="marquee-item">
                            {text}
                            <span className="separator">•</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AnnouncementBar;
