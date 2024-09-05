import { useGetCategoriesLevelTwoAndLevelThree } from '@api/category/categoryApis.rq';
import CategoryModalItem from '@com/_atoms/CategoryModalItem';
import { BottomModalContainer } from '@com/modal/containers/bottomMobileContainer';
import useModal from '@hooks/useModal';
import { routeList } from '@routes/routeList';
import { useRouter } from 'next/router';
import { useState } from 'react';

interface Props {
  parentCodeProps: string;
  currentCategoryProps: string;
}

const CategoriesModal = ({ parentCodeProps, currentCategoryProps }: Props) => {
  const [level, setLevel] = useState<2 | 3>(2);
  const [parentCode, setParentCode] = useState<string>(parentCodeProps);
  const [currentCategory, setCurrentCategory] =
    useState<string>(currentCategoryProps);
  const { data } = useGetCategoriesLevelTwoAndLevelThree({
    level: level,
    parentCode: parentCode,
  });
  const value = data?.value?.queryResult;
  const { push } = useRouter();
  const { removeLastModal } = useModal();
  return (
    <BottomModalContainer
      height={'auto'}
      hasCloseButton={true}
      title={currentCategory}
    >
      <div className="flex gap-y-3 flex-col max-h-[440px] overflow-auto">
        {value?.map((item, index) => {
          const title = level === 2 ? item?.categoryNameLevel2 : item?.shape;
          return (
            <CategoryModalItem
              className="py-4 border-b border-grey-200"
              title={title}
              handleClick={() => {
                if (level === 2) {
                  setLevel(3),
                    setParentCode(item?.categoryCodeLevel2),
                    setCurrentCategory(title);
                } else {
                  removeLastModal();
                  push({
                    pathname: routeList?.category,
                    query: {
                      CategoryCodeLevel2: item?.categoryCodeLevel2,
                      category: `${title} ${currentCategory}`,
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
    </BottomModalContainer>
  );
};
export default CategoriesModal;
