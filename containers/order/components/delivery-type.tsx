import { useState } from 'react';
import classNames from 'classnames';

import CheckBox from '@com/_atoms/CheckBox.nd';
import { Radio } from '@com/_atoms/Radio';
import { colors } from '@configs/Theme';
import Icon from '@utilities/icon';

import { DeliveryTypeEnum } from '../offer-preview';

const dates: {
  day: string;
  date: string;
}[] = [
  { day: '۳ شنبه', date: '۲۳ بهمن' },
  { day: '۴ شنبه', date: '۲۴ بهمن' },
  { day: '۵ شنبه', date: '۲۵ بهمن' },
];

const times: {
  time: string;
  id: number;
}[] = [
  { time: 'ساعت ۹ تا ۱۲', id: 1 },
  { time: 'ساعت ۱۵ تا ۲۱', id: 2 },
];

type DeliveryTypeProps = {
  onChangeDeliveryType: (deliveryType: {
    type: DeliveryTypeEnum;
    date?: string;
    time?: string;
  }) => void;
};

const DeliveryType = ({ onChangeDeliveryType }: DeliveryTypeProps) => {
  const [selectedDeliveryType, setSelectedDeliveryType] = useState<{
    name: string;
    value: number;
  }>({ name: 'تحویل آنی', value: 1 });

  const [selectedDate, setSelectedDate] = useState<{
    day: string;
    date: string;
  }>(dates[0]);

  const [selectedTime, setSelectedTime] = useState<{
    time: string;
    id: number;
  }>(times[0]);

  const renderDay = (index) => {
    if (index === 0) {
      return '(امروز)';
    } else if (index === 1) {
      return '(فردا)';
    }
    return '';
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
              setSelectedDeliveryType({ name: 'تحویل آنی', value: 1 });
              onChangeDeliveryType({ type: DeliveryTypeEnum.onDemand });
            }}
            className="w-max"
          />

          <div className="flex items-center gap-x-1  bg-surface-warning rounded-full px-[6px]">
            <Icon name="HelmetsRtl" width={1} height={1} fill={colors.black} />
            <span className="text-md">۷۵٬۰۰۰ تومان</span>
          </div>
        </div>

        <div className="h-10 flex gap-x-2 items-center">
          <Radio
            id="all"
            label="انتخاب زمان ارسال"
            checked={selectedDeliveryType?.value === 2}
            handleChange={() =>
              setSelectedDeliveryType({ name: 'انتخاب زمان ارسال', value: 2 })
            }
            className="w-max"
          />
          <div className="flex items-center gap-x-1 bg-surface-warning rounded-full px-[6px]">
            <Icon name="HelmetsRtl" width={1} height={1} fill={colors.black} />
            <span className="text-md">رایگان</span>
          </div>
        </div>
      </div>

      {selectedDeliveryType?.value === 2 && (
        <div className="flex gap-x-2 items-center">
          {dates?.map((item, index) => (
            <div
              key={index}
              className="flex flex-col gap-y-1 items-center"
              onClick={() => setSelectedDate(item)}
            >
              <span
                className={classNames(
                  'w-max flex items-center rounded-full border  text-sm text-content-primary px-2 py-1 gap-x-1 cursor-pointer',
                  selectedDate?.date === item?.date
                    ? 'border-border-inversePrimary bg-surface-secondary'
                    : 'border-border-primary',
                )}
              >
                {item?.day}
                <span>{renderDay(index)}</span>
              </span>
              <span className="text-content-tertiary text-xs">
                {item?.date}
              </span>
            </div>
          ))}
        </div>
      )}

      {selectedDeliveryType?.value === 2 && (
        <div className="flex flex-col gap-y-2">
          {times?.map((item) => (
            <CheckBox
              icon={
                <Icon name="Check" width={1} height={1} fill={colors.white} />
              }
              key={item?.id}
              label={item?.time}
              id={String(item?.id)}
              checked={selectedTime?.id === item?.id}
              handleChange={() => {
                setSelectedTime(item);
                onChangeDeliveryType({
                  type: DeliveryTypeEnum.schedule,
                  date: selectedDate?.date,
                  time: item?.time,
                });
              }}
              labelClassName="mr-8"
              className="w-max "
              boxClassName="w-4 h-4 rounded-sm border-grey-800"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DeliveryType;
