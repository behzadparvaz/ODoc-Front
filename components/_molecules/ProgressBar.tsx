import { ReactNode } from 'react';

import { TickIcon } from '@com/icons';
import { colors } from '@configs/Theme';
import classNames from 'classnames';

type Steps = {
  title?: string;
  id: number;
  icon?: ReactNode;
};

const steps: Steps[] = [
  {
    id: 1,
    title: 'ثبت سفارش',
  },
  { title: 'تأیید داروخانه', id: 2 },
  { title: 'پرداخت', id: 3 },
  {
    title: 'آماده سازی',
    id: 4,
  },
  {
    title: 'ارسال با پیک',
    id: 5,
  },
];

type ProgressStepperProps = { activeStepId: number };

const ProgressStepper = ({ activeStepId }: ProgressStepperProps) => {
  return (
    <>
      <ol className="flex items-center w-full text-xs text-gray-900 font-medium sm:text-base">
        <li className="flex w-full relative text-orange-600  after:content-['']  after:w-full after:h-0.5 after:bg-orange-600 after:inline-block after:absolute after:top-3 after:right-4">
          <div className="block whitespace-nowrap z-10">
            <span className="w-6 h-6 bg-orange-600 border-2 border-transparent rounded-full flex justify-center items-center mx-auto mb-3 text-sm text-white lg:w-10 lg:h-10">
              1
            </span>
            Step 1
          </div>
        </li>
        <li className="flex w-full relative text-gray-900  after:content-['']  after:w-full after:h-0.5  after:bg-gray-200 after:inline-block after:absolute lg:after:top-5 after:top-3 after:left-4">
          <div className="block whitespace-nowrap z-10">
            <span className="w-6 h-6 bg-orange-50 border-2 border-orange-600 rounded-full flex justify-center items-center mx-auto mb-3 text-sm text-orange-600 lg:w-10 lg:h-10">
              2
            </span>{' '}
            Step 2
          </div>
        </li>
        <li className="flex w-full relative text-gray-900  after:content-['']  after:w-full after:h-0.5  after:bg-gray-200 after:inline-block after:absolute lg:after:top-5  after:top-3 after:left-4">
          <div className="block whitespace-nowrap z-10">
            <span className="w-6 h-6 bg-gray-50 border-2 border-gray-200 rounded-full flex justify-center items-center mx-auto mb-3 text-sm  lg:w-10 lg:h-10">
              3
            </span>{' '}
            Step 3
          </div>
        </li>
        <li className="flex w-full relative text-gray-900  after:content-['']  after:w-full after:h-0.5  after:bg-gray-200 after:inline-block after:absolute lg:after:top-5 after:top-3 after:left-4">
          <div className="block whitespace-nowrap z-10">
            <span className="w-6 h-6 bg-gray-50 border-2 border-gray-200 rounded-full flex justify-center items-center mx-auto mb-3 text-sm  lg:w-10 lg:h-10">
              4
            </span>{' '}
            Step 4
          </div>
        </li>
        <li className="flex w-full relative text-gray-900  ">
          <div className="block whitespace-nowrap z-10">
            <span className="w-6 h-6 bg-gray-50 border-2 border-gray-200 rounded-full flex justify-center items-center mx-auto mb-3 text-sm  lg:w-10 lg:h-10">
              5
            </span>{' '}
            Step 5
          </div>
        </li>
      </ol>

      <div className="flex items-center w-full text-xs text-gray-900 font-medium sm:text-base">
        {steps.map((item, index) => (
          <div
            key={item?.id}
            className={classNames(
              'flex w-full relative text-orange-600',
              item?.id < activeStepId &&
                "after:content-['']  after:w-full after:h-0.5 after:bg-orange-600 after:inline-block after:absolute after:top-3 after:right-4",
            )}
          >
            <div className="block whitespace-nowrap z-10">
              <span
                className={classNames(
                  'w-6 h-6  border-1 border-transparent rounded-full flex justify-center items-center mx-auto mb-3 text-sm text-white',
                  item?.id < activeStepId && 'bg-orange-600',
                )}
              >
                {item?.id < activeStepId ? (
                  <TickIcon width={15} height={15} stroke={colors.white} />
                ) : (
                  <span
                    className={classNames(
                      'w-2 h-2 rounded-full',
                      item?.id <= activeStepId
                        ? 'bg-orange-500'
                        : 'bg-grey-200',
                    )}
                  />
                )}
              </span>
              Step 1
            </div>
          </div>
        ))}
      </div>
    </>
    // <div className="flex w-full justify-between items-center">
    //   {steps.map((item, index) => (
    //     <div
    //       key={item.id}
    //       className="w-full flex flex-col items-center gap-2 items-center bg-red-100"
    //     >
    //       {item.icon}

    //       <div className="w-full grid grid-cols-[1fr_[20px]_1fr] grid-rows-1 items-center justify-center bg-red-50">
    //         {index !== 0 && (
    //           <div className="col-start-1 col-end-2 row-start-1 row-end-1">
    //             <div
    //               className={classNames(
    //                 'w-full h-1',
    //                 item?.id <= activeStepId ? 'bg-orange-500' : 'bg-gray-200',
    //               )}
    //             />
    //           </div>
    //         )}

    //         <div
    //           className={classNames(
    //             'w-5 h-5 rounded-full flex justify-center items-center border col-start-2 col-end-3 row-start-1 row-end-1 border-orange-500',
    //             item?.id < activeStepId && 'bg-orange-500',
    //             item?.id <= activeStepId
    //               ? 'border-orange-500'
    //               : 'border-grey-500',
    //           )}
    //         >
    //           {item?.id < activeStepId ? (
    //             <TickIcon width={15} height={15} stroke={colors.white} />
    //           ) : (
    //             <span
    //               className={classNames(
    //                 'w-2 h-2 rounded-full',
    //                 item?.id <= activeStepId ? 'bg-orange-500' : 'bg-grey-200',
    //               )}
    //             />
    //           )}
    //         </div>

    //         {steps.length - 1 !== index && (
    //           <div className="col-start-1 col-end-2 row-start-1 row-end-1">
    //             <div
    //               className={classNames(
    //                 'w-full h-1',
    //                 item?.id <= activeStepId ? 'bg-orange-500' : 'bg-gray-200',
    //               )}
    //             />
    //           </div>
    //         )}
    //       </div>

    //       <span
    //         className={classNames(
    //           'text-[8px] font-medium	leading-3',
    //           item?.id <= activeStepId ? 'text-orange-500' : 'text-gray-200',
    //         )}
    //       >
    //         {item.title}
    //       </span>
    //     </div>
    //   ))}
    // </div>
  );
};

export default ProgressStepper;
