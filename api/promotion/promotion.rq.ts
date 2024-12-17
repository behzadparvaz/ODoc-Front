import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { GetBanners, GetCarouselById, GetCarousels } from './promotion';

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

export const useGetCarouselProduct = (body?: any) => {
  const {
    data,
    isLoading,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
  } = useInfiniteQuery({
    queryKey: ['GetCarouselById', body],
    queryFn: ({ pageParam = 1 }) =>
      GetCarouselById({
        ...body,
        pageNumber: body?.pageNumber ?? pageParam,
      }),
    initialPageParam: 1,
    getNextPageParam: (data: any) => {
      return data?.totalCount === data?.pageNumber
        ? undefined
        : data?.pageNumber + 1;
    },
    enabled: !!body && !!body.carouselId,
  });

  return {
    data,
    isLoading,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
  };
};
