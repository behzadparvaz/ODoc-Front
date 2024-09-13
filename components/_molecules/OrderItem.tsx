import Button from '@com/_atoms/Button';
import NfcReasonBottomSheet from '@com/_organisms/NfcReasonBottomSheet';
import OrderCancelConfirmationBottomSheet from '@com/_organisms/OrderCancelConfirmationBottomSheet';
import OrderCancelationDetailModal from '@com/_organisms/OrderCancelationDetailModal';
import { OpenEyeIconFill } from '@com/icons';
import { orderText } from '@com/texts/orderText';
import { colors } from '@configs/Theme';
import useModal from '@hooks/useModal';
import { getOrderStatusMessage } from '@utilities/getOrderStatusMessage';
import {
  convertGregorianToJalali,
  convertRialToToman,
  getTime,
} from '@utilities/mainUtils';
import { useRouter } from 'next/router';

interface Props {
  className?: string;
  data: any;
  handleClikOnPaymentButton: () => void;
}

const OrderItem = ({
  data,
  handleClikOnPaymentButton,
  className = '',
}: Props) => {
  const { addModal } = useModal();
  const router = useRouter();

  const handleClickOnCommentBottomSheet = (comment, orderCode, finalPrice) => {
    addModal({
      modal: NfcReasonBottomSheet,
      props: {
        comment: comment,
        orderCode: orderCode,
        finalPrice: finalPrice,
      },
    });
  };

  return (
    <div
      className={`w-full border overflow-hidden mb-4 border-grey-200 rounded-lg ${className}`}
    >
      <div className="text-left border-b px-4 py-2 bg-grey-50 flex justify-between border-grey-200">
        <div>تاریخ ثبت</div>
        <div>{`${getTime(data?.createDateTime)} - ${convertGregorianToJalali(data?.createDateTime)}`}</div>
      </div>
      <div className="w-full flex flex-col gap-y-3 py-2 px-4">
        <div>کد سفارش:{data.referenceNumber}</div>
        <div>کد رهگیری:{data.orderCode}</div>
        <div>نام صاحب نسخه:{data.customer?.name}</div>
      </div>
      <div className="flex items-center justify-between py-2 px-4">
        <div className="flex items-center">
          وضعیت سفارش:
          <p
            className={`${data.orderStatus?.id === 9 || data.orderStatus?.id === 10 || data.orderStatus?.id === 11 ? 'text-red-600' : 'text-teal-600'} mr-1`}
          >
            <span
              onClick={() =>
                data.orderStatus?.id === 11
                  ? addModal({
                      modal: OrderCancelationDetailModal,
                      props: {
                        reason: data?.declineType?.name,
                      },
                    })
                  : null
              }
              className={`flex gap-x-1 items-center`}
            >
              {getOrderStatusMessage(data.orderStatus?.id)}
              {data.orderStatus?.id === 11 ? (
                <OpenEyeIconFill
                  width={18}
                  height={18}
                  fill={colors?.red[600]}
                />
              ) : null}
            </span>
          </p>
        </div>
      </div>
      {data?.orderStatus?.id === 2 && (
        <div className="flex items-center justify-between py-2 px-4">
          <div className="flex items-center">
            مبلغ سفارش:
            <p className="text-teal-600 mr-1">
              {convertRialToToman(data?.finalPrice)}
            </p>
          </div>
        </div>
      )}
      {(data?.orderStatus?.id === 2 ||
        data?.orderStatus?.id === 0 ||
        data?.orderStatus?.id === 4) && (
        <div
          className={`flex justify-end px-3 py-3 border-t border-grey-200 gap-x-2 bg-grey-50`}
        >
          {data?.orderStatus?.id === 2 && (
            <Button
              size="medium"
              buttonType="contained"
              handleClick={() => router.push(`/app/tender/${data?.orderCode}`)}
              variant={'primary'}
            >
              انتخاب داروخانه
            </Button>
          )}
          {data?.orderStatus?.id !== 2 && (
            <Button
              className={`${data?.orderStatus?.id === 0 ? '' : 'flex-1'} bg-red-200 text-red-700 text-sm`}
              size="medium"
              buttonType="contained"
              handleClick={() =>
                addModal({
                  modal: OrderCancelConfirmationBottomSheet,
                  props: {
                    orderCode: data?.orderCode,
                  },
                })
              }
            >
              {orderText?.orderCancelation}
            </Button>
          )}
          {data?.orderStatus?.id === 4 && (
            <Button
              className="flex-1 px-0 text-sm"
              size="medium"
              buttonType="contained"
              handleClick={() =>
                handleClickOnCommentBottomSheet(
                  data?.alternative?.comment,
                  data?.orderCode,
                  data?.finalPrice,
                )
              }
              variant={'primary'}
            >
              توضیحات مسئول فنی{' '}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
export default OrderItem;
