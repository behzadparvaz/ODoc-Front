import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { useState } from 'react';
import {
  mobileModeMaxWidthClassName,
  shouldShowMobileMode,
} from '@configs/ControlMobileView';
import NextImage from '@com/_core/NextImage';
import { SkeletonSvg, toBase64 } from '@utilities/SkeletonSvg';
interface Props {
  className?: string;
}
const ProductSlider = ({ className }: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const mockData = [
    '/static/images/staticImages/priorin.jpg',
    '/static/images/staticImages/phyto.jpg',
    '/static/images/staticImages/chelophen.jpg',
    '/static/images/staticImages/sample-druge.png',
    '/static/images/staticImages/alopexy.webp',
  ];

  return (
    <div
      className={`w-full ${className} ${shouldShowMobileMode ? mobileModeMaxWidthClassName + ' mx-auto' : ''} shadow-md `}
    >
      <Swiper
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
      >
        {mockData?.map((item, index) => {
          return (
            <SwiperSlide>
              <div className="!aspect-w-23 !aspect-h-9">
                <NextImage
                  src={item}
                  alt={'productSlider-' + index}
                  placeholder="blur"
                  blurDataURL={`data:image/svg+xml;base64,${toBase64(SkeletonSvg(192, 192))}`}
                  layout="fill"
                  quality={100}
                  objectFit="contain"
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className="w-full mt-4 [&_.swiper-slide-thumb-active]:border-2  [&_.swiper-slide-thumb-active]:rounded-lg [&_.swiper-slide-thumb-active]:overflow-hidden">
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={8}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
        >
          {mockData?.map((item, index) => {
            return (
              <SwiperSlide>
                <div className="!aspect-w-23 !aspect-h-23">
                  <NextImage
                    src={item}
                    alt={'productSlider-' + index}
                    placeholder="blur"
                    blurDataURL={`data:image/svg+xml;base64,${toBase64(SkeletonSvg(192, 192))}`}
                    layout="fill"
                    quality={100}
                    objectFit="contain"
                  />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};
export default ProductSlider;
