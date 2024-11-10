import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import {
  GetSupplementCategoryLevel2,
  GetSupplementCategoryLevel3,
  GetSupplementCategoryLevel4,
  GetSupplementProducts,
} from './supplementApis';

type Categories = {
  categoryNameLevel2: string;
  categoryCodeLevel2: string;
  iconLink: null | string;
  sort: number;
};

export const useGetSupplementCategoryLevel2 = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['GetSupplementCategoryLevel2'],
    queryFn: () => GetSupplementCategoryLevel2(),
  });
  return { data: data as any, isLoading };
};

export const useGetSupplementCategoryLevel3 = (categoryCodeLevel2: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ['GetSupplementCategoryLevel3', categoryCodeLevel2],
    queryFn: () => GetSupplementCategoryLevel3(categoryCodeLevel2),
    enabled: !!categoryCodeLevel2,
  });
  return { data: data as any, isLoading };
};

export const useGetSupplementCategoryLevel4 = (categoryCodeLevel3: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ['GetSupplementCategoryLevel4', categoryCodeLevel3],
    queryFn: () => GetSupplementCategoryLevel4(categoryCodeLevel3),
    enabled: !!categoryCodeLevel3,
  });
  return { data: data as any, isLoading };
};

export const useGetSupplementProducts = (body?: any) => {
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
    queryKey: ['GetSupplementProducts', body],
    queryFn: ({ pageParam = 1 }) =>
      GetSupplementProducts({ ...body, pageNumber: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (data: any) => {
      return data?.totalCount === data?.pageNumber
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
  };
};
