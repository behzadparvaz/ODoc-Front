import { useQuery } from 'react-query';
import { GetDrugTypes } from './otherApis';

export const useGetDrugTypes = () => {
  const { data, isLoading } = useQuery(['getDrugTypes'], () => GetDrugTypes());
  return { data, isLoading };
};
