import CancelOrderModal from '@com/_molecules/CancelOrderModal';
import useModal from '@hooks/useModal';
import { useRouter } from 'next/router';

type CancelOrderProps = {
  orderDetail?: any;
};

const CancelOrder = ({ orderDetail }: CancelOrderProps) => {
  const { query } = useRouter();
  const { addModal } = useModal();

  const handleCancelOrder = () => {
    addModal({
      modal: CancelOrderModal,
      props: {
        orderCode: query?.orderCode as string,
        orderDetail: orderDetail,
      },
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
