import Button from '@com/_atoms/Button';
import { BottomModalContainer } from '@com/modal/containers/bottomMobileContainer';
import useModal from '@hooks/useModal';
import React from 'react';

type Props = { comment: string };

export default function NfcReasonBottomSheet({ comment }: Props) {
  const { removeLastModal } = useModal()
  return (
    <BottomModalContainer
      height={150}
      hasCloseButton={false}
      className="!overflow-hidden flex flex-col justify-between"
      title="توضیحات مسئول فنی"
    >
      <p className="text-grey-600 mt-5">{comment}</p>
      <div className="flex justify-center">
        <Button handleClick={removeLastModal} buttonType='contained' variant='primary' size='large' className='w-1/2 mt-4'>متوجه شدم</Button>
      </div>
    </BottomModalContainer>
  );
}
