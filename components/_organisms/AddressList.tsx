import AddressItem from '@com/_atoms/AddressItem';
import { useState } from 'react';

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
  const [addressSelected, setAddressSelected] = useState(null);

  const handleClick = (item) => {
    if (inOrderPage) {
      handleClickItem(item);
      setAddressSelected(item?.id);
    } else {
      return null;
    }
  };

  return (
    <div className="w-full">
      {data?.map((item) => {
        const activeItem = addressSelected === item?.id;
        return (
          <>
            <div key={item?.id} onClick={(e) => handleClick(item)}>
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
