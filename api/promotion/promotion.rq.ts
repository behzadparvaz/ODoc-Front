import { useQuery } from 'react-query';
import { GetBanners, GetCarousels } from './promotion';

export const useGetBanners = () => {
  const { data, isLoading } = useQuery(['GetBanners'], () => GetBanners());
  return { data: data as any, isLoading };
};

export const useGetCarousels = () => {
  const { data, isLoading } = useQuery(['GetCarousels'], () => GetCarousels());
  return { data: data as any, isLoading };
};
