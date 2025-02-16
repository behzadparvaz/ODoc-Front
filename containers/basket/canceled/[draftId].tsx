import { Button } from '@com/_atoms/NewButton';
import NextImage from '@com/_core/NextImage';
import { MainLayout } from '@com/Layout';
import ActionBar from '@com/Layout/ActionBar';
import { colors } from '@configs/Theme';
import { routeList } from '@routes/routeList';
import { encodeString } from '@utilities/encodeString';
import Icon from '@utilities/icon';
import html2pdf from 'html2pdf.js';
import { useRouter } from 'next/router';
import { useRef } from 'react';

const CanceledContainer = () => {
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
  return (
    <MainLayout
      hasHeader
      headerType="withoutLogo"
      hasBackButton
      backIconHandler={() => push(routeList.homeRoute)}
    >
      <div ref={contentRef} className="m-4">
        <div className="border rounded  p-2 flex flex-col gap-y-4">
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
                <div className="flex justify-center items-start cursor-pointer">
                  <Icon
                    name="ShareFill"
                    width={1.2}
                    height={1.2}
                    fill={colors.red[400]}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center bg-surface-negativeLight w-14 h-14 rounded-full">
              <Icon
                name="ExclamationFill"
                width={2}
                height={2}
                fill={colors.red[400]}
              />
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-content-primary font-semibold text-xl">
              پرداخت ناموفق
            </h1>
            <p className="font-normal text-content-tertiary text-sm mt-4">
              در صورت کسر وجه، تا ۷۲ ساعت آینده، مبلغ به حساب شما برگردانده
              خواهد شد .
            </p>
          </div>
          <div className="flex flex-col gap-y-4 mt-4 font-normal text-content-tertiary text-sm mb-4">
            <div className="flex justify-between items-center">
              <span>شماره موبایل</span>
              <span>۰۹۱۲۰۷۸۰۱۹۲۴</span>
            </div>
            <div className="flex justify-between items-center">
              <span>مبلغ</span>
              <span>۱۷٬۲۰۰ تومان</span>
            </div>
            <div className="flex justify-between items-center">
              <span>تاریخ</span>
              <span>۲۰ اردیبهشت ۱۴۰۲ - ۱۹:۳۲</span>
            </div>
            <div className="flex justify-between items-center">
              <span>کد پیگیری</span>
              <span>CX32RE5478</span>
            </div>
          </div>
        </div>
        <p
          ref={serialRef}
          className="hidden text-content-tertiary h-5 font-thin text-xs overflow-hidden text-nowrap text-left ltr"
        >
          {encodeString('CX32RE5478')}
        </p>
      </div>
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
    </MainLayout>
  );
};

export default CanceledContainer;
