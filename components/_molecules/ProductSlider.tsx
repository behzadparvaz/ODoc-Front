import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination } from 'swiper/modules';
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
  return (
    <div
      className={`w-full ${className} ${shouldShowMobileMode ? mobileModeMaxWidthClassName + ' mx-auto' : ''}`}
    >
      <Swiper pagination={true} modules={[Pagination]}>
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
    </div>
  );
};
export default ProductSlider;
