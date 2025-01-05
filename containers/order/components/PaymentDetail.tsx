import Divider from '@com/_atoms/Divider';
import RenderPriceRow from '@com/_atoms/PriceRow';

const paymentDetail = {
  paymentDetail: 'جزییات پرداخت',
  patientShare: 'جمع سفارش',
  pharmacyCost: 'تعرفه خدماتی دارویی',
  packingCost: 'هزینه زیرساخت و خدمات',
  shipingCost: 'هزینه ارسال',
  total: 'جمع کل',
};

type PaymentDetailProps = {
  data: any;
  isPaymentPage?: boolean;
};

const PaymentDetail = ({ data, isPaymentPage }: PaymentDetailProps) => {
  return (
    <div className="w-full flex flex-col gap-3 py-3 px-4">
      <span className="text-content-primary text-base leading-6 font-medium">
        {paymentDetail?.paymentDetail}
      </span>

      <RenderPriceRow
        name={paymentDetail?.patientShare}
        value={data?.totalPrice}
      />
      <RenderPriceRow
        name={paymentDetail?.pharmacyCost}
        value={data?.supervisorPharmacyPrice}
      />
      <RenderPriceRow
        name={paymentDetail?.packingCost}
        value={data?.packingPrice}
      />
      <RenderPriceRow
        deliveryFinalPrice={data?.delivery?.finalPrice}
        deliveryDiscountAmount={data?.delivery?.discount.amount}
        name={paymentDetail?.shipingCost}
        value={data?.delivery?.deliveryPrice}
      />

      {!isPaymentPage && (
        <>
          <Divider />

          <RenderPriceRow
            name={paymentDetail?.total}
            value={data?.finalPrice}
          />
        </>
      )}
    </div>
  );
};

export default PaymentDetail;
