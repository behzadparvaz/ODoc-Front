import { useInfiniteQuery } from 'react-query';
import { GetSearchProducts } from './plpApi';
import { GetCarouselById } from '@api/promotion/promotion';

export const useGetPlpInfiniteContent = (body) => {
  const carouselId = body?.carouselId;
  const handleGetDataByCheckPage = () => {
    if (carouselId) {
      return useInfiniteQuery<any>(
        ['getCarouselById', body],
        ({ pageParam }) =>
          GetCarouselById({
            ...body,
            pageNumber: pageParam || body.pageNumber,
          }),
        {
          getNextPageParam: (data) => {
            return data?.totalCount === data?.pageNumber
              ? undefined
              : data?.pageNumber + 1;
          },
          enabled: !!body && !!body.carouselId,
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
