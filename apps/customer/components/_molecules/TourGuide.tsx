import dynamic from 'next/dynamic';
import { CallBackProps, Props, Step } from 'react-joyride';

import TourTooltip from '@com/_atoms/TourTooltip';

const ReactJoyride = dynamic(() => import('react-joyride'), { ssr: false });

interface TourGuideProps extends Props {
  run: boolean;
  steps: Step[];
}

const TourGuide = ({ run, steps, ...rest }: TourGuideProps) => {
  return (
    <ReactJoyride
      steps={steps}
      tooltipComponent={TourTooltip}
      run={run}
      callback={(data: CallBackProps) => {
        return;
      }}
      scrollToFirstStep
      scrollOffset={100}
      styles={{
        options: {
          zIndex: 1000,
        },
        tooltip: {
          transition: 'all ease 0.5s',
        },
      }}
      floaterProps={{
        styles: {
          arrow: {
            length: 10,
            spread: 16.5,
            border: 'none',
          },
        },
      }}
      {...rest}
    />
  );
};

export default TourGuide;
