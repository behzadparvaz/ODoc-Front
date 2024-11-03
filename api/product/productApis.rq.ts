import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';
import {
  getProducts,
  GetCategoryLevel2Products,
  GetFilteredProductsByShapes,
  GetProductsShapes,
  GetProductsFromSearch,
} from '@api/product/productApis';

export const useGetProducts: (
  options?: UseQueryOptions<unknown, Error, any[]>,
) => UseQueryResult<any[], Error> = (options) =>
  useQuery({
    queryKey: ['getProducts'],
    queryFn: () => getProducts(),
    ...options,
  });

export const useGetCategtyL2Products = (parentCode: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ['GetCategoryLevel2Products', parentCode],
    queryFn: () => GetCategoryLevel2Products(parentCode),
  });
  return { data: data as any, isLoading };
};

export const useGetProductsShapes = (categoryCodeLevel2: string) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['GetProductsShapes', categoryCodeLevel2],
    queryFn: () => GetProductsShapes(categoryCodeLevel2),
    enabled: !!categoryCodeLevel2,
  });
  return { data: data as any, isLoading, refetch: refetch };
};

export const useGetFilteredProductsByShapes = (
  categoryCode: string,
  shapeCode: number,
) => {
  const { data } = useQuery({
    queryKey: ['GetFilteredProductsByShapes', categoryCode, shapeCode],
    queryFn: () => GetFilteredProductsByShapes(categoryCode, shapeCode),
    enabled: !!shapeCode,
  });

  return { data: data as any };
};

export const useGetProductsFromSearch = ({
  brandName,
  categoryCodeLevel3,
  irc,
}: {
  brandName: string;
  categoryCodeLevel3: string;
  irc: string;
}) => {
  const { data, isLoading } = useQuery({
    queryKey: ['GetProductsFromSearch', brandName, categoryCodeLevel3, irc],
    queryFn: () =>
      GetProductsFromSearch({ brandName, categoryCodeLevel3, irc }),
    enabled: !!brandName && !!categoryCodeLevel3,
  });

  return { data: data as any, isLoading };
};
