import { useDispatch, useSelector } from 'react-redux';

import AddressItem from '@com/_atoms/AddressItem';
import { RootState } from '@utilities/types';
import { setUserAction } from '@redux/user/userActions';
import useModal from '@hooks/useModal';

type AddressListProps = {
  data: any;
  handleClickItem?: Function;
  inOrderPage?: boolean;
};

const AddressList = ({
  data,
  handleClickItem,
  inOrderPage = false,
}: AddressListProps) => {
  const { removeLastModal } = useModal();
  const { user } = useSelector((state: RootState) => state.user);
  const defaultAddress = user?.defaultAddress;
  const dispatch = useDispatch();

  const handleClickAddress = (item) => {
    dispatch(
      setUserAction({
        defaultAddress: item,
      }),
    ),
      removeLastModal();
  };

  return (
    <div className="w-full ">
      {data?.map((item) => {
        const activeItem = defaultAddress?.id === item?.id;
        return (
          <>
            <div key={item?.id} onClick={(e) => handleClickAddress(item)}>
              <AddressItem activeItem={activeItem} addressInfo={item} />
            </div>

            <div className="w-full h-2 bg-grey-50" />
          </>
        );
      })}
    </div>
  );
};
export default AddressList;
