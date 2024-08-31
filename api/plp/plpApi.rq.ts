import { useInfiniteQuery, useMutation, useQuery } from 'react-query';
import {
  GetCategoryProducts,
  GetSearchProducts,
  GetSearchResult,
} from './plpApi';
import { useRouter } from 'next/router';

export const useGetSearchResult = () =>
  useMutation('searchResult', GetSearchResult);

export const useGetCategoryProducts = (body) => {
  const { data, isLoading } = useInfiniteQuery(
    ['categoryProducts', body],
    () => GetCategoryProducts(body),
    {
      enabled: !!body && !!body.category,
    },
  );
  return { data: data as any, isLoading };
};

export const useGetSearchProducts = (body) => {
  const { data, isLoading } = useInfiniteQuery(
    ['searchProducts', body],
    () => GetSearchProducts(body),
    {
      enabled: !!body && !!body.productName,
    },
  );

  return { data: data as any, isLoading };
};

export const useGetPlpInfiniteContent = (body) => {
  const { query } = useRouter();
  const searchTerm = query?.search_text;
  const handleGetDataByCheckPage = () => {
    if (searchTerm) {
      return useInfiniteQuery<any>(
        ['searchProducts', body],
        ({ pageParam }) =>
          GetSearchProducts({
            ...body,
            pageNumber: pageParam || body.pageNumber,
          }),
        {
          getNextPageParam: (data) => {
            return data?.totalCount === data?.pageNumber
              ? undefined
              : data?.pageNumber + 1;
          },
          enabled: !!body && !!body.productName,
        },
      );
    } else {
      return useInfiniteQuery<any>(
        ['categoryProducts', body],
        ({ pageParam }) =>
          GetCategoryProducts({
            ...body,
            pageNumber: pageParam || body.pageNumber,
          }),
        {
          getNextPageParam: (data) => {
            return data?.totalCount === data?.pageNumber
              ? undefined
              : data?.pageNumber + 1;
          },
          enabled: !!body && !!body.category,
        },
      );
    }
  };
  const plpData = handleGetDataByCheckPage();
  return { plpData };
};
