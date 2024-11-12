import React, { ReactNode, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

interface Props {
  children: ReactNode;
  className?: string;
  autoPlay?: boolean;
  delay?: number;
}

export default function Slider({
  children,
  className,
  autoPlay = false,
  delay = 3000,
}: Props) {
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    const setSwiperAutoPlay = () => {
      if (swiperRef.current && autoPlay) {
        swiperRef.current.params.loop = true;
        swiperRef.current.params.autoplay = {
          delay: delay || 5000,
          disableOnInteraction: false,
        };
        swiperRef.current.autoplay.start();
      }
    };

    window.addEventListener('load', setSwiperAutoPlay);
    return () => window.removeEventListener('load', setSwiperAutoPlay);
  }, [autoPlay]); // Add autoPlay as a dependency

  return (
    <div className={className}>
      <Swiper
        dir="rtl"
        slidesPerView={1}
        spaceBetween={24}
        loop={true}
        roundLengths={true}
        autoplay={
          autoPlay
            ? {
                delay: delay || 5000, // Delay between slides in milliseconds
                disableOnInteraction: false, // Continue autoplay after user interactions
              }
            : false
        } // Set autoplay to false if autoPlay prop is not true
        className="w-full"
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Navigation, Autoplay]}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {children}
      </Swiper>
    </div>
  );
}
