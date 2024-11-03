import { useQuery } from '@tanstack/react-query';
import { getTenderItems } from './tenderApis';

export const useGetTenderItems = (orderCode: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ['getTenderItems', orderCode],
    queryFn: () => getTenderItems(orderCode),

    enabled: !!orderCode,
  });
  return { data: data as any, isLoading };
};
