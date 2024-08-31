import { ReactNode } from 'react';
import classNames from 'classnames';

import {
  BagOutlineIcon,
  BikerOutlineIcon,
  NoteOutlineIcon,
  PaymentOutlineIcon,
  ShopOutlineIcon,
  TickIcon,
} from '@com/icons';
import { colors } from '@configs/Theme';

type Steps = {
  title?: string;
  id: number;
  icon?: (color: string) => ReactNode;
};

const steps: Steps[] = [
  {
    id: 1,
    title: 'ثبت سفارش',
    icon: (color) => <NoteOutlineIcon fill={color} />,
  },
  {
    id: 2,
    title: 'تأیید داروخانه',
    icon: (color) => <ShopOutlineIcon fill={color} />,
  },
  {
    id: 3,
    title: 'پرداخت',
    icon: (color) => <PaymentOutlineIcon fill={color} />,
  },
  {
    id: 4,
    title: 'آماده سازی',
    icon: (color) => <BagOutlineIcon fill={color} />,
  },
  {
    id: 5,
    title: 'ارسال با پیک',
    icon: (color) => <BikerOutlineIcon fill={color} />,
  },
];

type ProgressStepperProps = { activeStepId: number; hasIcons: boolean };

const ProgressStepper = ({ activeStepId, hasIcons }: ProgressStepperProps) => {
  return (
    <div className="flex items-center justify-center w-full py-3">
      {steps.map((item, index) => (
        <div
          key={item?.id}
          className={classNames(
            'flex w-full relative',
            steps.length - 1 !== index &&
              "after:content-[''] after:w-full after:h-0.5 after:inline-block after:absolute after:top-3 after:right-8",
            hasIcons && 'after:top-11',
            item?.id < activeStepId
              ? 'after:bg-orange-500'
              : 'after:bg-grey-200',
          )}
        >
          <div className="flex flex-col items-center gap-y-2 whitespace-nowrap z-10 min-w-11 w-full">
            {hasIcons && (
              <span className="flex items-center justify-center w-6 h-6">
                {item?.icon(
                  item.id <= activeStepId
                    ? colors.orange[500]
                    : colors.grey[200],
                )}
              </span>
            )}

            <span
              className={classNames(
                'w-6 h-6 rounded-full flex justify-center items-center mx-auto  border-2',

                item?.id === activeStepId && 'border-orange-500',
                item?.id < activeStepId
                  ? ' bg-orange-500 border-orange-500'
                  : 'bg-white border-grey-200',
              )}
            >
              {item?.id < activeStepId ? (
                <TickIcon width={15} height={15} stroke={colors.white} />
              ) : (
                <span
                  className={classNames(
                    'w-2 h-2 rounded-full',
                    item?.id <= activeStepId ? 'bg-orange-500' : 'bg-grey-200',
                  )}
                />
              )}
            </span>
            {!hasIcons && (
              <span
                className={classNames(
                  'text-[8px] font-medium	leading-3',
                  item?.id <= activeStepId
                    ? 'text-orange-500'
                    : 'text-grey-200',
                )}
              >
                {item?.title}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProgressStepper;
