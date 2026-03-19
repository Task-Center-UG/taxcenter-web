"use client";

import React, { useCallback, useState, useEffect } from "react";
import Image from "next/image";

interface CarouselProps {
  images: string[];
}

const CarouselAgenda: React.FC<CarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(1);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    const interval = setInterval(goToNext, 8000); 
    return () => clearInterval(interval);
  }, [goToNext]);

  const handleManualChange = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative">
      <div>
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {images.map((image, index) => (
            <div key={index} className="w-full flex-shrink-0 mx-4">
              <Image
                src={image}
                alt={`carousel-image-${index}`}
                layout="responsive"
                width={1200}
                height={500}
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Manual Slide Controls */}
      <div className="absolute top-1/2 left-0 right-0 flex justify-between transform -translate-y-1/2 px-4">
        <button
          className=" -translate-y-1/2 left-2 md:left-4 bg-[#868686] bg-opacity-50 hover:bg-[#626262] text-white hover:text-yellow-300 rounded-full px-4 py-2 shadow-md z-30 cursor-pointer transition-colors duration-300"
          onClick={() => handleManualChange((currentIndex - 1 + images.length) % images.length)}
        >
          &lt;
        </button>
        <button
          className=" -translate-y-1/2 left-2 md:left-4 bg-[#868686] bg-opacity-50 hover:bg-[#626262] text-white hover:text-yellow-300 rounded-full px-4 py-2 shadow-md z-30 cursor-pointer transition-colors duration-300"
          onClick={() => handleManualChange((currentIndex + 1) % images.length)}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default CarouselAgenda;