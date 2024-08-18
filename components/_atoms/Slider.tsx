import React, { ReactNode, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';

interface Props {
  children: ReactNode;
  className?: string;
}

export default function Slider({ children, className }: Props) {
  const swiperRef = useRef<any>(null);
  useEffect(() => {
    const setSwiperAutoPlay = () => {
      if (swiperRef.current) {
        const autoPlay = new Promise((res) => {
          res(() => {
            swiperRef.current.params.loop = true;
            swiperRef.current.params.autoplay = {
              delay: 5000,
              disableOnInteraction: false,
            };
          });
        });
        autoPlay.then(() => {
          swiperRef?.current?.autoplay?.start();
        });
      }
    };
    window.addEventListener('load', setSwiperAutoPlay);
    return () => window.removeEventListener('load', setSwiperAutoPlay);
  }, []);
  return (
    <>
      <Swiper
        dir="rtl"
        slidesPerView={1}
        spaceBetween={24}
        loop={true}
        roundLengths={true}
        autoplay={false}
        className="w-full"
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {children}
      </Swiper>
    </>
  );
}
