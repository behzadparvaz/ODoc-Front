import CategoryItem from '@com/_atoms/CategoryItem';

import secondSlidePNG from '@static/images/staticImages/sample-category.png';
import ScrollSlider from './ScrollSlider.nd';
import { useGetMainCategories } from '@api/category/categoryApis.rq';

const Categories = () => {
  const { data, isLoading } = useGetMainCategories();
  const categoryDate = data?.value;

  return (
    <div className="flex ">
      <ScrollSlider className="px-4 gap-x-2">
        {categoryDate?.map((item) => {
          return (
            <div className="w-[104px] bg-grey-100 rounded-md">
              <CategoryItem
                key={item?.categoryCodeLevel1}
                imageUrl={secondSlidePNG}
                name={item?.categoryNameLevel1}
              />
            </div>
          );
        })}
      </ScrollSlider>
    </div>
  );
};
export default Categories;
