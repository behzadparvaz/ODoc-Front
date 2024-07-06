import { BottomModalContainer } from '@com/modal/containers/bottomMobileContainer';
import React from 'react';

type Props = { comment: string };

export default function NfcReasonBottomSheet({ comment }: Props) {
  return (
    <BottomModalContainer
      height={150}
      hasCloseButton
      className="!overflow-hidden"
      title="توضیحات مسئول فنی"
    >
      <p className="text-grey-600 mt-5">{comment}</p>
    </BottomModalContainer>
  );
}
