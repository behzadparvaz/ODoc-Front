import { useInfiniteQuery } from 'react-query';
import { GetSearchProducts } from './plpApi';
import { GetCategoryLevel4 } from '@api/category/categoryApis';

export const useGetPlpInfiniteContent = (body) => {
  const isCatLevel4Page = body?.CategoryCodeLevel2;
  const handleGetDataByCheckPage = () => {
    if (isCatLevel4Page) {
      return useInfiniteQuery<any>(
        ['getCategoryLevel4', body],
        ({ pageParam }) =>
          GetCategoryLevel4({
            ...body,
            pageNumber: pageParam || body.pageNumber,
          }),
        {
          getNextPageParam: (data) => {
            return data?.totalCount === data?.pageNumber
              ? undefined
              : data?.pageNumber + 1;
          },
          enabled: !!body && !!body.CategoryCodeLevel2,
        },
      );
    } else {
      return useInfiniteQuery<any>(
        ['getSearchProducts', body],
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
          enabled: !!body && !!body.search,
        },
      );
    }
  };
  const plpData = handleGetDataByCheckPage();
  return { plpData };
};
