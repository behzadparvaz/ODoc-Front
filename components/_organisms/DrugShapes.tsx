import { useGetDrugTypes } from '@api/other/otherApis.rq';
import { BottomModalContainer } from '@com/modal/containers/bottomMobileContainer';
import useModal from '@hooks/useModal';

interface Props {
  handleClick: (item) => void;
}

const DrugShapes = ({ handleClick }: Props) => {
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
              className="py-2.5 border-b cursor-pointer border-gray-100"
            >
              {item?.name}
            </div>
          );
        })}
    </BottomModalContainer>
  );
};
export default DrugShapes;
