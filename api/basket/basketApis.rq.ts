import {
  addProductToBasket,
  BasketPayload,
  deleteCurrentBasket,
  deleteProductBasket,
  getCurrentBasket,
  OneOfCodes,
  updateCountProductBasket,
  UpdateCountProductBasketPayload,
} from '@api/basket/basketApis';
import useNotification from '@hooks/useNotification';
import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query';

export const useGetCurrentBasket = <TQuery = Basket>(
  options?: any,
): UseQueryResult<TQuery> =>
  useQuery({
    queryKey: ['getCurrentBasket'],
    queryFn: () => getCurrentBasket(),
    refetchOnMount: 'always',
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
  options?: UseMutationOptions<unknown, unknown, BasketPayload>,
) => UseMutationResult<unknown, unknown, BasketPayload> = (options) => {
  const { openNotification } = useNotification();
  return useMutation({
    mutationFn: (variables) => addProductToBasket(variables),
    onSuccess(data, variables, context) {},
    onError: (err: any) => {
      openNotification({
        type: 'error',
        message: err?.response?.data?.message,
        notifType: 'successOrFailedMessage',
      });
    },
    ...options,
  });
};
