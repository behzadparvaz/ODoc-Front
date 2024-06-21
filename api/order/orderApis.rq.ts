import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  CreateOrderInsurance,
  FinishOrderPayment,
  GetOrdersHistory,
} from './orderApis';
import { useRouter } from 'next/router';
import useNotification from '@hooks/useNotification';

export const useCreateOrderInsurance = () => {
  const { push } = useRouter();
  const queryClient = useQueryClient();
  const { openNotification } = useNotification();
  return useMutation(CreateOrderInsurance, {
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
        push('/success-order');
      }
    },
  });
};

export const useGetOrdersHistory = () => {
  const { data, isLoading } = useQuery(
    ['getOrdersHistory'],
    () => GetOrdersHistory(),
    {
      refetchInterval: 600000,
    },
  );

  return { data, isLoading };
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
        push('/orders-history');
      }
    },
  });
};
