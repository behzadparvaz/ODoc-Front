import { useState } from 'react';
import { Step } from 'react-joyride';

import TourGuide from '@com/_molecules/TourGuide';
import useStorage from '@hooks/useStorage';
import { orderTourText } from '@com/texts/tourGuideTexts';

const OrderTourGuide = () => {
  const { getItem, setItem } = useStorage();
  const orderTour = getItem('orderTour', 'local');

  const [run, setRun] = useState(false);

  if (!orderTour) {
    setRun(true);
    setItem('orderTour', JSON.stringify(true), 'local');
  }

  const steps: Step[] = [
    {
      content: <p>{orderTourText.referenceNumberContent}</p>,
      placement: 'bottom-start',
      target: '#referenceNumber',
      title: orderTourText.referenceNumberTitle,
      disableBeacon: true,
    },
    {
      content: <p>{orderTourText.insuranceTypeIdContent} </p>,
      placement: 'bottom-start',
      target: '#insuranceTypeId',
      title: orderTourText.insuranceTypeIdTitle,
      disableBeacon: true,
    },
    {
      content: <p>{orderTourText.isSpecialPatientContent}</p>,
      placement: 'bottom-start',
      target: '#isSpecialPatient',
      title: orderTourText.isSpecialPatientTitle,
      disableBeacon: true,
    },
  ];

  return <TourGuide steps={steps} run={run} continuous />;
};

export default OrderTourGuide;
