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
  data: any;
}
const ProductSlider = ({ className, data }: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <div
      className={`w-full ${className} ${shouldShowMobileMode ? mobileModeMaxWidthClassName + ' mx-auto' : ''}`}
    >
      <Swiper
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
      >
        {data?.map((item, index) => {
          return (
            <SwiperSlide key={index}>
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
          {data?.map((item, index) => {
            return (
              <SwiperSlide key={index}>
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
