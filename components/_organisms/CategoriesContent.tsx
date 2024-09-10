import { useGetCategories } from '@api/category/categoryApis.rq';
import CategoriesItem from '@com/_atoms/CategoriesItem';
import { routeList } from '@routes/routeList';
import { useRouter } from 'next/router';

const CategoriesContent = ({ className = '' }) => {
  const { push, query } = useRouter();
  const level = query?.level ? Number(query?.level) : 1;
  const parentCode = String(query?.parentCode);
  const { data } = useGetCategories({
    level: level,
    parentCode: parentCode,
  });
  const value = data?.value?.queryResult;
  return (
    <div className={`flex gap-y-3 flex-col overflow-auto ${className}`}>
      {value?.map((item, index) => {
        const categoryName =
          level === 1
            ? item?.categoryNameLevel1
            : level === 2
              ? item?.categoryNameLevel2
              : item?.shape;
        return (
          <CategoriesItem
            hasCategoryIcon={level === 1}
            className="pl-4 py-4 border-b border-grey-200"
            wrapperClassName={'pr-4'}
            title={categoryName}
            handleClick={() => {
              if (level === 1 || level === 2) {
                push({
                  pathname: routeList?.categories,
                  query: {
                    parentCode:
                      level === 1
                        ? item?.categoryCodeLevel1
                        : item?.categoryCodeLevel2,
                    level: level + 1,
                    title: categoryName,
                  },
                });
              } else {
                push({
                  pathname: routeList?.category,
                  query: {
                    CategoryCodeLevel2: item?.categoryCodeLevel2,
                    category: `${query?.title} ${categoryName}`,
                    OtcLevel3: item?.otcLevel3,
                  },
                });
              }
            }}
            key={index}
          />
        );
      })}
    </div>
  );
};
export default CategoriesContent;
