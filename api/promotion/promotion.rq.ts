import { useQuery } from '@tanstack/react-query';
import { GetBanners, GetCarousels } from './promotion';

export const useGetBanners = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['GetBanners'],
    queryFn: () => GetBanners(),
  });
  return { data: data as any, isLoading };
};

export const useGetCarousels = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['GetCarousels'],
    queryFn: () => GetCarousels(),
  });
  return { data: data as any, isLoading };
};
