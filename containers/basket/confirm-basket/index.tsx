import { useRouter } from 'next/router';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import { useGetCurrentBasket } from '@api/basket/basketApis.rq';
import { useCreateOrderDraft } from '@api/order/orderApis.rq';
import { useGetProfile } from '@api/user/user.rq';
import CheckBox from '@com/_atoms/CheckBox.nd';
import { Button } from '@com/_atoms/NewButton';
import { TextAreaInput } from '@com/_atoms/NewTextArea';
import { TickIcon } from '@com/icons';
import { MainLayout } from '@com/Layout';
import ActionBar from '@com/Layout/ActionBar';
import { colors } from '@configs/Theme';
import useNotification from '@hooks/useNotification';
import { routeList } from '@routes/routeList';
import { RootState } from '@utilities/types';
import SelectAddressBasket from '../components/SelectAddressBasket';
import Icon from '@utilities/icon';
import Divider from '@com/_atoms/Divider';

const ConfirmBasketContainer = () => {
  const router = useRouter();
  const [state, setState] = useState({
    description: '',
  });
  const [sendToSomeoneElse, setSendToSomeoneElse] = useState({
    isChecked: false,
    recipient: '',
    phoneRecipient: '',
  });
  const handleToggleSendToSomeoneElse = () => {
    setSendToSomeoneElse({
      isChecked: !sendToSomeoneElse.isChecked,
      recipient: '',
      phoneRecipient: '',
    });
  };
  const { openNotification } = useNotification();

  const { user } = useSelector((state: RootState) => state?.user);

  const { data: profileQuery, isLoading: isLoadingProfile } = useGetProfile({
    enabled: true,
  });
  const profile: any = profileQuery?.queryResult?.[0];

  const {
    data: basket,
    isLoading,
    refetch: refetchGetBasket,
  } = useGetCurrentBasket();

  const { mutate: createOrderDraft, isPending: isLoadingcreateOrderDraft } =
    useCreateOrderDraft({
      onSuccess: (res: any) => {
        refetchGetBasket();
        if (res) router.push(`${routeList.basketSuccess}/${res}`);
      },
    });

  const onSubmitBasket = () => {
    const { defaultAddress } = user;
    const products =
      basket?.products?.map((pr) => ({
        description: pr.description,
        irc: pr.irc,
        imageLink: pr.imageLink,
        quantity: pr.quantity,
        productName: pr.name,
        unit: pr.unit,
        productType: pr?.productType?.id,
      })) ?? [];
    if (sendToSomeoneElse.isChecked) {
      if (!sendToSomeoneElse.recipient) {
        openNotification({
          type: 'error',
          message: 'نام گیرنده را وارد کنید',
          notifType: 'successOrFailedMessage',
        });
        return;
      }
      if (!sendToSomeoneElse.phoneRecipient) {
        openNotification({
          type: 'error',
          message: 'شماره تلفن گیرنده را وارد کنید',
          notifType: 'successOrFailedMessage',
        });
        return;
      }
    }
    if (!defaultAddress?.id) {
      openNotification({
        type: 'error',
        message: 'آدرس را انتخاب کنید',
        notifType: 'successOrFailedMessage',
      });
      return;
    }
    const data = {
      comment: state.description || '',
      customerName: [profile?.firstName, profile?.lastName].join(' '),
      nationalCode: basket?.nationalCode || profile?.nationalCode,

      deliveryDate: '',
      fromDeliveryTime: '',
      toDeliveryTime: '',

      homeUnit: defaultAddress?.homeUnit,
      houseNumber: defaultAddress?.houseNumber,
      latitude: defaultAddress?.latitude,
      longitude: defaultAddress?.longitude,
      titleAddress: defaultAddress?.name,
      valueAddress: defaultAddress?.description,
      referenceNumber: basket?.refrenceNumber,
      insuranceTypeId: basket?.insuranceType,
      supplementaryInsuranceTypeId: basket?.supplementaryInsuranceType,

      items: !basket?.refrenceNumber
        ? products
        : [
            ...products,
            {
              referenceNumber: basket?.refrenceNumber,
              productType: 1,
            },
          ],
      ...(sendToSomeoneElse.isChecked && {
        recipient: sendToSomeoneElse.recipient,
        phoneRecipient: sendToSomeoneElse.phoneRecipient,
      }),
      isSpecialPatient: basket?.isSpecialPatient,
      vendorCode: basket?.isSpecialPatient ? basket?.vendorCode : '',
    };

    createOrderDraft(data);
  };

  return (
    <MainLayout
      title="تأیید و ادامه"
      hasHeader
      headerType="withoutLogo"
      hasBackButton
      backIconHandler={() => {
        router?.push(routeList?.basket);
      }}
    >
      <div className="px-4 flex flex-col gap-y-4">
        <div className="flex flex-col cursor-pointer justify-center">
          <SelectAddressBasket />
          {/* <div className="h-[1px] bg-grey-200 w-full mt-4 " /> */}
        </div>
        {/* <div className="flex align-center gap-6">
          <Icon name="Clock" width={1.5} height={1.5} fill={colors.grey[600]} />
          <span>تحویل تا ساعت ۱۸:۳۰</span>
        </div> */}
        <div className="h-[1px] bg-grey-200 w-full" />
        {/* <div className="flex cursor-pointer align-center">
          <CheckBox
            handleChange={handleToggleSendToSomeoneElse}
            label="ارسال برای دیگری"
            labelClassName="text-md mr-12 font-bold text-black"
            name="sendToSomeoneElse"
            icon={
              <TickIcon
                width={15}
                height={15}
                stroke={colors.white}
                className="mx-auto mt-[1px]"
              />
            }
            boxClassName="w-5 h-5 border !top-3 border-grey-800"
            boxContainerClassName="mr-1 flex justify-center items-center"
            checked={sendToSomeoneElse?.isChecked}
            className="w-full flex items-center z-0"
          />
        </div> */}
        {/* <AnimatePresence>
          {sendToSomeoneElse.isChecked && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{
                display: sendToSomeoneElse.isChecked ? 'block' : 'none',
                opacity: sendToSomeoneElse.isChecked ? 1 : 0,
                height: sendToSomeoneElse.isChecked ? 'auto' : 0,
              }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-y-2"
            >
              <div className="flex flex-col gap-y-2">
                <Input
                  id="recipient"
                  onChange={(e) => {
                    setSendToSomeoneElse({
                      ...sendToSomeoneElse,
                      recipient: e?.target?.value,
                    });
                  }}
                  placeholder="نام تحویل گیرنده"
                />
                <Input
                  id="phone-recipient"
                  inputMode="numeric"
                  maxLength={11}
                  onChange={(e) => {
                    setSendToSomeoneElse({
                      ...sendToSomeoneElse,
                      phoneRecipient: e?.target?.value,
                    });
                  }}
                  placeholder="شماره تلفن گیرنده"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence> */}
        <div className="w-full">
          <TextAreaInput
            id="description"
            onChange={(e) => {
              setState({
                ...state,
                description: e?.target?.value,
              });
            }}
            labelClassName="text-base font-medium"
            inputClassName="rounded-md"
            label="توضیحات سفارش"
            placeholder="برای داروخانه توضیح بنویسید"
            rows={4}
            value={state.description}
          />
        </div>

        <Divider padding={0} />

        {basket?.products?.length > 0 && (
          <div className="w-full">
            <CheckBox
              handleChange={() => {}}
              label="اینجانب با مشورت پزشک نسبت به خرید داروی بدون نسخه اقدام کرده ام. "
              labelClassName="text-xs mr-8 font-normal text-grey-500"
              name="vendorCode"
              icon={
                <TickIcon
                  width={15}
                  height={15}
                  stroke={colors.white}
                  className="mx-auto mt-[1px]"
                />
              }
              boxClassName="w-5 h-5 !top-3 border-grey-800 rounded-md"
              boxContainerClassName="mr-1 flex justify-center items-center"
              checked={true}
              className="w-full flex items-center z-0 mt-2"
            />
          </div>
        )}
        <div className="grid grid-cols-[28px_1fr] items-center gap-x-2">
          <div className="flex items-center justify-center">
            <Icon
              name="CircleExclamationFill"
              width={1.25}
              height={1.25}
              fill={colors.red[300]}
            />
          </div>
          <span className="text-xs text-content-secondary">
            پس از ثبت ، سفارش شما به داروخانه هاى اطراف جهت تعيين قيمت ارسال شده
            و از طريق پيامک اطلاع رسانى مى شود.
          </span>
        </div>
        <div className="grid grid-cols-[28px_1fr] items-center gap-x-2">
          <div className="flex items-center justify-center">
            <Icon
              name="CircleExclamationFill"
              width={1.25}
              height={1.25}
              fill={colors.red[300]}
            />
          </div>
          <span className="text-xs text-content-secondary">
            قيمت اعلام شده دارو ها بر اساس نرخ مصوب سازمان غذا و دارو مى باشد.
          </span>
        </div>
      </div>
      <ActionBar type="singleAction" hasDivider>
        <Button
          variant="brand"
          className="w-full"
          size="large"
          onClick={onSubmitBasket}
          isLoading={isLoadingcreateOrderDraft}
          disabled={isLoading || isLoadingProfile}
        >
          ثبت سفارش
        </Button>
      </ActionBar>
    </MainLayout>
  );
};

export default ConfirmBasketContainer;
