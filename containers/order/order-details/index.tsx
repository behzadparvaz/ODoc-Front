import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { MainLayout } from '@com/Layout';
import { useGetOrderDetails } from '@api/order/orderApis.rq';
import Spinner from '@com/_atoms/Spinner';
import Divider from '@com/_atoms/Divider';
import OrderDetailItems from '@com/_molecules/OrderDetailItems';

import GeneralDetail from '../components/GeneralDetail';

const PaymentDetail = dynamic(() => import('../components/PaymentDetail'));
const Rules = dynamic(() => import('../components/Rules'));
const AddressDetail = dynamic(() => import('../components/AddressDetail'));
const DescriptionDetail = dynamic(
  () => import('../components/DescriptionDetail'),
);
const CancelOrder = dynamic(() => import('../components/CancelOrder'));
const Contact = dynamic(() => import('../components/Contact'));

const OrderDetailsContainer = () => {
  const { query } = useRouter();

  const { data, isLoading } = useGetOrderDetails(query?.orderCode as string);

  return (
    <MainLayout
      title="جزئیات سفارش"
      hasHeader
      headerType="withoutLogo"
      hasBackButton
    >
      {isLoading ? (
        <Spinner className="h-full min-h-[200px] w-full flex justify-center items-center" />
      ) : (
        <div className="w-full h-max rounded-t-lg flex flex-col">
          <GeneralDetail data={data} />

          <AddressDetail address={data?.customer?.addresses[0]?.valueAddress} />

          {data?.orderStatus?.name !== 'draft' && (
            <OrderDetailItems data={data} />
          )}

          {data?.description && (
            <>
              <Divider />

              <DescriptionDetail description={data?.description} />
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

          <Divider />

          <Rules />

          <Divider />

          <Contact />

          <Divider />

          {(data?.orderStatus?.name === 'draft' ||
            data?.orderStatus?.name === 'apay') && <CancelOrder />}
        </div>
      )}
    </MainLayout>
  );
};

export default OrderDetailsContainer;
