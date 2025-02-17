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

export const useGetCarouselProduct = (body?: any, search?: string) => {
  const {
    data,
    isLoading,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['GetCarouselById', body],
    queryFn: ({ pageParam = 1 }) =>
      GetCarouselById({
        ...body,
        pageNumber: body?.pageNumber ?? pageParam,
      }),
    initialPageParam: 1,
    getNextPageParam: (data: any) => {
      return Math.floor(data?.totalCount / 10) + 1 === data?.pageNumber
        ? undefined
        : data?.pageNumber + 1;
    },
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
    refetch,
  };
};
