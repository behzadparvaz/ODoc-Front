import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';
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
  getCurrentOrder,
  getDeclineTypes,
} from './orderApis';
import { useRouter } from 'next/router';
import useNotification from '@hooks/useNotification';
import {
  CreateOrderDraftPayload,
  OrderStatuses,
} from '@utilities/interfaces/order';
import { routeList } from '@routes/routeList';
import useStorage from '@hooks/useStorage';
export const useCreateOrderInsurance = () => {
  const { push } = useRouter();
  const queryClient = useQueryClient();
  const { openNotification } = useNotification();
  return useMutation({
    mutationFn: CreateOrderInsurance,
    onSuccess: (data: any) => {
      if (Array.isArray(data)) {
        openNotification({
          type: 'error',
          message: 'خطایی رخ داده است',
          notifType: 'successOrFailedMessage',
        });
      } else {
        queryClient?.invalidateQueries({ queryKey: ['getOrdersHistory'] });
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
  options?: UseQueryOptions<unknown, Error, any[]>,
) => UseQueryResult<any[], Error> = (statusId, options) =>
    useQuery({
      queryKey: ['getOrdersHistory', statusId],
      queryFn: () => GetOrdersHistory(statusId),
      refetchInterval: 20000,
      ...options,
    });

export const useGetOrderStatuses: (
  options?: UseQueryOptions<unknown, Error, OrderStatuses[]>,
) => UseQueryResult<OrderStatuses[], Error> = (options) =>
    useQuery({
      queryKey: ['getOrderStatuses'],
      queryFn: () => GetOrderStatuses(),
      ...options,
    });

export const useGetOrderInfo = (id: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ['getOrderInfo', id],
    queryFn: () => getOrderInfo(id),

    enabled: id !== 'undefined' ? true : false,
  });
  return { data: data as any, isLoading };
};

export const useFinishOrderPayment = () => {
  const { push } = useRouter();
  const { openNotification } = useNotification();
  return useMutation({
    mutationFn: FinishOrderPayment,
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
        if (data) {
          push(data);
        }
      }
    },
  });
};

export const useCancelOrder = () => {
  const { push } = useRouter();
  const queryClient = useQueryClient();
  const { openNotification } = useNotification();
  return useMutation({
    mutationFn: CancelOrder,
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
        queryClient?.invalidateQueries({ queryKey: ['getOrdersHistory'] });
        push('/app/orders-history');
      }
    },
  });
};

export const useVerifyPaymentOrder = () => {
  return useMutation({ mutationFn: VerifyPaymentOrder });
};

export const useGetInsurances = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['getInsurances'],
    queryFn: () => getInsurances(),
  });
  return { data: data as any, isLoading };
};

export const useGetOrderState = (orderCode) => {
  const { data, isLoading } = useQuery({
    queryKey: ['getOrderState', orderCode],
    queryFn: () => GetOrderState(orderCode),
  });
  return { data: data as any, isLoading };
};

export const useCancelQuickOrder = () => {
  return useMutation({ mutationFn: CancelQuickOrder });
};

export const useGetSupplementaryInsurances = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['getSupplementaryInsurances'],
    queryFn: () => getSupplementaryInsurances(),
  });
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
  const { data, isLoading } = useQuery({
    queryKey: ['getOrderDetails', orderCode],
    queryFn: () => getOrderDetails(orderCode),
    enabled: !!orderCode,
  });
  return { data: data as any, isLoading };
};

export const useGetActiveOrderStatus = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['getActiveOrderStatus'],
    queryFn: () => getActiveOrderStatus(),

    gcTime: 10000,
  });
  return { data: data as any, isLoading };
};

export const useCreateOrderInline = () => {
  return useMutation({ mutationFn: CreateOrderInline });
};

export const useCreateOrderInlineStep1 = () => {
  return useMutation({ mutationFn: CreateOrderInlineStep1 });
};

export const useCreateOrderInlineStep2 = () => {
  return useMutation({ mutationFn: CreateOrderInlineStep2 });
};

export const useGetDeliveryCode = (orderCode: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ['getDeliveryCode', orderCode],
    queryFn: () => getDeliveryCode(orderCode),

    enabled: !!orderCode,
  });

  return { data: data as any, isLoading: isLoading };
};

export const useDeleteOrderDetail = () => {
  return useMutation({ mutationFn: DeleteOrderDetail });
};

export const useGetCurrentOrder = () => {
  const { getItem } = useStorage();
  const token = getItem('token', 'local');
  return useQuery({
    queryKey: ['getDeliveryCode'],
    queryFn: () => getCurrentOrder(),
    enabled: !!token,
  });

};

export const useGetDeclineTypes = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['getDeclineTypes'],
    queryFn: () => getDeclineTypes(),
  });

  return { data: data as any, isLoading: isLoading };
};
