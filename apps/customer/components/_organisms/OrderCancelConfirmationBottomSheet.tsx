import { useCancelOrder } from '@api/order/orderApis.rq';
import Button from '@com/_atoms/Button';
import { BottomModalContainer } from '@com/modal/containers/bottomMobileContainer';
import { generalTexts } from '@com/texts/generalTexts';
import { orderText } from '@com/texts/orderText';
import useModal from '@hooks/useModal';
import { getDynamicText } from '@utilities/mainUtils';
import React from 'react';

type Props = { orderCode: any };

export default function OrderCancelConfirmationBottomSheet({ orderCode }: Props) {
  const { removeLastModal } = useModal();
  const { mutate: mutateCancelOrder } = useCancelOrder();
  const handleCancelOrder = () => {
    mutateCancelOrder({
      orderCode: orderCode
    }, {
      onSuccess: () => {
        removeLastModal();
      }
    });
  };

  return (
    <BottomModalContainer
      height={'auto'}
      hasCloseButton={false}
      className="!overflow-hidden"
      title=
      {getDynamicText(orderText.orderCancelConfirmationQuestion, {
        orderCode: orderCode,
      })}
    >
      <div className="flex gap-x-2 mt-8 mb-5">
        <Button
          variant="tertiary"
          className="w-full !border-grey-800"
          handleClick={() => {
            removeLastModal();
          }}
          size="large"
        >
          {generalTexts?.cancel}
        </Button>
        <Button
          className="w-full"
          variant="primary"
          handleClick={() => {
            handleCancelOrder();
          }}
          size="large"
        >
          {orderText?.orderCancelation}
        </Button>
      </div>
      <div>
      </div>
    </BottomModalContainer>
  );
}
