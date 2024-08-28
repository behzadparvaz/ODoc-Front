import { useMutation } from 'react-query';
import { GetSearchResult } from './plpApi';

export const useGetSearchResult = () =>
  useMutation('searchResult', GetSearchResult);
