import { useQuery } from 'react-query';
import {
  GetCategoryLevel2,
  GetCategoryLevel3,
  GetCategoryLevel4,
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

export const useGetCategoryLevel4 = (body) => {
  const { data, isLoading } = useQuery(
    ['getCategoryLeve4', body?.otcLevel3, body?.categoryCodeLevel2],
    () => GetCategoryLevel4(body),
  );
  return { data: data as any, isLoading };
};
