import { useQuery } from '@tanstack/react-query';
import { GetDrugTypes } from './otherApis';

export const useGetDrugTypes = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['getDrugTypes'],
    queryFn: () => GetDrugTypes(),
  });
  return { data, isLoading };
};
