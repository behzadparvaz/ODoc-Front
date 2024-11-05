import { useQuery } from '@tanstack/react-query';
import { GetSearchSuggestion } from './searchApi';

export const useGetSearchSuggestion = (searchText: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ['getMainCategories', searchText],
    queryFn: () => GetSearchSuggestion(searchText),
  });
  return { data: data as any, isLoading };
};
