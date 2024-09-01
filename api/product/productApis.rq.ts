import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { getProducts } from '@api/product/productApis';

export const useGetProducts: (
  options?: UseQueryOptions<unknown, unknown, any[]>,
) => UseQueryResult<any[]> = ( options) =>
  useQuery(['getProducts'], () => getProducts(), {
    ...options,
  });
