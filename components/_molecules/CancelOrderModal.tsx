import { useState } from 'react';
import { useFormik } from 'formik';

import { useCancelOrder } from '@api/order/orderApis.rq';
import { Button } from '@com/_atoms/NewButton';
import { TextAreaInput } from '@com/_atoms/NewTextArea';
import { Radio } from '@com/_atoms/Radio';
import { BottomModalContainer } from '@com/modal/containers/bottomMobileContainer';
import useModal from '@hooks/useModal';
import { CancelOrderSchema } from '@utilities/validationSchemas';

const apayCancelReasons = [
  'هزینه ارسال زیاد است',
  'هزینه سفارش بیشتر از حد انتظار من است',
  'مدت زمان تحویل سفارش زیاد است',
  'میخواهم دارو را از داروخانه حضوری بگیرم',
  'از طریق دیگری خریداری کردم',
  'از خرید منصرف شدم',
  'می‌خواهم تغییراتی در سفارش خود ایجادکنم',
  'سایر دلایل',
];

const draftCancelReason = [
  'زمان زیادی برای تأیید سفارش منتظر بودم',
  'از طریق دیگری خریداری کردم',
  'می‌خواهم تغییراتی در سفارش خود ایجادکنم',
  'سایر دلایل',
];

type CancelOrderModalProps = {
  orderCode: string;
  step: 'draft' | 'apay';
};

const CancelOrderModal = ({ orderCode, step }: CancelOrderModalProps) => {
  const { mutate: mutateCancelOrder, isLoading: isLoadingCancelOrder } =
    useCancelOrder();
  const { removeLastModal } = useModal();

  const [isShownInput, setIsShownInput] = useState(false);

  const initialValues = {
    cancelReason: '',
  };

  const handleCancelOrder = (value?: string) => {
    mutateCancelOrder(
      {
        orderCode: orderCode,
        reason: value,
      },
      {
        onSuccess: () => {
          removeLastModal();
        },
      },
    );
  };

  const formik = useFormik({
    initialValues,
    validationSchema: CancelOrderSchema,
    onSubmit: (values) => {
      if (!values?.cancelReason) {
        formik.setFieldError('cancelReason', 'لطفا دلیل خود را انتخاب کنید');
      } else {
        handleCancelOrder(values?.cancelReason);
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

  const renderModalHeight = () => {
    switch (step) {
      case 'draft':
        return 300;
      case 'apay':
        return 600;
    }
  };

  return (
    <BottomModalContainer height={renderModalHeight()}>
      <div className="relative w-full flex flex-col gap-y-4 bg-surface-primary">
        <span className="text-content-tertiary text-sm font-medium pt-4 px-4">
          دلیل لغو سفارش خود انتخاب کنید.
        </span>

        <div className="flex flex-col text-content-primary text-base font-normal	overflow-y-scroll gap-y-2 px-[21px]">
          {renderReasonList().map((item, index) => (
            <div key={index} className="h-[52px] flex flex-col">
              <div className="h-[51.5px] flex items-center">
                <Radio
                  id={item}
                  label={item}
                  checked={
                    (item === 'سایر دلایل' && isShownInput) ||
                    formik.values.cancelReason === item
                  }
                  handleChange={() => {
                    if (item === 'سایر دلایل') {
                      setIsShownInput(true);
                      formik?.setFieldValue('cancelReason', '');
                    } else {
                      setIsShownInput(false);
                      formik?.setFieldValue('cancelReason', item);
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
            id="cancelReason"
            name="cancelReason"
            className="px-4"
            value={formik.values.cancelReason}
            onChange={(e) => handleChangeForm('cancelReason', e)}
            onBlur={formik.handleBlur}
            isTouched={
              formik.touched.cancelReason && Boolean(formik.errors.cancelReason)
            }
            inputClassName="h-[102px] w-full text-wrap"
            errorMessage={formik.errors.cancelReason as string}
            maxLength={150}
          />
        )}
      </div>

      <div className="bg-surface-primary w-full flex justify-center items-center p-4">
        <Button
          type="submit"
          variant="primary"
          size="large"
          className="w-full"
          onClick={formik.handleSubmit}
          isLoading={isLoadingCancelOrder}
          disabled={!formik.values.cancelReason}
        >
          لغو سفارش
        </Button>
      </div>
    </BottomModalContainer>
  );
};
export default CancelOrderModal;
