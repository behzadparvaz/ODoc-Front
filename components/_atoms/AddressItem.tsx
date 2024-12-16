import classNames from 'classnames';

import DeleteAddressModal from '@com/_organisms/DeleteAddressModal';
import { NewDeleteIcon, StarIcon } from '@com/icons';
import { profileText } from '@com/texts/profileText';
import { colors } from '@configs/Theme';
import useModal from '@hooks/useModal';

type AddressItemProps = {
  addressInfo: any;
  activeItem?: boolean;
};

const AddressItem = ({ addressInfo, activeItem }: AddressItemProps) => {
  const { addModal } = useModal();

  const handleOpenDeleteAddressModal = () => {
    addModal({
      modal: DeleteAddressModal,
      props: {
        addressId: addressInfo?.id,
      },
    });
  };

  return (
    <div
      className={classNames(
        'w-full h-[78px] flex items-center gap-x-4 px-4 py-3',
        activeItem && 'bg-surface-secondary',
      )}
    >
      <div
        className={classNames(
          '!w-[40px] !h-[40px] flex justify-center items-center rounded-full',
          activeItem ? 'bg-surface-inverse-primary' : 'bg-surface-secondary',
        )}
      >
        <StarIcon
          width={16}
          height={15}
          fill={activeItem ? colors?.white : colors?.black}
        />
      </div>

      <div className=" flex flex-col gap-y-3 items-start flex-1 overflow-hidden">
        {addressInfo?.name && (
          <div className="w-full text-xs text-grey-600 mb-1 font-semibold">
            {addressInfo?.name}
          </div>
        )}

        <span className="w-full text-2xs text-grey-600 mb-1 truncate">
          {addressInfo?.description}
          {addressInfo?.houseNumber?.length && (
            <span className="inline-block px-1">
              {`${profileText?.plaque} ${addressInfo?.houseNumber}`}
            </span>
          )}
          {addressInfo?.homeUnit &&
            `${profileText?.unit} ${addressInfo?.homeUnit}`}
        </span>
      </div>

      <div className="w-[44px] flex justify-end items-center gap-x-2">
        {/* <div
          className="cursor-pointer w-10 h-10 flex justify-center items-center bg-grey-50 rounded-full"
          onClick={() => {
            return;
          }}
        >
          <NewEditIcon width={24} height={24} fill={colors?.black} />
        </div> */}
        <div
          className="cursor-pointer w-10 h-10 flex justify-center items-center bg-red-50 rounded-full"
          onClick={(e) => {
            handleOpenDeleteAddressModal();
            e.stopPropagation();
          }}
        >
          <NewDeleteIcon width={24} height={24} />
        </div>
      </div>
    </div>
  );
};
export default AddressItem;
