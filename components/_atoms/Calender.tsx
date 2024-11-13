import React from 'react';
import DatePicker, { DatePickerProps } from 'react-multi-date-picker';
import persian_fa from 'react-date-object/locales/persian_fa';
import persian from 'react-date-object/calendars/persian';
import 'react-multi-date-picker/styles/layouts/mobile.css';

type CalenderProps = Omit<DatePickerProps, 'onChange' | 'value'> & {
  value: number;
  className?: string;
  labelClassName?: string;
  label?: string;
  required?: boolean;
  errorMessage?: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Calender = ({
  label,
  required,
  className,
  labelClassName,
  errorMessage,
  onChange,
  name,
  ...props
}: CalenderProps) => {
  const onChangeDate = (val: string | number) => {
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
    <div className={`flex flex-col ${className}`}>
      {label && (
        <label className={`text-[11px] text-grey-800 mb-2 ${labelClassName}`}>
          {label}
          {required && <span className="text-red-600">*</span>}
        </label>
      )}
      <DatePicker
        {...props}
        onChange={(val) => onChangeDate(Number(val))}
        calendar={persian}
        locale={persian_fa}
        className="rmdp-mobile z-50"
        inputClass="h-10 w-full rounded-md outline-none placeholder-grey-300 border border-grey-300 text-grey-600 text-xs px-4"
        portal
      />
      {errorMessage && (
        <p className="text-2xs font-normal text-red-800 mx-1 mt-2">
          {errorMessage}
        </p>
      )}
    </div>
  );
};
export default Calender;
