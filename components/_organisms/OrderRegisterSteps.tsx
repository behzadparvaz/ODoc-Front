import OrderInfoForm from '@com/_molecules/OrderInfoForm';
import StepProgressBar from '@com/_molecules/StepProgressBar';
import { useState } from 'react';
import AddressAndDeliveryDate from '@com/_organisms/AddressAndDeliveryDate';
import Button from '@com/_atoms/Button';
import { useRouter } from 'next/router';
import { routeList } from '@routes/routeList';

const OrderRegisterSteps = ({ data, className = '' }) => {
  const router = useRouter()
  const userInfo = data?.queryResult[0];
  const [step, setStep] = useState(1);
  const [stepOneValue, setStepOneValue] = useState({
    referenceNumber: null,
    nationalCode: null,
    customerName: null,
    doctorName: null,
    comment: null,
    insuranceTypeId: 0,
    isSpecialPatient: false,
  });
  const [state, setState] = useState({
    referenceNumber: null,
    latitude: null,
    longitude: null,
    vendorSelects: [],
    nationalCode: userInfo ? userInfo?.nationalCode : null,
    customerName: userInfo
      ? `${userInfo?.firstName} ${userInfo?.lastName}`
      : null,
    valueAddress: null,
    titleAddress: null,
    houseNumber: null,
    homeUnit: null,
  });

  const stepProgressBarItem = [
    {
      title: 'ثبت اطلاعات',
      step: 1,
    },
    {
      title: 'ثبت سفارش',
      step: 2,
    },
  ];

  return (
    <div className={`relative ${className}`}>
      <StepProgressBar
        className='sticky top-0 inset-x-0 bg-white'
        currentStep={step}
        handleChangeStep={(step: number) => setStep(step)}
        activeItem={step}
        items={stepProgressBarItem}
      />
      {userInfo ? (
        <div className={`w-full py-8`}>
          {step === 1 && (
            <OrderInfoForm
              handleNextStep={(step, value) => {
                setStepOneValue({
                  referenceNumber: value?.referenceNumber,
                  nationalCode: value?.nationalCode,
                  customerName: value?.customerName,
                  doctorName: value?.doctorName,
                  comment: value?.comment,
                  insuranceTypeId: Number(value?.insuranceTypeId),
                  isSpecialPatient: value?.isSpecialPatient,
                });
                setStep(step);
                setState({ ...state, referenceNumber: String(value?.referenceNumber) });
              }}
              userInfo={userInfo}
            />
          )}
          {step === 2 && (
            <AddressAndDeliveryDate stepOneValue={stepOneValue} />
          )}
        </div>
      ) : (
        <div className="pt-36 text-center text-md flex gap-2 items-center justify-center">
          <span>برای ثبت سفارش ابتدا</span>
          <Button handleClick={() => router.push(routeList.profileUserInfoRoute)} variant={'primary'} buttonType={'text'} className={'border-0 text-primary'}>اطلاعات کاربری</Button>
          <span>خود را تکمیل کنید!</span>
        </div>
      )}
    </div>
  );
};
export default OrderRegisterSteps;
