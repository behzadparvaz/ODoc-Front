import CategoryItem from '@com/_atoms/CategoryItem';

import secondSlidePNG from '@static/images/staticImages/sample-category.png';
import ScrollSlider from './ScrollSlider.nd';
import { useGetMainCategories } from '@api/category/categoryApis.rq';
import useModal from '@hooks/useModal';
import CategoriesModal from '@com/_organisms/CategoriesModal';

const Categories = () => {
  const { data, isLoading } = useGetMainCategories();
  const categoryDate = data?.value?.queryResult;
  
  const { addModal } = useModal();
  return (
    <div className="flex ">
      <ScrollSlider className="px-4 gap-x-2">
        {isLoading === false && categoryDate?.length
          ? categoryDate?.map((item,index) => {
              return (
                <div key={index} className="w-[104px] bg-grey-100 rounded-md">
                  <CategoryItem
                    handleClick={() =>
                      addModal({
                        modal: CategoriesModal,
                        props: {
                          currentCategoryProps: item?.categoryNameLevel1,
                          parentCodeProps: item?.categoryCodeLevel1,
                        },
                      })
                    }
                    key={item?.categoryCodeLevel1}
                    imageUrl={secondSlidePNG}
                    name={item?.categoryNameLevel1}
                  />
                </div>
              );
            })
          : null}
      </ScrollSlider>
    </div>
  );
};
export default Categories;
