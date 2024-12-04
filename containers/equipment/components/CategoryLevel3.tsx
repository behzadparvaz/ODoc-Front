import { useRouter } from 'next/router';

import { useGetSupplementCategoryLevel3 } from '@api/supplement/supplementApis.rq';
import NextImage from '@com/_core/NextImage';
import { routeList } from '@routes/routeList';

const shimerItems = [1, 2, 3, 4, 5, 6, 7, 8];

const CategoryLevel3 = () => {
  const { push } = useRouter();

  const { data: categoriesLevel3, isLoading: categoriesIsLoading } =
    useGetSupplementCategoryLevel3('11_1270');

  if (categoriesIsLoading) {
    return (
      <div className="w-full h-max grid grid-cols-2 justify-center items-center px-4 py-2 gap-4">
        {shimerItems.map((_, id) => (
          <div
            key={id}
            className="h-[112px] bg-surface-secondary animate-pulse rounded-lg"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 grid-rows-4 gap-4 px-4 py-2">
      {categoriesLevel3?.map((category) => (
        <div
          onClick={() =>
            push(
              `${routeList.equipmentProductsList}?categoryCodeLevel1=${11}&categoryCodeLevel2=${'11_1270'}&categoryNameLevel2=${'تجهیزات پزشکی'}&categoryCodeLevel3=${category?.categoryCodeLevel3}&categoryNameLevel3=${category?.categoryNameLevel3}`,
            )
          }
          key={category?.categoryCodeLevel3}
          className="relative flex flex-col h-full bg-surface-secondary pr-4 pl-2 pt-1 pb-3 rounded-lg cursor-pointer"
        >
          <div className="self-end h-[72px] w-[72px] flex items-center justify-center overflow-hidde">
            <NextImage
              alt="supplement-category-l1"
              width={72}
              height={72}
              src={category?.iconLink}
            />
          </div>
          {category?.categoryNameLevel3}
        </div>
      ))}
    </div>
  );
};

export default CategoryLevel3;
