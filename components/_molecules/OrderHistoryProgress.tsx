import { ReactNode } from 'react';
import classNames from 'classnames';

import {
  BikerFillIcon,
  BikerOutlineIcon,
  CheckBoxIcon,
  ShopOutlinefillIcon,
  ShopOutlineIcon,
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
    icon: <ShopOutlineIcon fill={colors.gray[400]} />,
    activeIcon: (
      <ShopOutlinefillIcon width={24} height={24} fill={colors.black} />
    ),
  },
  {
    id: 2,
    icon: <BikerOutlineIcon fill={colors.black} />,
    activeIcon: <BikerFillIcon width={24} height={24} fill={colors.black} />,
  },
  {
    id: 3,
    icon: <CheckBoxIcon width={24} height={24} fill={colors.grey[400]} />,
    activeIcon: <CheckBoxIcon width={24} height={24} fill={colors.black} />,
  },
];

type OrderHistoryProgressProps = { activeStepId: number };

const OrderHistoryProgress = ({ activeStepId }: OrderHistoryProgressProps) => {
  return (
    <div className="flex items-center justify-center w-full py-3">
      {steps.map((item, index) => (
        <div
          key={item?.id}
          className="flex items-center justify-center w-full py-3"
        >
          {index !== 0 && (
            <div
              className={classNames(
                'w-full h-2 bg-surface-tertiary',
                activeStepId >= index && '!bg-surface-inverse-primary',
              )}
            />
          )}

          <div key={item.id} className="px-4">
            {activeStepId >= index ? item.activeIcon : item.icon}
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
