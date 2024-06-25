import { useCreateOrderInsurance } from '@api/order/orderApis.rq';
import Button from '@com/_atoms/Button';
import { BottomModalContainer } from '@com/modal/containers/bottomMobileContainer';
import { orderText } from '@com/texts/orderText';
import useModal from '@hooks/useModal';
import React from 'react';

type Props = { data: any };

export default function OrderRegisterConfirmationBottomSheet({ data }: Props) {
  const { removeLastModal } = useModal();
  const { mutate: mutateCreateOrderInsurance } = useCreateOrderInsurance();
  const handleRegisterOrder = () => {
    mutateCreateOrderInsurance(data);
    removeLastModal();
  };

  return (
    <BottomModalContainer
      height={'auto'}
      hasCloseButton={true}
      className="!overflow-hidden"
      title={orderText?.orderConfirmationQuestion}
    >
      <p className="text-sm text text-grey-800 my-3">{`کد رهگیری: ${data?.ReferenceNumber}`}</p>
      <p className="text-sm text text-grey-800 mb-3">{`نام تحویل گیرنده: ${data?.customerName}`}</p>
      <p className="text-sm text text-grey-800 mb-3">{`کدملی: ${data?.nationalCode}`}</p>
      <p className="text-sm text text-grey-800 mb-3">{`آدرس: ${data?.valueAddress}`}</p>
      <div className="grid w-full grid-cols-2 gap-3 mt-5">
        <div>
          <Button
            variant="tertiary"
            className="w-full !border-grey-800"
            handleClick={() => {
              removeLastModal();
            }}
            size="large"
          >
            انصراف
          </Button>
        </div>
        <div>
          <Button
            className="w-full"
            variant="primary"
            handleClick={() => {
              handleRegisterOrder();
            }}
            size="large"
          >
            ثبت سفارش
          </Button>
        </div>
      </div>
    </BottomModalContainer>
  );
}
