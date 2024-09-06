import { useQuery } from 'react-query';
import {
  GetCategoryLevel2,
  GetCategoryLevel3,
  GetMainCategories,
} from './categoryApis';
interface categoriesLevelTwoAndLevelThreeProps {
  level: 2 | 3;
  parentCode: string;
}
export const useGetMainCategories = () => {
  const { data, isLoading } = useQuery(['getMainCategories'], () =>
    GetMainCategories(),
  );
  return { data: data as any, isLoading };
};

export const useGetCategoriesLevelTwoAndLevelThree = ({
  level,
  parentCode,
}: categoriesLevelTwoAndLevelThreeProps) => {
  const { data, isLoading } = useQuery(
    ['getCategoryLevel', level, parentCode],
    () =>
      level === 2
        ? GetCategoryLevel2(parentCode)
        : GetCategoryLevel3(parentCode),
  );
  return { data: data as any, isLoading };
};
