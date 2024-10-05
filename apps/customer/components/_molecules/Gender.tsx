import { Radio } from '@com/_atoms/Radio';
import React from 'react';

type GenderProps = {
  label?: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Gender = ({ label, name, value, onChange }: GenderProps) => {
  const onChangeGender = (val: string | number) => {
    const event: React.ChangeEvent<HTMLInputElement> = {
      target: { name: name, value: val, type: 'text' } as EventTarget &
        HTMLInputElement,
      currentTarget: { name: name, value: val, type: 'text' } as EventTarget &
        HTMLInputElement,
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
      nativeEvent: new Event('change'),
    };
    onChange(event);
  };

  return (
    <div className="flex flex-col gap-y-[23px]">
      {label && (
        <label className={`text-black font-semibold text-md leading-6`}>
          {label}
        </label>
      )}
      <div className="flex flex-col gap-y-[30px]">
        <Radio
          handleChange={() => onChangeGender(1)}
          label={`مرد`}
          name={name}
          checked={value === 1}
          labelClassName="mr-4"
        />
        <Radio
          handleChange={() => onChangeGender(2)}
          label={`زن`}
          name={name}
          checked={value === 2}
          labelClassName="mr-4"
        />
      </div>
    </div>
  );
};

export default Gender;
