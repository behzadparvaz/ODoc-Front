import OrderForm from '@com/_molecules/OrderCodeForm';
import SelectAddress from '@com/_molecules/SelectAddress';
import StepProgressBar from '@com/_molecules/StepProgressBar';
import { useState } from 'react';
import ChooseReceiverType from './ChooseReceiverType';

const OrderRegisterSteps = ({ data }) => {
  const userInfo = data?.queryResult[0];
  const [step, setStep] = useState(1);
  const [state, setState] = useState({
    orderCode: '',
    phoneNumber: userInfo ? userInfo?.phoneNumber : null,
    latitude: null,
    longitude: null,
    vendorSelects: [],
    nationalCode: userInfo ? userInfo?.nationalCode : null,
    customerName: userInfo
      ? `${userInfo?.firstName} ${userInfo?.lastName}`
      : null,
    valueAddress: 'تهران',
    titleAddress: 'خانه',
    houseNumber: '12',
    homeUnit: 2,
  });
  const hasFamilyMember = userInfo?.familyMembers?.length > 0;
  const stepProgressBarItem = [
    {
      title: 'کد رهگیری',
      step: 1,
    },
    {
      title: 'انتخاب آدرس',
      step: 2,
    },
    {
      title: hasFamilyMember ? 'اطلاعات کاربر' : 'ثبت سفارش',
      step: 3,
    },
  ];

  return (
    <>
      <StepProgressBar
        currentStep={step}
        handleChangeStep={(step: number) => setStep(step)}
        activeItem={step}
        items={stepProgressBarItem}
      />
      {userInfo ? (
        <div className="w-full pt-16">
          {step === 1 && (
            <OrderForm
              handleNextStep={(step, value) => {
                setStep(step);
                setState({ ...state, orderCode: String(value) });
              }}
            />
          )}
          {step === 2 && (
            <SelectAddress
              handleNextStep={(step, value) => {
                setStep(step);
                setState({
                  ...state,
                  latitude: value?.latitude,
                  longitude: value?.longitude,
                  valueAddress: value?.description,
                  titleAddress: value?.name,
                  houseNumber: value?.houseNumber,
                  homeUnit: value?.homeUnit,
                });
              }}
            />
          )}
          {step === 3 && (
            <ChooseReceiverType userInfo={userInfo} initialState={state} />
          )}
        </div>
      ) : (
        <div className="pt-36 text-center text-md text-red-600">
          برای ثبت سفارش ابتدا اطلاعات کاربری خود را تکمیل کنید!
        </div>
      )}
    </>
  );
};
export default OrderRegisterSteps;
