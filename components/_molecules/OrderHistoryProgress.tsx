import { ReactNode } from 'react';
import classNames from 'classnames';

import {
  BikerFillIcon,
  BikerOutlineIcon,
  CheckBoxIcon,
  DebitCardFillIcon,
  DebitCardOutlineIcon,
  StoreFillIcon,
  StoreOutlineIcon,
  TimerFillIcon,
} from '@com/icons';
import { colors } from '@configs/Theme';

type Steps = {
  id: number;
  icon?: ReactNode;
  passedIcon?: ReactNode;
  activeIcon?: ReactNode;
};

const steps: Steps[] = [
  {
    id: 1,
    icon: <TimerFillIcon width={24} height={24} fill={colors.gray[400]} />,
    passedIcon: <TimerFillIcon width={24} height={24} fill={colors.black} />,
    activeIcon: <TimerFillIcon width={24} height={24} gradient />,
  },
  {
    id: 2,
    icon: (
      <DebitCardOutlineIcon width={24} height={24} fill={colors.gray[400]} />
    ),
    passedIcon: (
      <DebitCardFillIcon width={24} height={24} fill={colors.black} />
    ),
    activeIcon: <DebitCardFillIcon width={24} height={24} gradient />,
  },
  {
    id: 3,
    icon: <StoreOutlineIcon width={24} height={24} fill={colors.gray[400]} />,
    passedIcon: <StoreFillIcon width={24} height={24} fill={colors.black} />,
    activeIcon: <StoreFillIcon width={24} height={24} gradient />,
  },
  {
    id: 4,
    icon: <BikerOutlineIcon fill={colors.gray[400]} />,
    passedIcon: <BikerFillIcon width={24} height={24} fill={colors.black} />,
    activeIcon: <BikerFillIcon width={24} height={24} gradient />,
  },
  {
    id: 5,
    icon: <CheckBoxIcon width={24} height={24} fill={colors.grey[400]} />,
    passedIcon: <CheckBoxIcon width={24} height={24} fill={colors.black} />,
    activeIcon: <CheckBoxIcon width={24} height={24} fill={colors.black} />,
  },
];

type OrderHistoryProgressProps = { activeStepId: number; className?: string };

const OrderHistoryProgress = ({
  activeStepId,
  className,
}: OrderHistoryProgressProps) => {
  const renderIcon = (index) => {
    if (activeStepId > index) {
      return steps[index].passedIcon;
    } else if (activeStepId === index) {
      return steps[index].activeIcon;
    } else {
      return steps[index].icon;
    }
  };

  return (
    <div
      className={classNames(
        className,
        'h-[32px] grid grid-cols-[2fr_repeat(3,3fr)_2fr] w-full items-center',
      )}
    >
      {steps.map((item, index) => (
        <div key={item?.id} className="flex items-center justify-center w-full">
          {index !== 0 && (
            <div
              className={classNames(
                'w-full h-2 bg-surface-tertiary',
                activeStepId >= index && '!bg-surface-inverse-primary',
              )}
            />
          )}

          <div
            key={item.id}
            className="w-full flex justify-center items-center px-2"
          >
            {renderIcon(index)}
          </div>

          {index !== steps?.length - 1 && (
            <div
              className={classNames(
                'w-full h-2 bg-surface-tertiary',
                activeStepId > index && '!bg-surface-inverse-primary',
                activeStepId === index && '!bg-surface-Gradient.brand',
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default OrderHistoryProgress;
