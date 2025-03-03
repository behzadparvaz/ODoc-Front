import classNames from 'classnames';
import { forwardRef, useImperativeHandle, useState } from 'react';

import CheckBox from '@com/_atoms/CheckBox.nd';
import { Radio } from '@com/_atoms/Radio';
import { colors } from '@configs/Theme';
import Icon from '@utilities/icon';

import { useGetRoyalOrderDeliveryScheduleTime } from '@api/order/orderApis.rq';
import moment from 'jalali-moment';

type DeliveryTypeProps = {
  onChangeDeliveryType: (value: number) => void;
  defaultSelectedIndex?: number;
};

const DeliveryType = forwardRef(
  (
    { onChangeDeliveryType, defaultSelectedIndex = 1 }: DeliveryTypeProps,
    ref,
  ) => {
    const items = [
      { name: 'تحویل آنی', value: 1 },
      { name: 'انتخاب زمان ارسال', value: 2 },
    ];
    const [selectedDeliveryType, setSelectedDeliveryType] = useState<{
      name: string;
      value: number;
    }>(items[defaultSelectedIndex]);

    const { data: royalOrderDeliveryScheduleTime } =
      useGetRoyalOrderDeliveryScheduleTime();

    const [selectedDate, setSelectedDate] = useState<{
      date: string;
      dayOfWeek: string;
      timeSlots: { id: number; timeRange: string }[];
    }>(royalOrderDeliveryScheduleTime?.[0]);

    const [selectedTime, setSelectedTime] = useState<{
      timeRange: string;
      id: number;
    }>(royalOrderDeliveryScheduleTime?.[0]?.timeSlots?.[0]);

    useImperativeHandle(ref, () => {
      return {
        type: selectedDeliveryType,
        date: selectedDate || royalOrderDeliveryScheduleTime?.[0]?.date,
        time:
          selectedTime || royalOrderDeliveryScheduleTime?.[0]?.timeSlots?.[0],
      };
    }, [
      selectedDate,
      selectedTime,
      selectedDeliveryType,
      royalOrderDeliveryScheduleTime,
    ]);

    const resetDeliveryType = () => {
      setSelectedDeliveryType({ name: 'تحویل آنی', value: 1 });
      setSelectedDate(royalOrderDeliveryScheduleTime?.[0]);
      setSelectedTime(royalOrderDeliveryScheduleTime?.[0]?.timeSlots?.[0]);
      onChangeDeliveryType(1);
    };
    return (
      <div className="flex flex-col gap-y-3 px-4 min-h-[160px] h-max p-4">
        <span className="text-md">زمان و هزینه ارسال</span>

        <div className="flex flex-col gap-y-2">
          <div className="h-10 flex gap-x-2 items-center">
            <Radio
              id="all"
              label="تحویل آنی"
              checked={selectedDeliveryType?.value === 1}
              handleChange={() => {
                resetDeliveryType();
              }}
              className="w-max"
            />

            <div className="flex items-center gap-x-1  bg-surface-warning rounded-full px-[6px]">
              <Icon
                name="HelmetsRtl"
                width={1}
                height={1}
                fill={colors.black}
              />
              <span className="text-md">۷۵٬۰۰۰ تومان</span>
            </div>
          </div>

          <div className="h-10 flex gap-x-2 items-center">
            <Radio
              id="all"
              label="انتخاب زمان ارسال"
              checked={selectedDeliveryType?.value === 2}
              handleChange={() => {
                setSelectedDeliveryType(items[1]);
                onChangeDeliveryType(2);
              }}
              className="w-max"
            />
            <div className="flex items-center gap-x-1 bg-surface-warning rounded-full px-[6px]">
              <Icon
                name="HelmetsRtl"
                width={1}
                height={1}
                fill={colors.black}
              />
              <span className="text-md">رایگان</span>
            </div>
          </div>
        </div>

        {selectedDeliveryType?.value === 2 && (
          <div className="flex gap-x-2 items-center">
            {royalOrderDeliveryScheduleTime?.map((item, index) => (
              <div
                key={index}
                className="flex flex-col gap-y-1 items-center"
                onClick={() => {
                  setSelectedDate(item);
                  setSelectedTime(item?.timeSlots?.[0]);
                }}
              >
                <span
                  className={classNames(
                    'w-max min-w-20 flex items-center justify-center rounded-full border text-sm text-content-primary px-2 py-1 gap-x-1 cursor-pointer',
                    selectedDate?.date === item?.date
                      ? 'border-border-inversePrimary bg-surface-secondary'
                      : 'border-border-primary',
                  )}
                >
                  {item?.dayOfWeek}
                </span>
                <span className="text-content-tertiary text-xs">
                  {moment(item?.date, 'jYYYY/jMM/jDD')
                    .locale('fa')
                    .format('DD MMMM')}
                </span>
              </div>
            ))}
          </div>
        )}

        {selectedDeliveryType?.value === 2 && (
          <div className="flex flex-col gap-y-2">
            {selectedDate?.timeSlots?.map((item) => (
              <CheckBox
                icon={
                  <Icon name="Check" width={1} height={1} fill={colors.white} />
                }
                key={item?.id}
                label={item?.timeRange}
                id={String(item?.id)}
                checked={selectedTime?.id === item?.id}
                handleChange={() => {
                  setSelectedTime(item);
                }}
                labelClassName="mr-8"
                className="w-max"
                boxClassName="w-4 h-4 rounded-sm border-grey-800 border block"
              />
            ))}
          </div>
        )}
      </div>
    );
  },
);

export default DeliveryType;
