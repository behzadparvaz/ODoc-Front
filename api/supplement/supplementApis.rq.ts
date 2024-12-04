import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import {
  GetSupplementCategoryLevel2,
  GetSupplementCategoryLevel3,
  GetSupplementCategoryLevel4,
  GetSupplementProducts,
  GetSupplementProductsBrands,
  GetSupplementProductsShapes,
} from './supplementApis';

type Categories = {
  categoryNameLevel2: string;
  categoryCodeLevel2: string;
  iconLink: null | string;
  sort: number;
};

export const useGetSupplementCategoryLevel2 = (body: any) => {
  const { data, isLoading } = useQuery({
    queryKey: ['GetSupplementCategoryLevel2', body],
    queryFn: () => GetSupplementCategoryLevel2(body),
    enabled: !!body,
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
      GetSupplementProducts({
        ...body,
        pageNumber: body?.pageNumber ?? pageParam,
      }),
    initialPageParam: 1,
    getNextPageParam: (data: any) => {
      return data?.totalCount === data?.pageNumber
        ? undefined
        : data?.pageNumber + 1;
    },
    enabled: !!body?.categoryCodeLevel1,
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

export const useGetSupplementProductsShapes = (body?: any) => {
  const { data, isLoading } = useQuery({
    queryKey: ['GetSupplementProductsShapes', body],
    queryFn: () => GetSupplementProductsShapes(body),
  });
  return { data: data as any, isLoading };
};

export const useGetSupplementProductsBrands = (body?: any) => {
  const { data, isLoading } = useQuery({
    queryKey: ['GetSupplementProductsBrands', body],
    queryFn: () => GetSupplementProductsBrands(body),
  });
  return { data: data as any, isLoading };
};
