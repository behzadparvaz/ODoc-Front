import classNames from 'classnames';
import { useRouter } from 'next/router';

import DeleteAddressModal from '@com/_organisms/DeleteAddressModal';
import { StarIcon } from '@com/icons';
import { profileText } from '@com/texts/profileText';
import { colors } from '@configs/Theme';
import useModal from '@hooks/useModal';
import Icon from '@utilities/icon';
import { routeList } from '@routes/routeList';

type AddressItemProps = {
  addressInfo: any;
  activeItem?: boolean;
  handleEditItem?: () => void;
};

const AddressItem = ({
  addressInfo,
  activeItem,
  handleEditItem,
}: AddressItemProps) => {
  const { push, pathname } = useRouter();
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
        'w-full h-[78px] grid grid-cols-[40px_1fr_32px_32px] items-center gap-x-2 px-4 py-3',
        activeItem && 'bg-surface-secondary',
      )}
    >
      <div
        className={classNames(
          'col-start-1 !w-[40px] !h-[40px] flex justify-center items-center rounded-full',
          activeItem ? 'bg-surface-inverse-primary' : 'bg-surface-secondary',
        )}
      >
        <StarIcon
          width={16}
          height={15}
          fill={activeItem ? colors?.white : colors?.black}
        />
      </div>

      <div className="col-start-2 flex flex-col gap-y-3 items-start flex-1 overflow-hidden cursor-pointer">
        {addressInfo?.name && (
          <div className="w-full text-xs text-content-primary mb-1 font-semibold">
            {addressInfo?.name}
          </div>
        )}

        <span className="w-full text-2xs text-content-secondary mb-1 truncate">
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

      <div
        className="col-start-3 cursor-pointer w-8 h-8 flex justify-center items-center bg-grey-50 rounded-full"
        onClick={(e) => {
          e.stopPropagation();
          return pathname === '/app'
            ? handleEditItem()
            : push(`${routeList?.editAddress}/${addressInfo?.id}`);
        }}
      >
        <Icon
          name="PencilLine"
          width={1.25}
          height={1.25}
          fill={colors?.black}
        />
      </div>

      <div
        className="col-start-4 cursor-pointer w-8 h-8 flex justify-center items-center bg-red-50 rounded-full"
        onClick={(e) => {
          handleOpenDeleteAddressModal();
          e.stopPropagation();
        }}
      >
        <Icon name="Trash" width={1.25} height={1.25} fill={colors?.red[400]} />
      </div>
    </div>
  );
};
export default AddressItem;
