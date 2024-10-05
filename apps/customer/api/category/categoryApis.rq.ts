import { useInfiniteQuery, useQuery } from 'react-query';
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

export const useGetCategories = ({ level, parentCode }: categoriesLevel) => {
  const { data, isLoading } = useQuery(
    ['getCategoryLevel', level, parentCode],
    () =>
      level === 1
        ? GetMainCategories()
        : level === 2
          ? GetCategoryLevel2(parentCode)
          : GetCategoryLevel3(parentCode),
  );
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
  } = useInfiniteQuery<any>(
    ['getSearchProducts', body],
    ({ pageParam }) =>
      GetCategoryLevel2({
        ...body,
        pageNumber: pageParam || body.pageNumber,
      }),
    {
      getNextPageParam: (data) => {
        return data?.totalCount === data?.pageNumber
          ? undefined
          : data?.pageNumber + 1;
      },
      enabled: !!body && !!body.search,
    },
  );
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
  const { data, isLoading } = useQuery(
    ['getCategoryLeve4', body?.otcLevel3, body?.categoryCodeLevel2],
    () => GetCategoryLevel4(body),
  );
  return { data: data as any, isLoading };
};

export const useGetCategoryDescription = (categoryCode: string) => {
  const { data, isLoading } = useQuery(
    ['getCategoryDescription', categoryCode],
    () => GetCategoryLevel2Description(categoryCode),
  );
  return { data: data as any, isLoading };
};
