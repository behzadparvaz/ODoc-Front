import { ReactNode } from 'react';
import classNames from 'classnames';

import {
  BikerFillIcon,
  BikerOutlineIcon,
  CheckBoxIcon,
  DebitCardFillIcon,
  DebitCardOutlineIcon,
  DoctorFillIcon,
  StoreFillIcon,
  StoreOutlineIcon,
  TimerFillIcon,
} from '@com/icons';
import { colors } from '@configs/Theme';
import { useRouter } from 'next/router';
import { routeList } from '@routes/routeList';

type Steps = {
  id: number;
  icon?: ReactNode;
  passedIcon?: ReactNode;
  activeIcon?: ReactNode;
};

const steps: Steps[] = [
  {
    id: 1,
    icon: <DoctorFillIcon width={24} height={24} fill={colors.gray[400]} />,
    passedIcon: <DoctorFillIcon width={24} height={24} fill={colors.black} />,
    activeIcon: <DoctorFillIcon width={24} height={24} gradient />,
  },
  {
    id: 2,
    icon: <TimerFillIcon width={24} height={24} fill={colors.gray[400]} />,
    passedIcon: <TimerFillIcon width={24} height={24} fill={colors.black} />,
    activeIcon: <TimerFillIcon width={24} height={24} gradient />,
  },
  {
    id: 3,
    icon: (
      <DebitCardOutlineIcon width={24} height={24} fill={colors.gray[400]} />
    ),
    passedIcon: (
      <DebitCardFillIcon width={24} height={24} fill={colors.black} />
    ),
    activeIcon: <DebitCardFillIcon width={24} height={24} gradient />,
  },
  {
    id: 4,
    icon: <StoreOutlineIcon width={24} height={24} fill={colors.gray[400]} />,
    passedIcon: <StoreFillIcon width={24} height={24} fill={colors.black} />,
    activeIcon: <StoreFillIcon width={24} height={24} gradient />,
  },
  {
    id: 5,
    icon: <BikerOutlineIcon fill={colors.gray[400]} />,
    passedIcon: <BikerFillIcon width={24} height={24} fill={colors.black} />,
    activeIcon: <BikerFillIcon width={24} height={24} gradient />,
  },
  {
    id: 6,
    icon: <CheckBoxIcon width={24} height={24} fill={colors.grey[400]} />,
    passedIcon: <CheckBoxIcon width={24} height={24} fill={colors.black} />,
    activeIcon: <CheckBoxIcon width={24} height={24} fill={colors.black} />,
  },
];

type OrderHistoryProgressProps = {
  activeStepId: number;
  className?: string;
  isHasQuickOrder?: boolean;
};

const OrderHistoryProgress = ({
  activeStepId,
  className,
  isHasQuickOrder,
}: OrderHistoryProgressProps) => {
  const { pathname } = useRouter();

  const renderIcon = (index) => {
    if (activeStepId > index) {
      if (pathname === '/app') {
        return steps[index].activeIcon;
      } else {
        return steps[index].passedIcon;
      }
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
        'h-[32px] grid  w-full items-center',
        isHasQuickOrder
          ? 'grid-cols-[3fr_repeat(4,4fr)_3fr]'
          : 'grid-cols-[2fr_repeat(3,3fr)_2fr]',
      )}
    >
      {steps.map((item, index) => {
        if (!isHasQuickOrder && index === 0) {
          return null;
        }
        return (
          <div
            key={item?.id}
            className="flex items-center justify-center w-full"
          >
            {index !== 0 &&
              (!isHasQuickOrder && index === 1 ? null : (
                <div
                  className={classNames(
                    'w-full h-2 bg-surface-tertiary',
                    activeStepId >= index &&
                      (pathname === '/app'
                        ? '!bg-surface-Gradient.brand rotate-180'
                        : '!bg-surface-inverse-primary'),
                  )}
                />
              ))}

            <div
              key={item.id}
              className={classNames(
                `w-full flex justify-center items-center`,
                `first:pr-0 last:pl-0 px-2`,
              )}
            >
              {renderIcon(index)}
            </div>

            {index !== steps?.length - 1 && (
              <div
                className={classNames(
                  'w-full h-2 bg-surface-tertiary',
                  activeStepId > index &&
                    (pathname === '/app'
                      ? '!bg-surface-Gradient.brand'
                      : '!bg-surface-inverse-primary'),
                  activeStepId === index && '!bg-surface-Gradient.brand',
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default OrderHistoryProgress;
