import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { MainLayout } from '@com/Layout';
import { useGetOrderDetails } from '@api/order/orderApis.rq';
import Spinner from '@com/_atoms/Spinner';
import Divider from '@com/_atoms/Divider';
import OrderDetailItems from '@com/_molecules/OrderDetailItems';

import GeneralDetail from '../components/GeneralDetail';
import { routeList } from '@routes/routeList';

const Tender = dynamic(() => import('../components/Tender'));
const PaymentDetail = dynamic(() => import('../components/PaymentDetail'));
const Rules = dynamic(() => import('../components/Rules'));
const AddressDetail = dynamic(() => import('../components/AddressDetail'));
const DescriptionDetail = dynamic(
  () => import('../components/DescriptionDetail'),
);
const CancelOrder = dynamic(() => import('../components/CancelOrder'));
const Contact = dynamic(() => import('../components/Contact'));
const DeliveryDetail = dynamic(() => import('../components/DeliveryDetail'));
const VendorDetail = dynamic(() => import('../components/VendorDetail'));

const OrderDetailsContainer = () => {
  const { query, push } = useRouter();

  const { data, isLoading } = useGetOrderDetails(query?.orderCode as string);

  return (
    <MainLayout
      title="جزئیات سفارش"
      hasHeader
      headerType="withoutLogo"
      hasBackButton
      backIconHandler={() =>
        push(
          query?.previousPage === 'home' || query?.previousPage === 'basket'
            ? `${routeList.homeRoute}`
            : `${routeList.ordersHistory}`,
        )
      }
    >
      {isLoading ? (
        <Spinner className="h-full min-h-[200px] w-full flex justify-center items-center" />
      ) : (
        <div className="w-full h-max rounded-t-lg flex flex-col">
          <GeneralDetail data={data} />

          {(data?.orderStatus?.name === 'adelivery' ||
            data?.orderStatus?.name === 'senddelivery') && (
            <>
              <DeliveryDetail data={data} />

              <Divider />
            </>
          )}

          <AddressDetail address={data?.customer?.addresses[0]?.valueAddress} />

          {(data?.orderStatus?.name === 'apay' ||
            data?.orderStatus?.name === 'nfc') && (
            <>
              <Divider />

              <Tender orderCode={data?.orderCode} />
            </>
          )}

          {data?.orderStatus?.name !== 'draft' &&
            data?.orderStatus?.name !== 'ack' &&
            data?.orderStatus?.name !== 'apay' &&
            data?.orderStatus?.name !== 'nfc' && (
              <>
                <Divider />

                <div className="px-4 py-4">
                  <VendorDetail data={data} />
                </div>
              </>
            )}

          {data?.orderStatus?.name !== 'apay' &&
            data?.orderStatus?.name !== 'nfc' && (
              <>
                <Divider />

                <OrderDetailItems data={data} />
              </>
            )}

          {data?.description?.comment && (
            <>
              <Divider />

              <DescriptionDetail description={data?.description?.comment} />
            </>
          )}

          {(data?.orderStatus?.name === 'pick' ||
            data?.orderStatus?.name === 'accept' ||
            data?.orderStatus?.name === 'adelivery' ||
            data?.orderStatus?.name === 'senddelivery' ||
            data?.orderStatus?.name === 'deliverd') && (
            <>
              <Divider />

              <PaymentDetail data={data} />
            </>
          )}

          {(data?.orderStatus?.name === 'cancelcustomer' ||
            data?.orderStatus?.name === 'cancelvendor' ||
            data?.orderStatus?.name === 'reject' ||
            data?.orderStatus?.name === 'return') && (
            <>
              <Divider />

              <div className="flex flex-col gap-y-2 p-4">
                <span className="text-base text-content-primary font-medium">
                  علت لغو سفارش
                </span>
                <span className="text-sm text-content-tertiary">
                  {data?.declineType?.id === 17
                    ? data?.cancelReason
                    : data?.declineType?.name}
                </span>
              </div>
            </>
          )}

          <Divider />

          <Rules />

          <Divider />

          <Contact />

          <Divider />

          {(data?.orderStatus?.name === 'draft' ||
            data?.orderStatus?.name === 'ack' ||
            data?.orderStatus?.name === 'apay' ||
            data?.orderStatus?.name === 'nfc') && <CancelOrder />}
        </div>
      )}
    </MainLayout>
  );
};

export default OrderDetailsContainer;
