"use client";

import React, { useState } from "react";
import Image from "next/image";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

interface CarouselProps {
  images: string[];
}

export const Carousel = ({ images }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  if (!images || images.length === 0) return null;

  return (
    <div className="relative w-full group">
      {/* Main Image Container */}
      <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] rounded-2xl overflow-hidden relative shadow-lg bg-black/5">
        <Image
          src={images[currentIndex]}
          alt={`Slide ${currentIndex}`}
          fill
          className="object-contain duration-500 ease-in-out" // Object-contain prevents cropping
          priority
        />
        
        {/* Left Arrow */}
        {images.length > 1 && (
          <div
            className="hidden group-hover:block absolute top-[50%] -translate-y-[50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer hover:bg-black/40 transition-all"
            onClick={prevSlide}
          >
            <AiOutlineLeft size={24} />
          </div>
        )}
        
        {/* Right Arrow */}
        {images.length > 1 && (
          <div
            className="hidden group-hover:block absolute top-[50%] -translate-y-[50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer hover:bg-black/40 transition-all"
            onClick={nextSlide}
          >
            <AiOutlineRight size={24} />
          </div>
        )}
      </div>

      {/* Thumbnails / Dots */}
      {images.length > 1 && (
         <div className="flex justify-center py-4 gap-2">
            {images.map((img, slideIndex) => (
            <div
                key={slideIndex}
                className={`transition-all duration-300 w-2 h-2 rounded-full cursor-pointer ${
                  currentIndex === slideIndex
                  ? "bg-primary w-6" // Active dot is wider
                  : "bg-muted-foreground/30 hover:bg-primary/50"
                  }`}
                onClick={() => goToSlide(slideIndex)}
            />
            ))}
        </div>
      )}
    </div>
  );
};
