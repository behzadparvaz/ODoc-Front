import { Button } from '@com/_atoms/NewButton';
import NextImage from '@com/_core/NextImage';
import { MainLayout } from '@com/Layout';
import ActionBar from '@com/Layout/ActionBar';
import { colors } from '@configs/Theme';
import { routeList } from '@routes/routeList';
import { encodeString } from '@utilities/encodeString';
import Icon from '@utilities/icon';
import classNames from 'classnames';
import html2pdf from 'html2pdf.js';
import { useRouter } from 'next/router';
import { useMemo, useRef } from 'react';

interface IData {
  vendorCode: string;
  isSuccess: boolean;
  trackId: string;
  dateTime: string;
  amount: number;
}
interface IProps {
  data: IData;
  isLoading: boolean;
}
const StatusPayment = ({ data, isLoading }: IProps) => {
  const { push } = useRouter();
  const contentRef = useRef(null);
  const widgetContainerRef = useRef(null);
  const serialRef = useRef(null);
  const showSerial = async () => {
    serialRef.current.style.display = 'block';
    return true;
  };
  const hiddenActionButton = async () => {
    widgetContainerRef.current.style.display = 'none';
    return true;
  };

  const handledownloadAsPdf = async () => {
    if (typeof window !== 'undefined') {
      const element = contentRef.current;

      const options = {
        margin: 10,
        filename: 'document.pdf',
        image: { type: 'jpeg', quality: 0.99 },
        html2canvas: { scale: 2 },
        jsPDF: { orientation: 'portrait' },
      };
      await showSerial();
      await hiddenActionButton();
      await html2pdf().set(options).from(element).save();
      widgetContainerRef.current.style.display = 'flex';
      serialRef.current.style.display = 'none';
    }
  };

  const content = useMemo(() => {
    if (data?.isSuccess) {
      return {
        icon: (
          <Icon
            name="CheckFill"
            width={2}
            height={2}
            fill={colors.green[400]}
          />
        ),
        title: 'پرداخت شما با موفقیت انجام شد',
        description: 'جهت پیگیری سفارش به صفحه جزییات مراجع نمایید.',
      };
    }
    if (!data?.isSuccess) {
      return {
        icon: (
          <Icon
            name="ExclamationFill"
            width={2}
            height={2}
            fill={colors.red[400]}
          />
        ),
        title: 'پرداخت ناموفق',
        description:
          'در صورت کسر وجه، تا ۷۲ ساعت آینده، مبلغ به حساب شما برگردانده خواهد شد.',
      };
    }
  }, [data]);
  return (
    <MainLayout
      hasHeader
      headerType="withoutLogo"
      hasBackButton
      backIconHandler={() => push(routeList.homeRoute)}
    >
      <div ref={contentRef} className="m-4">
        {isLoading ? (
          <StatusPaymentShimmer />
        ) : (
          <div className="border rounded-lg p-2 flex flex-col gap-y-4">
            <div className="flex justify-center items-center relative flex-col">
              <div className="flex justify-between items-center w-full mt-3 mb-2">
                <div className="flex justify-center items-center">
                  <NextImage
                    src={'/images/logo/tapsi-doctor-logo.svg'}
                    alt={'logo'}
                    width={120}
                    height={120}
                    style={{
                      width: 'auto',
                      height: 'auto',
                      objectFit: 'contain',
                    }}
                  />
                </div>
                <div ref={widgetContainerRef} className="flex gap-2">
                  <div
                    onClick={handledownloadAsPdf}
                    className="flex justify-center items-start cursor-pointer"
                  >
                    <Icon
                      name="ArrowDownLine"
                      width={1.2}
                      height={1.2}
                      fill={colors.red[400]}
                    />
                  </div>
                </div>
              </div>
              <div
                className={classNames(
                  'flex justify-center items-center w-14 h-14 rounded-full',
                  data?.isSuccess && 'bg-surface-positiveLight',
                  !data?.isSuccess && 'bg-surface-negativeLight',
                )}
              >
                {content?.icon}
              </div>
            </div>
            <div className="text-center">
              <h1 className="text-content-primary font-semibold text-xl">
                {content?.title}
              </h1>
              <p className="font-normal text-content-tertiary text-sm mt-4">
                {content?.description}
              </p>
            </div>
            <div className="flex flex-col gap-y-4 mt-4 font-normal text-content-tertiary text-sm mb-4">
              <div className="flex justify-between items-center">
                <span>مبلغ</span>
                <span>{data?.amount / 10} تومان</span>
              </div>
              <div className="flex justify-between items-center">
                <span>تاریخ</span>
                <span>{data?.dateTime}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>کد پیگیری</span>
                <span>{data?.trackId}</span>
              </div>
            </div>
          </div>
        )}
        {!isLoading && data?.trackId && (
          <p
            ref={serialRef}
            className="hidden text-content-tertiary h-5 font-thin text-xs overflow-hidden text-nowrap text-left ltr"
          >
            {encodeString(data?.trackId)}
          </p>
        )}
      </div>
      {!isLoading && (
        <ActionBar type="twoActionVertical">
          <Button
            variant="primary"
            className="w-full"
            size="large"
            type="button"
            onClick={() => push(`${routeList?.ordersHistory}`)}
          >
            جزییات سفارش
          </Button>
          <Button
            variant="text"
            className="w-full"
            size="large"
            type="button"
            onClick={() => push(routeList?.homeRoute)}
          >
            برگشت به خانه
          </Button>
        </ActionBar>
      )}
    </MainLayout>
  );
};

export default StatusPayment;

const StatusPaymentShimmer = () => (
  <div className="border rounded-md w-full p-4">
    <div className="flex flex-col justify-center items-center w-full gap-y-4">
      <div className="w-[80px] h-[80px] bg-gray-300 animate-pulse rounded-full" />
      <div className="w-3/4 h-6 bg-gray-300 animate-pulse mb-4 rounded" />
      <div className="flex flex-col w-full justify-center items-center">
        <div className="w-full h-4 bg-gray-300 animate-pulse mb-4 rounded" />
        <div className="w-3/4 h-4 bg-gray-300 animate-pulse mb-4 rounded" />
      </div>
      <div className="flex flex-col w-full">
        <div className="flex justify-between items-center gap-x-10">
          <div className="w-1/2 h-4 bg-gray-300 animate-pulse mb-4 rounded" />
          <div className="w-1/2 h-4 bg-gray-300 animate-pulse mb-4 rounded" />
        </div>
        <div className="flex justify-between items-center gap-x-10">
          <div className="w-1/2 h-4 bg-gray-300 animate-pulse mb-4 rounded" />
          <div className="w-1/2 h-4 bg-gray-300 animate-pulse mb-4 rounded" />
        </div>
        <div className="flex justify-between items-center gap-x-10">
          <div className="w-1/2 h-4 bg-gray-300 animate-pulse mb-4 rounded" />
          <div className="w-1/2 h-4 bg-gray-300 animate-pulse mb-4 rounded" />
        </div>
        <div className="flex justify-between items-center gap-x-10">
          <div className="w-1/2 h-4 bg-gray-300 animate-pulse mb-4 rounded" />
          <div className="w-1/2 h-4 bg-gray-300 animate-pulse mb-4 rounded" />
        </div>
      </div>
    </div>
  </div>
);
