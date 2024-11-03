import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import {
  GetCategoryLevel2,
  GetCategoryLevel2Description,
  GetCategoryLevel3,
  GetCategoryLevel4,
  GetMainCategories,
} from './categoryApis';
interface categoriesLevel {
  level: number;
  parentCode?: string;
}

type GetCategoryLevel2Response = {
  pageNumber: number;
  pageSize: number;
  queryResult: any[];
  totalCount: number;
};

export const useGetCategories = ({ level, parentCode }: categoriesLevel) => {
  const { data, isLoading } = useQuery({
    queryKey: ['getCategoryLevel', level, parentCode],
    queryFn: () =>
      level === 1
        ? GetMainCategories()
        : level === 2
          ? GetCategoryLevel2(parentCode)
          : GetCategoryLevel3(parentCode),
  });
  return { data: data as any, isLoading };
};

export const useGetInfiniteCategoryLevel2 = (body) => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['getSearchProducts', body],
    queryFn: ({ pageParam }) =>
      GetCategoryLevel2({
        ...body,
        pageNumber: pageParam || body.pageNumber,
      }),
    initialPageParam: 1,
    getNextPageParam: (data: any) => {
      return data?.totalCount === data?.pageNumber
        ? undefined
        : data?.pageNumber + 1;
    },
    enabled: !!body && !!body.search,
  });

  return {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  };
};
export const useGetCategoryLevel4 = (body) => {
  const { data, isLoading } = useQuery({
    queryKey: ['getCategoryLeve4', body?.otcLevel3, body?.categoryCodeLevel2],
    queryFn: () => GetCategoryLevel4(body),
  });
  return { data: data as any, isLoading };
};

export const useGetCategoryDescription = (categoryCode: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ['getCategoryDescription', categoryCode],
    queryFn: () => GetCategoryLevel2Description(categoryCode),

    enabled: categoryCode && categoryCode !== undefined ? true : false,
  });
  return { data: data as any, isLoading };
};
