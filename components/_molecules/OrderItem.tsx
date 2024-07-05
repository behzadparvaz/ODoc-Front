import Button from "@com/_atoms/Button"
import OrderCancelConfirmationBottomSheet from "@com/_organisms/OrderCancelConfirmationBottomSheet"
import { orderText } from "@com/texts/orderText"
import useModal from "@hooks/useModal"
import { getOrderStatusMessage } from "@utilities/getOrderStatusMessage"
import { convertGregorianToJalali, convertRialToToman, getTime } from "@utilities/mainUtils"

interface Props {
    className?: string,
    data: any,
    handleClikOnPaymentButton: () => void
}

const OrderItem = ({ data, handleClikOnPaymentButton, className = '' }: Props) => {
    const { addModal } = useModal()
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
                <div>نام ثبت کننده:{data.customer?.name}</div>
            </div>
            <div className="flex items-center justify-between py-2 px-4">
                <div className="flex items-center">
                    وضعیت سفارش:
                    <p className="text-teal-600 mr-1">
                        {getOrderStatusMessage(data.orderStatus?.id)}
                    </p>
                </div>
            </div>
            {data?.orderStatus?.id === 2 && <>
                <div className="flex items-center justify-between py-2 px-4">
                    <div className="flex items-center">
                        مبلغ سفارش:
                        <p className="text-teal-600 mr-1">
                            {convertRialToToman(data?.finalPrice)}
                        </p>
                    </div>
                </div>
                <div className="flex px-3 py-3 border-t border-grey-200 gap-x-2 bg-grey-50">
                    <Button
                        className="flex-1"
                        size="large"
                        buttonType="contained"
                        handleClick={() =>
                            handleClikOnPaymentButton()
                        }
                        variant={'primary'}
                    >
                        پرداخت
                    </Button>
                    <Button
                        className="flex-1 bg-red-200 text-red-700"
                        size="large"
                        buttonType="contained"
                        handleClick={() =>
                            addModal({
                                modal: OrderCancelConfirmationBottomSheet,
                                props: {
                                    orderCode: data?.referenceNumber
                                }
                            })
                        }
                    >
                        {orderText?.orderCancelation}
                    </Button>
                </div>
            </>}
        </div>
    )
}
export default OrderItem