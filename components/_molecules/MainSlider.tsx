import Slider from '@com/_atoms/Slider';
import { SwiperSlide } from 'swiper/react';
import MainSliderItem from '@com/_atoms/MainSliderItem';

interface Props {
  data: any;
  className?: string;
}
const MainSlider = ({ data, className = '' }: Props) => {
    return (
    <Slider className={className}>
      {data?.map((item, index) => {
        return (
          <SwiperSlide key={index}>
            <MainSliderItem
              title={'item?.title'}
              index={index}
              // imageLink={'item?.imageLink'}
              imageLink={'/'}
              imageUrl={item}
            />
          </SwiperSlide>
        );
      })}
    </Slider>
  );
};
export default MainSlider;
