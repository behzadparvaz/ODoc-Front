import { useState } from 'react';

import OrderInfoForm from '@com/_molecules/OrderInfoForm';
import StepProgressBar from '@com/_molecules/StepProgressBar';
import AddressAndDeliveryDate from '@com/_organisms/AddressAndDeliveryDate';
import OrderTourGuide from '@com/_organisms/OrderTourGuide';
import { routeList } from '@routes/routeList';

const OrderRegisterSteps = ({ data, className = '' }) => {
  const userInfo = data?.queryResult[0];
  const [step, setStep] = useState(1);
  const [stepOneValue, setStepOneValue] = useState({
    referenceNumber: null,
    nationalCode: null,
    customerName: null,
    doctorName: null,
    comment: null,
    insuranceTypeId: 0,
    supplementaryInsuranceTypeId: 0,
    isSpecialPatient: false,
    vendorSelects: null,
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
        className="sticky top-0 inset-x-0 bg-white"
        currentStep={step}
        handleChangeStep={(step: number) => setStep(step)}
        activeItem={step}
        items={stepProgressBarItem}
      />
      <>
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
                  supplementaryInsuranceTypeId: Number(
                    value?.supplementaryInsuranceTypeId,
                  ),
                  isSpecialPatient: value?.isSpecialPatient,
                  vendorSelects: value?.vendorSelects,
                });
                setStep(step);
                setState({
                  ...state,
                  referenceNumber: String(value?.referenceNumber),
                });
              }}
              userInfo={userInfo}
            />
          )}
          {step === 2 && <AddressAndDeliveryDate stepOneValue={stepOneValue} />}
        </div>

        {data?<OrderTourGuide />:null}
      </>
    </div>
  );
};
export default OrderRegisterSteps;
