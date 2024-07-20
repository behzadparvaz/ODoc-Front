import { useMutation, useQuery, useQueryClient, UseQueryOptions, UseQueryResult } from 'react-query';
import {
  CancelOrder,
  CreateOrderInsurance,
  FinishOrderPayment,
  GetOrderState,
  GetOrdersHistory,
  VerifyPaymentOrder,
  getInsurances,
  GetOrderStatuses
} from './orderApis';
import { useRouter } from 'next/router';
import useNotification from '@hooks/useNotification';
import { OrderStatuses } from '@utilities/interfaces/order';

export const useCreateOrderInsurance = () => {
  const { push } = useRouter();
  const queryClient = useQueryClient();
  const { openNotification } = useNotification();
  return useMutation(CreateOrderInsurance, {
    onSuccess: (data: any) => {
      if (Array.isArray(data)) {
        openNotification({
          type: 'error',
          message: 'خطایی رخ داده است',
          notifType: 'successOrFailedMessage',
        });
      } else {
        queryClient?.invalidateQueries('getOrdersHistory');
        push({
          pathname: '/success-order',
          query: { order_Code: data },
        });
      }
    },
    onError: (data: any) => {
      openNotification({
        type: 'error',
        message: data?.errors?.message
          ? data?.errors?.message
          : 'خطایی رخ داده است',
        notifType: 'successOrFailedMessage',
      });
    },
  });
};

export const useGetOrdersHistory: (statusId: number, options?: UseQueryOptions<unknown, unknown, any[]>) => UseQueryResult<any[]>
  = (statusId, options) =>
  useQuery(
    ['getOrdersHistory', statusId],
    () => GetOrdersHistory(statusId),
    {
      refetchInterval: 20000,
      ...options
    },
  );

export const useGetOrderStatuses: (options?: UseQueryOptions<unknown, unknown, OrderStatuses[]>) => UseQueryResult<OrderStatuses[]>
  = (options) => useQuery(['getOrderStatuses'], () => GetOrderStatuses(), options);

export const useFinishOrderPayment = () => {
  const { push } = useRouter();
  const { openNotification } = useNotification();
  return useMutation(FinishOrderPayment, {
    onSuccess: (data: any) => {
      if (data?.status === 400) {
        openNotification({
          type: 'error',
          message: data?.errors?.message
            ? data?.errors?.message
            : 'خطایی رخ داده است',
          notifType: 'successOrFailedMessage',
        });
      } else {
        push(data);
      }
    },
  });
};
export const useCancelOrder = () => {
  const queryClient = useQueryClient();
  const { openNotification } = useNotification();
  return useMutation(CancelOrder, {
    onSuccess: (data: any) => {
      if (data?.status === 400) {
        openNotification({
          type: 'error',
          message: data?.errors?.message
            ? data?.errors?.message
            : 'خطایی رخ داده است',
          notifType: 'successOrFailedMessage',
        });
      } else {
        queryClient?.invalidateQueries('getOrdersHistory');
      }
    },
  });
};

export const useVerifyPaymentOrder = () => {
  return useMutation(VerifyPaymentOrder);
};

export const useGetInsurances = () => {
  const { data, isLoading } = useQuery(['getInsurances'], () =>
    getInsurances(),
  );
  return { data: data as any, isLoading };
};

export const useGetOrderState = (orderCode) => {
  const { data, isLoading } = useQuery(['getOrderState', orderCode], () =>
    GetOrderState(orderCode),
  );
  return { data: data as any, isLoading };
};
