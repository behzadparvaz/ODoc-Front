import Button from '@com/_atoms/Button';
import { BottomModalContainer } from '@com/modal/containers/bottomMobileContainer';
import { generalTexts } from '@com/texts/generalTexts';
import { orderText } from '@com/texts/orderText';
import useModal from '@hooks/useModal';
import React from 'react';

type Props = { reason: any };

export default function OrderCancelationDetailModal({ reason }: Props) {
  const { removeLastModal } = useModal();
  return (
    <BottomModalContainer
      height={'auto'}
      hasCloseButton={false}
      className="!overflow-hidden"
      title={orderText?.reasonCancelationOrder}
    >
      <p className='py-3 mt-4 border-t border-grey-100 text-sm bg-red-50 text-red-900 px-3'>{reason}</p>
      <div className="flex gap-x-2 mt-8 mb-5">
        <Button
          variant="tertiary"
          className="w-full !border-grey-800"
          handleClick={() => {
            removeLastModal();
          }}
          size="large"
        >
          {generalTexts?.IRealized}
        </Button>
      </div>
    </BottomModalContainer>
  );
}
