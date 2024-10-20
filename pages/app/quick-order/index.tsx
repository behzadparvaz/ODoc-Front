import { useCreateOrderInlineStep1 } from '@api/order/orderApis.rq';
import Button from '@com/_atoms/Button';
import Input from '@com/_atoms/Input.nd';
import QuickOrderDetails from '@com/_organisms/QuickOrderDetails';
import QuickOrderForm from '@com/_organisms/QuickOrderForm';
import MainPageLayout from '@com/_template/MainPageLayout';
import { PlusIconOutline } from '@com/icons';
import useNotification from '@hooks/useNotification';
import { useRouter } from 'next/router';
import { useState } from 'react';

const QuickOrder = () => {
  const { back } = useRouter();
  const [formCountState, setFormCountState] = useState<number>(1);
  const [body, setBody] = useState(null);
  const [res, setRes] = useState(null);
  const { mutate, isLoading } = useCreateOrderInlineStep1();
  const { openNotification } = useNotification();
  const disabledSubmit =
    body?.nationalCode?.length !== 10 ||
    (!body?.orderDetails && body?.orderDetails?.length === 0);
  const handleSendForm = () => {
    mutate(body, {
      onSuccess: (data: any) => {
        if (data?.isSuccess) {
          setRes(data?.data);
        } else {
          openNotification({
            type: 'error',
            message: data?.message,
            notifType: 'successOrFailedMessage',
          });
        }
      },
    });
  };
  return (
    <MainPageLayout
      hasBottomNavigation={false}
      hasBasketIcon={false}
      hasSearchIcon={false}
      hasFooter={false}
      hasAddress={false}
      title={!res ? 'ثبت درخواست دارو' : 'تأیید و ادامه'}
      backButtonAction={() => (!res ? back() : setRes(null), setBody(null))}
    >
      {!res ? (
        <>
          <QuickOrderForm
            handleChangeForm={(values) => {
              setBody({ ...body, orderDetails: values });
            }}
            className="flex flex-col gap-y-6"
            formCount={formCountState}
          />
          <div className="w-full mt-5 px-4 border-t-8 border-gray-50">
            <p
              className="flex gap-x-4 py-4 items-center my-2 text-base"
              onClick={() => setFormCountState(formCountState + 1)}
            >
              <PlusIconOutline width={20} height={20} fill="black" />
              اضافه کردن داروی جدید
            </p>

            <Input
              onChange={(e) => {
                setBody({ ...body, nationalCode: e?.target?.value });
              }}
              labelClassName="text-base font-medium"
              label="کد ملی"
              type="text"
              inputClassName="h-[52px] text-base bg-gray-100 py-4 px-3"
              placeholder="1234567890"
            />

            <Button
              buttonType="contained"
              variant="primary"
              className="w-full mb-9 mt-24"
              size="large"
              disabled={disabledSubmit}
              type="button"
              handleClick={() => handleSendForm()}
              isLoading={isLoading}
            >
              تایید و ادامه
            </Button>
          </div>
        </>
      ) : (
        <QuickOrderDetails
          handleChangeForm={() => {
            setRes(null), setBody(null);
          }}
          data={res}
        />
      )}
    </MainPageLayout>
  );
};
export default QuickOrder;
