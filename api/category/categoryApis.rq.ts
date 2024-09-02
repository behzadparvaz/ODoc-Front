import { useQuery } from 'react-query';
import { GetMainCategories } from './categoryApis';

export const useGetMainCategories = () => {
  const { data, isLoading } = useQuery(['getMainCategories'], () =>
    GetMainCategories(),
  );
  return { data: data as any, isLoading };
};
