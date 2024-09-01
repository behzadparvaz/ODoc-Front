import { useQuery } from 'react-query';
import { GetSliderAndCarouselData } from './homePage';

export const useGetSliderAndCarouselData = () => {
  const { data, isLoading } = useQuery(['getSliderAndCarouselData'], () =>
  GetSliderAndCarouselData(),
  );
  return { data: data as any, isLoading };
};
