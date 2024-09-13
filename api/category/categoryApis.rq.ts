import { useQuery } from 'react-query';
import {
  GetCategoryLevel2,
  GetCategoryLevel3,
  GetMainCategories,
} from './categoryApis';
interface categoriesLevel {
  level: number;
  parentCode?: string;
}

export const useGetCategories = ({ level, parentCode }: categoriesLevel) => {
  const { data, isLoading } = useQuery(
    ['getCategoryLevel', level, parentCode],
    () =>
      level === 1
        ? GetMainCategories()
        : level === 2
          ? GetCategoryLevel2(parentCode)
          : GetCategoryLevel3(parentCode),
  );
  return { data: data as any, isLoading };
};
