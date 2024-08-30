import { useMutation } from 'react-query';
import { GetSearchSuggestion } from './searchApi';

export const useGetSearchSuggestion = () =>
  useMutation('searchSuggestion', GetSearchSuggestion);
