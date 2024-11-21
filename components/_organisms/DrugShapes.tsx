import { useGetDrugTypes } from '@api/other/otherApis.rq';
import { BottomModalContainer } from '@com/modal/containers/bottomMobileContainer';
import useModal from '@hooks/useModal';

interface Props {
  handleClick: (item) => void;
  isShowUnit?: boolean;
}

const DrugShapes = ({ handleClick, isShowUnit = true }: Props) => {
  const { removeLastModal } = useModal();

  const { data, isLoading } = useGetDrugTypes();

  const handleClickItem = (item) => {
    handleClick(item);
    removeLastModal();
  };

  return (
    <BottomModalContainer title="نوع دارو" height={314} hasCloseButton={true}>
      {!isLoading &&
        data?.data?.map((item) => {
          return (
            <div
              onClick={() => handleClickItem(item)}
              key={item?.id}
              className="py-2.5 border-b cursor-pointer border-gray-100 flex gap-1"
            >
              <span>{item?.name}</span>
              <span>
                {isShowUnit && item.unit !== '-' ? `(${item.unit})` : ''}
              </span>
            </div>
          );
        })}
    </BottomModalContainer>
  );
};
export default DrugShapes;
