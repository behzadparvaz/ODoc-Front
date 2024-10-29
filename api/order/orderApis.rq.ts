import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryOptions,
  UseQueryResult,
} from 'react-query';
import {
  CancelOrder,
  CreateOrderInsurance,
  FinishOrderPayment,
  GetOrderState,
  GetOrdersHistory,
  VerifyPaymentOrder,
  getInsurances,
  GetOrderStatuses,
  getSupplementaryInsurances,
  createOrderDraft,
  getOrderDetails,
  CreateOrderInlineStep1,
  CreateOrderInlineStep2,
  getOrderInfo,
  getActiveOrderStatus,
  CancelQuickOrder,
  getDeliveryCode,
  DeleteOrderDetail,
  CreateOrderInline,
} from './orderApis';
import { useRouter } from 'next/router';
import useNotification from '@hooks/useNotification';
import {
  CreateOrderDraftPayload,
  OrderStatuses,
} from '@utilities/interfaces/order';
import { routeList } from '@routes/routeList';
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
          pathname: routeList.successOrder,
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

export const useGetOrdersHistory: (
  statusId: number,
  options?: UseQueryOptions<unknown, unknown, any[]>,
) => UseQueryResult<any[]> = (statusId, options) =>
  useQuery(['getOrdersHistory', statusId], () => GetOrdersHistory(statusId), {
    refetchInterval: 20000,
    ...options,
  });

export const useGetOrderStatuses: (
  options?: UseQueryOptions<unknown, unknown, OrderStatuses[]>,
) => UseQueryResult<OrderStatuses[]> = (options) =>
  useQuery(['getOrderStatuses'], () => GetOrderStatuses(), options);

export const useGetOrderInfo = (id: string) => {
  const { data, isLoading } = useQuery(
    ['getOrderInfo', id],
    () => getOrderInfo(id),
    {
      enabled: id !== 'undefined' ? true : false,
    },
  );
  return { data: data as any, isLoading };
};

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
  const { push } = useRouter();
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
        push('/app/order-history');
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

export const useCancelQuickOrder = () => {
  return useMutation(CancelQuickOrder);
};

export const useGetSupplementaryInsurances = () => {
  const { data, isLoading } = useQuery(['getSupplementaryInsurances'], () =>
    getSupplementaryInsurances(),
  );
  return { data: data as any, isLoading };
};

export const useCreateOrderDraft: (
  options?: UseMutationOptions<unknown, unknown, CreateOrderDraftPayload>,
) => UseMutationResult<unknown, unknown, CreateOrderDraftPayload> = (options) =>
  useMutation({
    mutationFn: (variables) => createOrderDraft(variables),
    ...options,
  });

export const useGetOrderDetails = (orderCode: string) => {
  const { data, isLoading } = useQuery(
    ['getOrderDetails', orderCode],
    () => getOrderDetails(orderCode),
    {
      enabled: !!orderCode,
    },
  );
  return { data: data as any, isLoading };
};

export const useGetActiveOrderStatus = () => {
  const { data, isLoading } = useQuery(
    ['getActiveOrderStatus'],
    () => getActiveOrderStatus(),
    {
      cacheTime: 10000,
    },
  );
  return { data: data as any, isLoading };
};

export const useCreateOrderInline = () => {
  return useMutation(CreateOrderInline);
};

export const useCreateOrderInlineStep1 = () => {
  return useMutation(CreateOrderInlineStep1);
};

export const useCreateOrderInlineStep2 = () => {
  return useMutation(CreateOrderInlineStep2);
};

export const useGetDeliveryCode = (orderCode: string) => {
  const { data, isLoading } = useQuery(
    ['getDeliveryCode', orderCode],
    () => getDeliveryCode(orderCode),
    {
      enabled: !!orderCode,
    },
  );

  return { data: data as any, isLoading: isLoading };
};

export const useDeleteOrderDetail = () => {
  return useMutation(DeleteOrderDetail);
};
