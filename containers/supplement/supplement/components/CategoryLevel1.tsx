import { useRouter } from 'next/router';

import { useGetSupplementCategoryLevel2 } from '@api/supplement/supplementApis.rq';
import Spinner from '@com/_atoms/Spinner';
import NextImage from '@com/_core/NextImage';

type Categories = {
  categoryNameLevel2: string;
  categoryCodeLevel2: string;
  iconLink: null | string;
  sort: number;
};

const CategoryLevel1 = () => {
  const { push } = useRouter();
  const { data: categories, isLoading: categoriesIsLoading } =
    useGetSupplementCategoryLevel2();

  console.log('categories', categories);
  if (categoriesIsLoading) {
    return (
      <div className="w-full h-[100px] flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-4 px-4 py-2">
      {categories?.map((category) => (
        <div
          key={category?.id}
          className="flex flex-col h-full bg-surface-secondary pr-4 pl-2 pt-1 pb-3 rounded-lg cursor-pointer"
        >
          <div className="self-end h-[72px] w-[72px] flex items-center justify-center overflow-hidde">
            <NextImage
              alt="supplement-category-l1"
              width={72}
              height={72}
              src={category?.iconLink}
            />
          </div>
          {category?.categoryNameLevel2}
        </div>
      ))}
    </div>
  );
};

export default CategoryLevel1;
