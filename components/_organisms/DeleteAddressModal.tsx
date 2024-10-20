import { useDeleteLocation } from '@api/user/user.rq';
import { Button } from '@com/_atoms/NewButton';
import { FailIcon } from '@com/icons';
import { BottomModalContainer } from '@com/modal/containers/bottomMobileContainer';
import useModal from '@hooks/useModal';

type DeleteAddressModalProps = {
  addressId: any;
};

const DeleteAddressModal = ({ addressId }: DeleteAddressModalProps) => {
  const { removeLastModal } = useModal();

  const {
    mutate: mutateDeleteLocation,
    isLoading: mutateDeleteLocationLoading,
  } = useDeleteLocation();

  const handleDeleteAddress = () => {
    mutateDeleteLocation({
      Id: addressId,
    });
  };

  return (
    <BottomModalContainer height={314} hasCloseButton={false}>
      <div className="flex flex-col items-center justify-center gap-y-4 p-4">
        <div className="w-[56px] h-[56px] flex justify-center items-center bg-red-50 rounded-full">
          <FailIcon />
        </div>

        <span className="text-md font-semibold leading-7">حذف آدرس منتخب</span>

        <span className="text-md font-normal leading-6 text-grey-600">
          آیا از حذف این آدرس مطمئن هستید؟
        </span>

        <div className="w-full flex gap-x-4">
          <Button
            variant="secondary"
            className="w-full"
            onClick={removeLastModal}
            disabled={mutateDeleteLocationLoading}
          >
            انصراف
          </Button>
          <Button
            variant="danger"
            className="w-full"
            onClick={handleDeleteAddress}
            isLoading={mutateDeleteLocationLoading}
          >
            حذف
          </Button>
        </div>
      </div>
    </BottomModalContainer>
  );
};
export default DeleteAddressModal;
