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
  activeIcon?: ReactNode;
};

const steps: Steps[] = [
  {
    id: 1,
    icon: <TimerFillIcon width={24} height={24} fill={colors.gray[400]} />,
    activeIcon: <TimerFillIcon width={24} height={24} fill={colors.black} />,
  },
  {
    id: 2,
    icon: (
      <DebitCardOutlineIcon width={24} height={24} fill={colors.gray[400]} />
    ),
    activeIcon: (
      <DebitCardFillIcon width={24} height={24} fill={colors.black} />
    ),
  },
  {
    id: 3,
    icon: <StoreOutlineIcon width={24} height={24} fill={colors.gray[400]} />,
    activeIcon: <StoreFillIcon width={24} height={24} fill={colors.black} />,
  },
  {
    id: 4,
    icon: <BikerOutlineIcon fill={colors.gray[400]} />,
    activeIcon: <BikerFillIcon width={24} height={24} fill={colors.black} />,
  },
  {
    id: 5,
    icon: <CheckBoxIcon width={24} height={24} fill={colors.grey[400]} />,
    activeIcon: <CheckBoxIcon width={24} height={24} fill={colors.black} />,
  },
];

type OrderHistoryProgressProps = { activeStepId: number };

const OrderHistoryProgress = ({ activeStepId }: OrderHistoryProgressProps) => {
  return (
    <div className="h-[32px] grid grid-cols-[2fr_repeat(3,3fr)_2fr] w-full items-center">
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
            {activeStepId >= index ? item?.activeIcon : item?.icon}
          </div>

          {index !== steps?.length - 1 && (
            <div
              className={classNames(
                'w-full h-2 bg-surface-tertiary',
                activeStepId >= index && '!bg-surface-inverse-primary',
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default OrderHistoryProgress;
