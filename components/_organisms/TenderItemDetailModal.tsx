import { MouseEvent, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import classNames from 'classnames';

import { MainLayout } from '@com/Layout';
import TenderProductList from '@com/_organisms/TenderIProductList';
import TenderDescription from '@com/_organisms/TenderDescription';
import TenderShipmentDetail from '@com/_organisms/TenderShipmentDetail';
import { BottomModalContainer } from '@com/modal/containers/bottomMobileContainer';
import { VendorDetailDataModel } from '@utilities/interfaces/vendor';
import { TenderItemsListDataModel } from '@utilities/interfaces/tender';
import { routeList } from '@routes/routeList';
import { convertRialToToman } from '@utilities/mainUtils';
import { Button } from '@com/_atoms/NewButton';
import useModal from '@hooks/useModal';

type TenderItemDetailProps = {
  tenderData: TenderItemsListDataModel;
  vendorData?: VendorDetailDataModel;
  orderCode: string;
  offerId: string;
};

enum Tabs {
  items = 'اقلام سفارش',
  description = 'توضیحات',
}

const TenderItemDetail = ({
  tenderData,
  vendorData,
  orderCode,
  offerId,
}: TenderItemDetailProps) => {
  const { push } = useRouter();
  const [tab, setTab] = useState<Tabs>(Tabs.items);
  const { removeLastModal } = useModal();

  const handleChangeTabs = (e: MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget?.innerText === Tabs.items) {
      setTab(Tabs.items);
    } else {
      setTab(Tabs.description);
    }
  };

  const handleProccessOrder = () => {
    push(`${routeList.tender}/${orderCode}/${offerId}/preview`);
  };

  return (
    <BottomModalContainer height={'100svh'}>
      <MainLayout
        hasHeader
        hasBackButton
        handleClickRightIcon={removeLastModal}
      >
        <div className="w-full h-[128] grid grid-rows-1 grid-cols-1 items-start">
          <div className="row-start-1 row-end-2 col-sart-1 col-end-2 flex justify-start items-center object-contain overflow-hidden">
            <Image
              src={'/static/images/staticImages/tender-detail-banner.png'}
              width={412}
              height={128}
              alt="tender-detail-banner"
            />
          </div>

          <div className="row-start-1 row-end-2 col-start-1 col-end-2 z-10 px-5 translate-y-[40px]">
            <TenderShipmentDetail
              delivery={tenderData?.delivery}
              vendor={vendorData}
            />
          </div>
        </div>
        <div className="w-full flex flex-col gap-y-2 translate-y-[40px] mt-4">
          <div className="relative w-[264px] h-12 flex justify-center items-center bg-grey-50 self-center rounded-full">
            <div
              className={classNames(
                'absolute w-32 h-10 bg-white top-1/2 -translate-y-1/2 rounded-full transition-all duration-300',
                tab === Tabs.items ? 'right-1' : 'right-[132px]',
              )}
            />
            <span
              onClick={handleChangeTabs}
              className={classNames(
                'w-full text-center cursor-pointer text-sm font-medium leading-6 z-10',
              )}
            >
              اقلام سفارش
            </span>
            <span
              onClick={handleChangeTabs}
              className={classNames(
                'w-full text-center cursor-pointer text-sm font-medium leading-6 z-10',
              )}
            >
              توضیحات
            </span>
          </div>

          {tab === Tabs.items && (
            <TenderProductList
              orderItems={tenderData?.orderDetails}
              totalPrice={tenderData?.totalPrice}
              finalPrice={tenderData?.finalPrice}
              packingPrice={tenderData?.packingPrice}
              deliveryPrice={tenderData?.delivery?.deliveryPrice}
              referenceNumber={tenderData?.referenceNumber}
              isSpecialPatient={tenderData?.isSpecialPatient}
            />
          )}

          {tab === Tabs.description && (
            <TenderDescription
              description={tenderData?.description}
              comment={tenderData?.comment}
            />
          )}

          <div className="w-full h-16 flex justify-between items-center mt-2 mb-7 px-4 py-2">
            <div className="flex flex-col gap-y-2">
              <span className="text-md leading-6 font-bold">{`${convertRialToToman(tenderData?.finalPrice)}`}</span>
              <span className="text-sm leading-5">قابل پرداخت</span>
            </div>

            <Button
              onClick={handleProccessOrder}
              variant="primary"
              size="large"
              className="w-1/2"
            >
              تکمیل خرید
            </Button>
          </div>
        </div>
      </MainLayout>
    </BottomModalContainer>
  );
};

export default TenderItemDetail;
