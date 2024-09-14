import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import {
  getProducts,
  GetCategoryLevel2Products,
  GetFilteredProductsByShapes,
  GetProductsShapes,
} from '@api/product/productApis';

export const useGetProducts: (
  options?: UseQueryOptions<unknown, unknown, any[]>,
) => UseQueryResult<any[]> = (options) =>
  useQuery(['getProducts'], () => getProducts(), {
    ...options,
  });

export const useGetCategtyL2Products = (parentCode: string) => {
  const { data, isLoading } = useQuery(
    ['GetCategoryLevel2Products', parentCode],
    () => GetCategoryLevel2Products(parentCode),
  );
  return { data: data as any, isLoading };
};

export const useGetProductsShapes = () => {
  const { data, isLoading } = useQuery(['GetCategoryLevel2Products'], () =>
    GetProductsShapes(),
  );
  return { data: data as any, isLoading };
};

export const useGetFilteredProductsByShapes = (
  categoryCode: string,
  shapeCode: number,
) => {
  const { data, isLoading } = useQuery(
    ['GetFilteredProductsByShapes', categoryCode, shapeCode],

    () => {
      GetFilteredProductsByShapes(categoryCode, shapeCode),
        { enabled: !!shapeCode };
    },
  );
  return { data: data as any, isLoading };
};
