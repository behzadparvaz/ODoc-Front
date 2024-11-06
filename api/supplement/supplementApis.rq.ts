import { useQuery } from '@tanstack/react-query';
import { GetSupplementCategoryLevel2 } from './supplementApis';

type Categories = {
  categoryNameLevel2: string;
  categoryCodeLevel2: string;
  iconLink: null | string;
  sort: number;
};

export const useGetSupplementCategoryLevel2 = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['GetSupplementCategoryLevel2'],
    queryFn: () => GetSupplementCategoryLevel2(),
  });
  return { data: data as any, isLoading };
};
