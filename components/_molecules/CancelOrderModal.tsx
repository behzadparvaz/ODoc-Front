import { useFormik } from 'formik';
import { useRef, useState } from 'react';

import { useCancelOrder, useGetDeclineTypes } from '@api/order/orderApis.rq';
import { Button } from '@com/_atoms/NewButton';
import { TextAreaInput } from '@com/_atoms/NewTextArea';
import { Radio } from '@com/_atoms/Radio';
import { MainLayout } from '@com/Layout';
import ActionBar from '@com/Layout/ActionBar';
import {
  FullModalAnimations,
  FullModalContainer,
} from '@com/modal/containers/fullMobileContainer';
import useModal from '@hooks/useModal';
import { CancelOrderSchema } from '@utilities/validationSchemas';

const shimerItems = [1, 2, 3, 4, 5, 6, 7, 8, 9];
type CancelOrderModalProps = {
  orderCode: string;
};

const CancelOrderModal = ({ orderCode }: CancelOrderModalProps) => {
  const { mutate: mutateCancelOrder, isPending: isLoadingCancelOrder } =
    useCancelOrder();
  const { removeLastModal } = useModal();
  const { data, isLoading } = useGetDeclineTypes();

  const [isShownInput, setIsShownInput] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const initialValues = {
    cancelReasonValue: '',
    cancelReasonId: 9,
  };

  const handleCancelOrder = (reasonValue?: string, reasonId?: number) => {
    const cancelOrderBody =
      formik.values?.cancelReasonId === 18
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
      if (values?.cancelReasonId === 18 && !values?.cancelReasonValue) {
        formik.setFieldError(
          'cancelReasonValue',
          'لطفا دلیل لغو سفارش خود را بنویسید',
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
    if (isLoading) {
      return shimerItems?.map((item) => (
        <div
          key={item}
          className="h-[52px] flex justify-center items-center w-full"
        >
          <div className="h-10 w-full rounded-lg bg-surface-secondary animate-pulse" />
        </div>
      ));
    }

    return (
      <>
        {data?.map((item, index) => (
          <div key={item?.id} className="h-[52px] flex flex-col">
            <div className="h-[51.5px] flex items-center">
              <Radio
                id={String(item?.id)}
                label={item?.name}
                checked={
                  (item?.name === 'سایر دلایل' && isShownInput) ||
                  formik?.values?.cancelReasonId === item?.id
                }
                handleChange={() => {
                  if (item?.name === 'سایر دلایل') {
                    setIsShownInput(true);
                    formik?.setFieldValue('cancelReasonValue', '');
                    formik?.setFieldValue('cancelReasonId', item?.id);
                    setTimeout(() => {
                      textAreaRef.current?.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center',
                      });
                    }, 100);
                  } else {
                    setIsShownInput(false);
                    formik?.setFieldValue('cancelReasonId', item?.id);
                  }
                }}
                disabled={isLoadingCancelOrder}
              />
            </div>

            {data?.length - 1 !== index && (
              <div className="w-[calc(100%-21px)] h-[0.5px] bg-border-primary mr-[42px]" />
            )}
          </div>
        ))}
      </>
    );
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
            {renderReasonList()}
          </div>

          {isShownInput && (
            <TextAreaInput
              inputRef={textAreaRef}
              placeholder={'توضیحات خود را برای لغو سفارش بنویسید'}
              id="cancelReasonValue"
              name="cancelReasonValue"
              className="px-4 mb-4"
              value={formik.values.cancelReasonValue}
              onChange={(e) => handleChangeForm('cancelReasonValue', e)}
              onBlur={formik.handleBlur}
              isTouched={
                formik.touched.cancelReasonValue &&
                Boolean(formik.errors.cancelReasonValue)
              }
              inputClassName="h-[102px] w-full text-wrap rounded-md"
              errorMessage={formik.errors.cancelReasonValue as string}
              maxLength={150}
              disabled={isLoadingCancelOrder}
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
