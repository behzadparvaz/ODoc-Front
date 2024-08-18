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
      {data?.map((item, index) => (
        <SwiperSlide key={item.id}>
          <MainSliderItem
            title={item?.title}
            index={index}
            imageLink={item?.imageLink}
            imageUrl={item?.imageUrl}
            key={item?.id}
          />
        </SwiperSlide>
      ))}
    </Slider>
  );
};
export default MainSlider;
