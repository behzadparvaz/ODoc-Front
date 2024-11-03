import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
  UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import {
  addProductToBasket,
  AddProductToBasketPayload,
  deleteCurrentBasket,
  deleteProductBasket,
  getCurrentBasket,
  OneOfCodes,
  updateCountProductBasket,
  UpdateCountProductBasketPayload,
} from '@api/basket/basketApis';

export const useGetCurrentBasket = <TQuery = Basket>(
  options?: any,
): UseQueryResult<TQuery> =>
  useQuery({
    queryKey: ['getCurrentBasket'],
    queryFn: () => getCurrentBasket(),
    refetchOnMount: 'always',
    // refetchInterval: 5000,
    ...options,
  });

export const useDeleteCurrentBasket: (
  options?: UseMutationOptions<unknown, unknown, any>,
) => UseMutationResult<unknown, unknown, any> = (options) =>
    useMutation({
      mutationFn: () => deleteCurrentBasket(),
      ...options,
    });

export const useDeleteProductBasket: (
  options?: UseMutationOptions<unknown, unknown, OneOfCodes>,
) => UseMutationResult<unknown, unknown, OneOfCodes> = (options) =>
    useMutation({
      mutationFn: (variables) => deleteProductBasket(variables),
      ...options,
    });

export const useUpdateCountProductBasket: (
  options?: UseMutationOptions<
    unknown,
    unknown,
    UpdateCountProductBasketPayload
  >,
) => UseMutationResult<unknown, unknown, UpdateCountProductBasketPayload> = (
  options,
) =>
    useMutation({
      mutationFn: (variables) => updateCountProductBasket(variables),
      ...options,
    });

export const useAddProductToBasket: (
  options?: UseMutationOptions<unknown, unknown, AddProductToBasketPayload>,
) => UseMutationResult<unknown, unknown, AddProductToBasketPayload> = (
  options,
) =>
    useMutation({
      mutationFn: (variables) => addProductToBasket(variables),
      ...options,
    });
