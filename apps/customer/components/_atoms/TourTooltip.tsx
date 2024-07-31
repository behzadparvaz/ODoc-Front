import { motion } from 'framer-motion';
import { TooltipRenderProps } from 'react-joyride';

import Button from '@com/_atoms/Button';
import { ArrowLeftIconOutline, CloseIconOutline } from '@com/icons';
import { colors } from '@configs/Theme';

interface TourTooltipProps extends TooltipRenderProps {
  position?: 'left' | 'right';
}

const TourTooltip = ({
  continuous,
  index,
  isLastStep,
  primaryProps,
  size,
  skipProps,
  step,
  tooltipProps,
}: TourTooltipProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ ease: 'anticipate', duration: 0.2 }}
      className="w-3/4 h-max flex flex-col items-end py-4 px-5 gap-2 bg-grey-50 rounded-lg"
      {...tooltipProps}
      style={
        step?.styles?.tooltip?.width && {
          maxWidth: step?.styles?.tooltip?.width,
          width: '100%',
        }
      }
    >
      <div className="w-full flex justify-between items-center">
        <p className="text-md font-normal text-grey-800">{step.title}</p>

        <button {...skipProps}>
          <CloseIconOutline width={20} height={20} stroke={colors.grey[800]} />
        </button>
      </div>

      <p className="text-sm text-right font-normal text-grey-600">
        {step.content}
      </p>

      <div className="flex flex-col justify-between items-end">
        {continuous && <p>{`${index + 1}/${size}`}</p>}

        {continuous && !isLastStep && (
          <Button
            className="flex-1"
            size="medium"
            buttonType="contained"
            handleClick={primaryProps.onClick}
            variant="secondary"
            icon={
              <ArrowLeftIconOutline
                width={20}
                height={20}
                fill={colors.teal[600]}
              />
            }
            iconDirection="right"
          >
            بعدی
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default TourTooltip;
