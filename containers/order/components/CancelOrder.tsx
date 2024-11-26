import CancelOrderModal from '@com/_molecules/CancelOrderModal';
import useModal from '@hooks/useModal';
import { useRouter } from 'next/router';

type CancelOrderProps = {
  step: 'draft' | 'apay';
};

const CancelOrder = ({ step }: CancelOrderProps) => {
  const { query } = useRouter();
  const { addModal } = useModal();

  const handleCancelOrder = () => {
    addModal({
      modal: CancelOrderModal,
      props: { orderCode: query?.orderCode as string, step: step },
    });
  };

  return (
    <div
      className="py-3 px-4 text-content-negative cursor-pointer"
      onClick={handleCancelOrder}
    >
      لغو سفارش
    </div>
  );
};

export default CancelOrder;
