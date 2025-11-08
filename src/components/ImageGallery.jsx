import React from 'react';
import { asserts } from '../assets/assets';


function ImageGallery({hotelImages}) {
    const mainImage = hotelImages[0];                  // First 
    const smallImages = hotelImages.slice(1, 5);       // Next 4 small images
    const extraCount = hotelImages.length - 5;         // Count beyond the fifth

    return (
        <div className="grid md:grid-cols-2 grid-cols-1 mt-3 rounded-md overflow-hidden">
            {/* Main Image */}
            <img
                src={mainImage}
                alt="Main Hotel"
                className="w-full h-64 object-cover object-center"
            />

            {/* 4 Small Images */}
            <div className="grid grid-cols-2">
                {smallImages.map((img, index) => {
                    const isLast = index === smallImages.length - 1;
                    return (
                        <div key={index} className="w-full h-32 relative">
                            <img
                                src={img}
                                alt={`Hotel ${index + 2}`}
                                className="w-full h-full object-cover object-center"
                            />

                            {/* Show overlay only on last image if extra images exist */}
                            {isLast && extraCount > 0 && (
                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                    <span className="text-white text-2xl font-semibold">
                                        {extraCount}+
                                    </span>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default ImageGallery;
