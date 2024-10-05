import { useQuery } from 'react-query';
import { GetSearchSuggestion } from './searchApi';

export const useGetSearchSuggestion = (searchText: string) => {
  const { data, isLoading } = useQuery(['getMainCategories', searchText], () =>
    GetSearchSuggestion(searchText),
  );
  return { data: data as any, isLoading };
};
