import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselItem {
  id: number;
  title: string;
  image: string;
}

interface CarouselProps {
  items: CarouselItem[];
  itemsToShow?: number;
  onSelectItem?: (item: CarouselItem) => void;
  selectedItemId?: number;
}

const Carousel: React.FC<CarouselProps> = ({
  items,
  itemsToShow = 3,
  onSelectItem,
  selectedItemId
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const maxIndex = Math.max(0, items.length - itemsToShow);

  const nextSlide = () => {
    setActiveIndex(prev => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setActiveIndex(prev => Math.max(prev - 1, 0));
  };

  // Auto rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prev => {
        const next = prev + 1;
        return next > maxIndex ? 0 : next;
      });
    }, 5000);
    
    return () => clearInterval(interval);
  }, [maxIndex]);

  return (
    <div className="relative w-full">
      <div className="overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${activeIndex * (100 / itemsToShow)}%)` }}
        >
          {items.map((item) => {
            const isSelected = item.id === selectedItemId;
            return (
              <div 
                key={item.id}
                className={`min-w-[${100 / itemsToShow}%] px-2`}
                onClick={() => onSelectItem && onSelectItem(item)}
              >
                <div 
                  className={`
                    relative h-24 rounded overflow-hidden cursor-pointer
                    border-2 transition-all duration-300
                    ${isSelected ? 'border-crt-cyan animate-glow' : 'border-crt-gray'} 
                  `}
                >
                  <img 
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover opacity-50"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="font-retro text-xs text-center text-white">{item.title}</h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Navigation arrows */}
      {activeIndex > 0 && (
        <button 
          onClick={prevSlide}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 text-crt-green z-10"
          aria-label="Previous"
        >
          <ChevronLeft size={20} />
        </button>
      )}
      
      {activeIndex < maxIndex && (
        <button 
          onClick={nextSlide}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 text-crt-green z-10"
          aria-label="Next"
        >
          <ChevronRight size={20} />
        </button>
      )}
      
      {/* Indicators */}
      <div className="flex justify-center mt-2 gap-1">
        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-2 h-2 rounded-full ${
              activeIndex === index ? 'bg-crt-green' : 'bg-crt-gray'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;