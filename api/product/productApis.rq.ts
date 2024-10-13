import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import {
  getProducts,
  GetCategoryLevel2Products,
  GetFilteredProductsByShapes,
  GetProductsShapes,
  GetProductsFromSearch,
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

export const useGetProductsShapes = (categoryCodeLevel2: string) => {
  const { data, isLoading, refetch } = useQuery(
    ['GetProductsShapes', categoryCodeLevel2],
    () => GetProductsShapes(categoryCodeLevel2),
    { enabled: !!categoryCodeLevel2 },
  );
  return { data: data as any, isLoading, refetch: refetch };
};

export const useGetFilteredProductsByShapes = (
  categoryCode: string,
  shapeCode: number,
) => {
  const { data } = useQuery(
    ['GetFilteredProductsByShapes', categoryCode, shapeCode],
    () => GetFilteredProductsByShapes(categoryCode, shapeCode),
    { enabled: !!shapeCode },
  );

  return { data: data as any };
};

export const useGetProductsFromSearch = ({
  brandName,
  categoryCodeLevel3,
}: {
  brandName: string;
  categoryCodeLevel3: string;
}) => {
  const { data, isLoading } = useQuery(
    ['GetProductsFromSearch', brandName, categoryCodeLevel3],
    () => GetProductsFromSearch({ brandName, categoryCodeLevel3 }),
    { enabled: !!brandName && !!categoryCodeLevel3 },
  );

  return { data: data as any, isLoading };
};
