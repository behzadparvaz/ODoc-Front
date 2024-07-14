import { useFinishOrderPayment } from '@api/order/orderApis.rq';
import Button from '@com/_atoms/Button';
import { BottomModalContainer } from '@com/modal/containers/bottomMobileContainer';
import useModal from '@hooks/useModal';
import React from 'react';

type Props = { comment: string; orderCode: number; finalPrice: number };

export default function NfcReasonBottomSheet({
  comment,
  orderCode,
  finalPrice,
}: Props) {
  const { removeLastModal } = useModal();
  const { mutate: mutatePayment } = useFinishOrderPayment();
  const handleClikOnPaymentButton = () => {
    const body = {
      orderCode: orderCode,
      finalPrice: finalPrice,
    };
    mutatePayment(body);
  };
  return (
    <BottomModalContainer
      height={180}
      hasCloseButton={false}
      className="!overflow-hidden flex flex-col justify-between"
      title="توضیحات مسئول فنی"
    >
      <p className="text-grey-600 mt-5">{comment}</p>
      <p className="text-grey-600 mt-1">{finalPrice}</p>
      <div className="flex justify-center">
        <Button
          handleClick={removeLastModal}
          buttonType="outlined"
          variant="primary"
          size="large"
          className="w-1/2 mt-4"
        >
          متوجه شدم
        </Button>
        <Button
          handleClick={() => handleClikOnPaymentButton()}
          buttonType="contained"
          variant="primary"
          size="large"
          className="w-1/2 mt-4 mr-2"
        >
          پرداخت
        </Button>
      </div>
    </BottomModalContainer>
  );
}
