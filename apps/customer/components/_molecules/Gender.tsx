import CheckBox from '@com/_atoms/CheckBox.nd';
import { TickIcon } from '@com/icons';
import { colors } from '@configs/Theme';
import React from 'react';

type GenderProps = {
  label?: string
  name: string
  value: string | number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Gender = ({ label, name, value, onChange }: GenderProps) => {

  const onChangeGender = (val: string | number) => {
    const event: React.ChangeEvent<HTMLInputElement> = {
      target: { name: name, value: val, type: 'text' } as EventTarget & HTMLInputElement,
      currentTarget: { name: name, value: val, type: 'text' } as EventTarget & HTMLInputElement,
      bubbles: true,
      cancelable: true,
      defaultPrevented: false,
      eventPhase: 3,
      isTrusted: true,
      preventDefault: () => {},
      isDefaultPrevented: () => false,
      stopPropagation: () => {},
      isPropagationStopped: () => false,
      persist: () => {},
      timeStamp: Date.now(),
      type: 'change',
      nativeEvent: new Event('change')
    };
    onChange(event);
  };

  return <div>
    {label && <label className={`text-grey-800 mb-2 font-normal text-sm`}>
      {label}
    </label>}
    <div className="flex">
      <CheckBox
        handleChange={() => onChangeGender(1)}
        label={`مرد`}
        labelClassName="text-sm mr-6 font-normal text-grey-700"
        name={name}
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
        checked={value === 1}
        className="w-full mt-3 z-0"
      />
      <CheckBox
        handleChange={() => onChangeGender(2)}
        label={`زن`}
        labelClassName="text-sm mr-6 font-normal text-grey-700"
        name={name}
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
        checked={value === 2}
        className="w-full mt-3 z-0"
      />
    </div>
  </div>;
};

export default Gender;
