import { useMutation, useQuery } from '@tanstack/react-query';
import { getTenderItems, getTenderPrepartionTime } from './tenderApis';

export const useGetTenderItems = (orderCode: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ['getTenderItems', orderCode],
    queryFn: () => getTenderItems(orderCode),

    enabled: !!orderCode,
  });
  return { data: data as any, isLoading };
};

export const useGetTenderPrepartionTime = () => {
  return useMutation<any, unknown, any>({
    mutationFn: getTenderPrepartionTime,
  });
};

export const useGetOrderPrepartionTime = (body: any) => {
  const { data, isLoading } = useQuery({
    queryKey: ['getTenderPrepartionTime', body],
    queryFn: () => getTenderPrepartionTime(body),
  });
  return { data: data as any, isLoading };
};
