import Box from '@com/_atoms/Box';
import { useMemo } from 'react';
import classNames from 'classnames';
import CheckBox from '@com/_atoms/CheckBox.nd';
import { TickIcon } from '@com/icons';
import { colors } from '@configs/Theme';
import { formattingDate } from '@utilities/mainUtils';

const cutoffHour = 13;

const makeDates = (() => {
  const currentDate = new Date();
  const currentHour = Number(
    currentDate.toLocaleTimeString('en-UK', {
      timeZone: 'Asia/Tehran',
      hour: 'numeric',
    }),
  );

  const day = new Date(
    currentDate.setDate(
      currentDate.getDate() + (currentHour >= cutoffHour ? 2 : 1),
    ),
  );

  return [
    {
      label: day.toLocaleDateString('fa-IR'),
      value: formattingDate(day),
    },
  ];
})();

const SelectDeliveryDate = ({ deliveryDate, setDeliveryDate }) => {
  return (
    <Box>
      <div className="text-xs mb-2">زمان تحویل</div>

      {makeDates.map((item) => (
        <div
          key={item.value}
          className={classNames(
            'w-full bg-grey-50 bg-opacity-30 text-xs rounded-md border border-grey-200 my-2 py-2 px-2 transition-all duration-300 leading-5',
            deliveryDate === item.value && 'border-teal-600 bg-teal-100',
          )}
          onClick={() => setDeliveryDate(item.value)}
        >
          <CheckBox
            handleChange={() => setDeliveryDate(item.value)}
            onClick={() => {}}
            label={item.label}
            labelClassName="text-xs mr-6 font-normal text-grey-700"
            icon={
              <TickIcon
                width={15}
                height={15}
                stroke={colors.white}
                className="mx-auto mt-[1px]"
              />
            }
            checkedClassName="!bg-grey-500"
            boxClassName="w-4 h-4 rounded-full border-grey-800"
            checked={deliveryDate === item.value}
            value={item.value}
            className="w-full z-0"
          />
        </div>
      ))}
    </Box>
  );
};

export default SelectDeliveryDate;
