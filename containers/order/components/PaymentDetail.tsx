import Divider from '@com/_atoms/Divider';
import RenderPriceRow from '@com/_atoms/PriceRow';
import { colors } from '@configs/Theme';

const paymentDetail = {
  paymentDetail: 'جزییات پرداخت',
  totalCount: 'مبلغ کل سفارش',
  discountAmount: 'سود شما از این خرید',
  pharmacyCost: 'تعرفه خدماتی دارویی',
  packingCost: 'هزینه زیرساخت و خدمات',
  shipingCost: 'هزینه ارسال',
  total: 'هزینه کل',
};

type PaymentDetailProps = {
  data: any;
  isPaymentPage?: boolean;
};

const PaymentDetail = ({ data, isPaymentPage }: PaymentDetailProps) => {
  const hasDiscount = data?.orderDetails?.some(
    (item) => item?.discount?.percentage,
  );

  const totalPriceBeforeDiscount = data?.orderDetails?.reduce((acc, item) => {
    return (
      acc +
      (!item?.isunavailable
        ? item?.price * item?.quantity
        : item?.alternatives?.length > 0
          ? item?.alternatives[0]?.price * item?.alternatives[0]?.quantity
          : 0)
    );
  }, 0);

  return (
    <div className="w-full flex flex-col gap-3 py-3 px-4">
      <span className="text-content-primary text-base leading-6 font-medium">
        {paymentDetail?.paymentDetail}
      </span>

      <RenderPriceRow
        name={paymentDetail?.totalCount}
        value={hasDiscount ? totalPriceBeforeDiscount : data?.totalPrice}
      />

      {hasDiscount && (
        <RenderPriceRow
          name={paymentDetail?.discountAmount}
          value={totalPriceBeforeDiscount - data?.totalPrice}
          priceColor={colors.green[500]}
        />
      )}

      <RenderPriceRow
        name={paymentDetail?.pharmacyCost}
        value={data?.supervisorPharmacyPrice}
      />

      <RenderPriceRow
        deliveryFinalPrice={data?.delivery?.finalPrice}
        deliveryDiscountAmount={data?.delivery?.discount?.amount}
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
