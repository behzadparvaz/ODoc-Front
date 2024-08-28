import { useMutation } from 'react-query';
import {
  GetCategoryProducts,
  GetSearchProducts,
  GetSearchResult,
} from './plpApi';

export const useGetSearchResult = () =>
  useMutation('searchResult', GetSearchResult);

export const useGetSearchProducts = () =>
  useMutation('searchProducts', GetSearchProducts);

export const useGetCategoryProducts = () =>
  useMutation('categoryProducts', GetCategoryProducts);
