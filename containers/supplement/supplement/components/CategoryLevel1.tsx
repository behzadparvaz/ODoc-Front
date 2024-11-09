import { useRouter } from 'next/router';

import { useGetSupplementCategoryLevel2 } from '@api/supplement/supplementApis.rq';
import NextImage from '@com/_core/NextImage';
import { routeList } from '@routes/routeList';

type Categories = {
  categoryNameLevel2: string;
  categoryCodeLevel2: string;
  iconLink: null | string;
  sort: number;
};

const shimerItems = [1, 2, 3, 4];

const CategoryLevel1 = () => {
  const { push } = useRouter();
  const { data: categories, isLoading: categoriesIsLoading } =
    useGetSupplementCategoryLevel2();

  if (categoriesIsLoading) {
    return (
      <div className="w-full h-[240px] grid grid-cols-2 justify-center items-center px-4 py-2 gap-4">
        {shimerItems.map((_, idx) => (
          <div
            key={idx}
            className="w-[206px] h-[112px] bg-surface-secondary animate-pulse rounded-lg"
          />
        ))}
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-4 px-4 py-2">
      {categories?.map((category, idx) => (
        <div
          onClick={() =>
            push(
              `${routeList.supplementProductListPage}?categoryCodeLevel2=${category?.categoryCodeLevel2}&categoryNameLevel2=${category?.categoryNameLevel2}`,
            )
          }
          key={idx}
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
