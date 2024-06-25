import OrderForm from '@com/_molecules/OrderCodeForm';
import SelectAddress from '@com/_molecules/SelectAddress';
import StepProgressBar from '@com/_molecules/StepProgressBar';
import { useState } from 'react';

const OrderRegisterSteps = ({ data }) => {
  const userInfo = data?.queryResult[0];
  const [step, setStep] = useState(1);
  const [stepOneValue, setStepOneValue] = useState({
    orderCode: '',
    nationalCode: 0,
    customerName: '',
    doctorName: '',
    comment: '',
    insuranceTypeId: 0,
  });
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

  const stepProgressBarItem = [
    {
      title: 'کد رهگیری',
      step: 1,
    },
    {
      title: 'انتخاب آدرس',
      step: 2,
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
        <div className="w-full mt-8">
          {step === 1 && (
            <OrderForm
              handleNextStep={(step, value) => {
                setStepOneValue({
                  orderCode: value?.orderCode,
                  nationalCode: value?.nationalCode,
                  customerName: value?.customerName,
                  doctorName: value?.doctorName,
                  comment: value?.comment,
                  insuranceTypeId: Number(value?.insuranceTypeId),
                });
                setStep(step);
                setState({ ...state, orderCode: String(value?.orderCode) });
              }}
              userInfo={userInfo}
            />
          )}
          {step === 2 && (
            <SelectAddress stepOneValue={stepOneValue} userInfo={userInfo} />
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
