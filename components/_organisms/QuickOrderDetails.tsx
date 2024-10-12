import { useCreateOrderInlineStep2 } from '@api/order/orderApis.rq';
import AddressBoxTypeTwo from '@com/_atoms/AddressBoxTypeTwo';
import Button from '@com/_atoms/Button';
import QuickOrderItem from '@com/_atoms/QuickOrderItem';
import Textarea from '@com/_atoms/Textarea.nd';
import { RootState } from '@utilities/types';
import { useState } from 'react';
import { useSelector } from 'react-redux';

interface props {
  data: any;
}

const QuickOrderDetails = ({ data }: props) => {
  const [description, setDescription] = useState('');
  const { user } = useSelector((state: RootState) => state.user);
  const defaultAddress = user?.defaultAddress;

  const { mutate, isLoading } = useCreateOrderInlineStep2();
  const handleSendForm = () => {
    const body = {
      uuid: data?.orderUuid,
      addressId: defaultAddress?.id,
      description: description,
    };
    mutate(body, {
      onSuccess: (data) => {
        console.log(data);
      },
    });
  };
  return (
    <div className="w-full px-4">
      <div className="w-full">
        {data?.orderDetails?.map((item, index) => {
          return <QuickOrderItem data={item} key={index} />;
        })}
        <AddressBoxTypeTwo />
        <Textarea
          onChange={(e) => setDescription(e?.target?.value)}
          placeholder="برای پزشک توضیح بنویسید"
          textareaClassName="bg-gray-100 h-32 p-4 resize-none"
          className="mt-4 pt-5 border-t border-gray-200"
          labelClassName="text-black font-medium"
          label="توضیحات"
        />
      </div>

      <Button
        buttonType="contained"
        variant="primary"
        className="w-full mb-9 mt-24"
        size="large"
        type="button"
        handleClick={() => handleSendForm()}
        isLoading={isLoading}
      >
        تایید و ادامه
      </Button>
    </div>
  );
};
export default QuickOrderDetails;
