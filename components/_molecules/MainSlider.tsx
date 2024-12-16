import Slider from '@com/_atoms/Slider';
import { SwiperSlide } from 'swiper/react';
import MainSliderItem from '@com/_atoms/MainSliderItem';

interface Props {
  isLoading?: boolean;
  data: any;
  className?: string;
  autoPlay?: boolean;
}
const MainSlider = ({ data, className = '', autoPlay, isLoading }: Props) => {
  if (isLoading) {
    return (
      <div className="w-full h-[260px] px-4">
        <div className="w-full h-full  rounded-xl bg-surface-secondary animate-pulse"></div>
      </div>
    );
  }

  return (
    <Slider autoPlay={autoPlay} className={className}>
      {data?.map((item, index) => {
        return (
          <SwiperSlide key={index}>
            <MainSliderItem
              title={item?.title}
              index={index}
              imageLink={'/'}
              imageUrl={item?.icon}
            />
          </SwiperSlide>
        );
      })}
    </Slider>
  );
};
export default MainSlider;
