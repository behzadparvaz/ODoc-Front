import { useGetDeliveryCode } from '@api/order/orderApis.rq';

type DeliveryDetailProps = {
  data: any;
};

const DeliveryDetail = ({ data }: DeliveryDetailProps) => {
  const { data: deliveryCode } = useGetDeliveryCode(
    (data?.orderStatus?.name === 'adelivery' ||
      data?.orderStatus?.name === 'senddelivery') &&
      data?.orderCode,
  );

  return (
    <div className="w-full flex flex-col px-4 py-2">
      <span className="text-base font-medium h-[52px] py-3">اطلاعات پیک</span>
      <div className="flex items-center justify-between h-[64px]">
        <span className="text-sm text-content-primary">مجتبی فرجی</span>
        <span className="text-lg text-center text-content-primary border border-border-inversePrimary rounded-xl w-[63px]  h-[58px] flex justify-center items-center overflow-hidden text-wrap ">
          123 56789
        </span>
      </div>
      <div className="w-full h-[52px] flex items-center justify-between">
        <span className="text-sm text-content-primary">کد تحویل سفارش</span>

        <div className="flex items-center flex-row-reverse gap-x-2">
          {deliveryCode
            ?.toString()
            .split('')
            .map((item, index) => (
              <span
                key={index + item}
                className="flex items-center justify-center bg-surface-disable h-[24px] w-[24px] rounded-base text-content-secondary text-sm"
              >
                {item}
              </span>
            ))}
        </div>
      </div>
    </div>
  );
};

export default DeliveryDetail;
