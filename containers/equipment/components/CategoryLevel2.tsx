import { useRouter } from 'next/router';

import { useGetSupplementCategoryLevel2 } from '@api/supplement/supplementApis.rq';
import NextImage from '@com/_core/NextImage';
import { routeList } from '@routes/routeList';

const shimerItems = [1, 2];

const CategoryLevel2 = () => {
  const { push } = useRouter();

  const body = {
    CategoryCodeLevel1: 11,
  };
  const { data: categoriesLevel2, isLoading: categoriesIsLoading } =
    useGetSupplementCategoryLevel2(body);

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
    <div className="grid grid-cols-2 gap-4 px-4 py-2">
      {categoriesLevel2?.map((category) => (
        <div
          onClick={() =>
            push(
              `${routeList.equipmentProductsList}?categoryCodeLevel1=${11}&categoryCodeLevel2=${category?.categoryCodeLevel2}&categoryNameLevel2=${category?.categoryNameLevel2}`,
            )
          }
          key={category?.categoryCodeLevel2}
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
          {category?.categoryNameLevel2}
        </div>
      ))}
    </div>
  );
};

export default CategoryLevel2;
