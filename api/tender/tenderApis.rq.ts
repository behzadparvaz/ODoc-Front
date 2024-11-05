import { useQuery } from 'react-query';
import { getTenderItems } from './tenderApis';

export const useGetTenderItems = (orderCode: string) => {
  const { data, isLoading } = useQuery(
    ['getTenderItems', orderCode],
    () => getTenderItems(orderCode),
    {
      enabled: !!orderCode,
    },
  );
  return { data: data as any, isLoading };
};
