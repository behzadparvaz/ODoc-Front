import { useQuery } from '@tanstack/react-query';
import { getTenderItems, getTenderPrepartionTime } from './tenderApis';

export const useGetTenderItems = (orderCode: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ['getTenderItems', orderCode],
    queryFn: () => getTenderItems(orderCode),

    enabled: !!orderCode,
  });
  return { data: data as any, isLoading };
};

export const useGetTenderPrepartionTime = (lat: number, lng: number) => {
  const { data, isLoading, refetch, isSuccess, isError } = useQuery({
    queryKey: ['getTenderItems', lat, lng],
    queryFn: () => getTenderPrepartionTime(lat, lng),

    enabled: !!(lat && lng),
  });
  return { data: data as any, isLoading, refetch, isSuccess, isError };
};