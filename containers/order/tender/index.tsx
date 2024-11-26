import { useRouter } from 'next/router';

import { useGetTenderItems } from '@api/tender/tenderApis.rq';
import TenderCard from '@com/_organisms/TenderCard';
import { MainLayout } from '@com/Layout';
import Spinner from '@com/_atoms/Spinner';
import dynamic from 'next/dynamic';
import Divider from '@com/_atoms/Divider';
import GeneralDetail from '../components/GeneralDetail';
import { routeList } from '@routes/routeList';

const Rules = dynamic(() => import('../components/Rules'));
const AddressDetail = dynamic(() => import('../components/AddressDetail'));
const DescriptionDetail = dynamic(
  () => import('../components/DescriptionDetail'),
);
const CancelOrder = dynamic(() => import('../components/CancelOrder'));
const Contact = dynamic(() => import('../components/Contact'));

const TenderContainer = () => {
  const { query, push } = useRouter();

  const { orderCode } = query;

  const { data: tenderData, isLoading: tenderIsLoading } = useGetTenderItems(
    orderCode as string,
  );

  const renderTenderCard = () => {
    if (!tenderIsLoading && !tenderData?.queryResult)
      return <div className="w-full text-center">هیچ پیشنهادی یافت نشد</div>;

    return (
      <div className="flex flex-col gap-4 px-4 py-4">
        <span className="text-base font-medium text-content-primary">
          لیست داروخانه ها
        </span>

        {tenderData?.queryResult?.map((item) => (
          <TenderCard
            key={item?.id}
            data={item}
            offerId={item?.id}
            orderCode={orderCode as string}
          />
        ))}
      </div>
    );
  };

  return (
    <div>
      <MainLayout
        title="انتخاب داروخانه"
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
        {tenderIsLoading ? (
          <div className="w-full text-center">
            <Spinner className="h-full min-h-[200px] w-full flex justify-center items-center" />
          </div>
        ) : (
          <div className="w-full h-max rounded-t-lg flex flex-col">
            <GeneralDetail data={tenderData?.queryResult?.[0]} />

            <AddressDetail
              address={
                tenderData?.queryResult?.[0]?.customer?.addresses[0]
                  ?.valueAddress
              }
            />

            <Divider />

            {renderTenderCard()}

            {tenderData?.queryResult?.[0]?.comment && (
              <>
                <Divider />

                <DescriptionDetail
                  description={tenderData?.queryResult?.[0]?.comment}
                />
              </>
            )}

            <Divider />

            <Rules />

            <Divider />

            <Contact />

            <Divider />

            {(tenderData?.queryResult?.[0]?.orderStatus?.name === 'apay' ||
              tenderData?.queryResult?.[0]?.orderStatus?.name === 'nfc') && (
              <CancelOrder step="apay" />
            )}
          </div>
        )}
      </MainLayout>
    </div>
  );
};

export default TenderContainer;
