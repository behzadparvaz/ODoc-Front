import { useState } from 'react';
import { useFormik } from 'formik';

import { useCancelOrder } from '@api/order/orderApis.rq';
import { Button } from '@com/_atoms/NewButton';
import { TextAreaInput } from '@com/_atoms/NewTextArea';
import { Radio } from '@com/_atoms/Radio';
import useModal from '@hooks/useModal';
import { CancelOrderSchema } from '@utilities/validationSchemas';
import {
  FullModalAnimations,
  FullModalContainer,
} from '@com/modal/containers/fullMobileContainer';
import { MainLayout } from '@com/Layout';
import ActionBar from '@com/Layout/ActionBar';

const apayCancelReasons = [
  { id: 9, value: 'هزینه ارسال زیاد است' },
  { id: 10, value: 'هزینه سفارش بیشتر از حد انتظار من است' },
  { id: 11, value: 'مدت زمان تحویل سفارش زیاد است' },
  { id: 12, value: 'میخواهم دارو را از داروخانه حضوری بگیرم' },
  { id: 13, value: 'از طریق دیگری خریداری کردم' },
  { id: 14, value: 'از خرید منصرف شدم' },
  { id: 15, value: 'می‌خواهم تغییراتی در سفارش خود ایجادکنم' },
  { id: 17, value: 'سایر دلایل' },
];

const draftCancelReason = [
  { id: 16, value: 'زمان زیادی برای تأیید سفارش منتظر بودم' },
  { id: 13, value: 'از طریق دیگری خریداری کردم' },
  { id: 15, value: 'می‌خواهم تغییراتی در سفارش خود ایجادکنم' },
  { id: 17, value: 'سایر دلایل' },
];

type CancelOrderModalProps = {
  orderCode: string;
  step: 'draft' | 'apay';
};

const CancelOrderModal = ({ orderCode, step }: CancelOrderModalProps) => {
  const { mutate: mutateCancelOrder, isPending: isLoadingCancelOrder } =
    useCancelOrder();
  const { removeLastModal } = useModal();

  const [isShownInput, setIsShownInput] = useState(false);

  const initialValues = {
    cancelReasonValue: '',
    cancelReasonId: 9,
  };

  const handleCancelOrder = (reasonValue?: string, reasonId?: number) => {
    const cancelOrderBody =
      formik.values?.cancelReasonId === 17
        ? {
            orderCode: orderCode,
            declineType: reasonId,
            reason: reasonValue,
          }
        : {
            orderCode: orderCode,
            declineType: reasonId,
          };

    mutateCancelOrder(cancelOrderBody, {
      onSuccess: () => {
        removeLastModal();
      },
    });
  };

  const formik = useFormik({
    initialValues,
    validationSchema: CancelOrderSchema,
    onSubmit: (values) => {
      if (values?.cancelReasonId === 17 && !values?.cancelReasonValue) {
        formik.setFieldError(
          'cancelReasonValue',
          'لطفا دلیل خود را انتخاب کنید',
        );
      } else {
        handleCancelOrder(values?.cancelReasonValue, values?.cancelReasonId);
      }
    },
  });

  const handleChangeForm = (field, e) => {
    formik?.setFieldValue(field, e?.target?.value);
  };

  const renderReasonList = () => {
    switch (step) {
      case 'draft':
        return draftCancelReason;
      case 'apay':
        return apayCancelReasons;
    }
  };

  return (
    <FullModalContainer animation={FullModalAnimations.none}>
      <MainLayout
        hasHeader
        headerType="withoutLogo"
        title="لغو سفارش"
        hasBackButton
        backIconHandler={removeLastModal}
      >
        <div className="h-full w-full flex flex-col gap-y-4 bg-surface-primary overflow-y-scroll pb-[84px]">
          <span className="text-content-tertiary text-xs font-medium pt-4 px-4">
            دلیل لغو سفارش خود انتخاب کنید.
          </span>

          <div className="flex flex-col text-content-primary text-sm font-normal gap-y-2 px-[21px]">
            {renderReasonList().map((item, index) => (
              <div key={index} className="h-[52px] flex flex-col">
                <div className="h-[51.5px] flex items-center">
                  <Radio
                    id={String(item?.id)}
                    label={item?.value}
                    checked={
                      (item?.value === 'سایر دلایل' && isShownInput) ||
                      formik?.values?.cancelReasonId === item?.id
                    }
                    handleChange={() => {
                      if (item?.value === 'سایر دلایل') {
                        setIsShownInput(true);
                        formik?.setFieldValue('cancelReasonValue', '');
                        formik?.setFieldValue('cancelReasonId', 17);
                      } else {
                        setIsShownInput(false);
                        formik?.setFieldValue('cancelReasonId', item?.id);
                      }
                    }}
                  />
                </div>

                {renderReasonList().length - 1 !== index && (
                  <div className="w-[calc(100%-21px)] h-[0.5px] bg-border-primary mr-[42px]" />
                )}
              </div>
            ))}
          </div>

          {isShownInput && (
            <TextAreaInput
              placeholder={'توضیحات خود را برای لغو سفارش بنویسید'}
              id="cancelReasonValue"
              name="cancelReasonValue"
              className="px-4"
              value={formik.values.cancelReasonValue}
              onChange={(e) => handleChangeForm('cancelReasonValue', e)}
              onBlur={formik.handleBlur}
              isTouched={
                formik.touched.cancelReasonValue &&
                Boolean(formik.errors.cancelReasonValue)
              }
              inputClassName="h-[102px] w-full text-wrap"
              errorMessage={formik.errors.cancelReasonValue as string}
              maxLength={150}
            />
          )}
        </div>

        <ActionBar type="singleAction" className="bg-white z-20">
          <div className="bg-surface-primary w-full flex justify-center items-center p-4">
            <Button
              type="submit"
              variant="primary"
              size="large"
              className="w-full"
              onClick={formik.handleSubmit}
              isLoading={isLoadingCancelOrder}
              disabled={
                formik?.values?.cancelReasonId === 17 &&
                !formik.values.cancelReasonValue
              }
            >
              لغو سفارش
            </Button>
          </div>
        </ActionBar>
      </MainLayout>
    </FullModalContainer>
  );
};
export default CancelOrderModal;
