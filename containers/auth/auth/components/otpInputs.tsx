import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

type InputProps = {
  length?: number;
  onComplete: (pin: string) => void;
  disabled?: boolean;
};
interface IOtpInputRef {
  getOTP: () => string;
}

const OTPInput = forwardRef<IOtpInputRef, InputProps>(
  ({ length = 6, onComplete, disabled }: InputProps, ref) => {
    const inputRef = useRef<(HTMLInputElement | null)[]>(
      Array(length).fill(null),
    );
    const [OTP, setOTP] = useState<string[]>(Array(length).fill(''));

    useImperativeHandle(ref, () => ({
      getOTP: () => OTP.join(''),
    }));

    const handleTextChange = (input: string, index: number) => {
      const newPin = [...OTP];
      newPin[index] = input;

      setOTP(newPin);

      if (input.length === 1 && index < length - 1) {
        inputRef.current[index + 1]?.focus();
      }

      if (input.length === 0 && index > 0) {
        inputRef.current[index - 1]?.focus();
      }

      if (newPin.every((digit) => digit.length === 1)) {
        onComplete(newPin.join(''));
      }
    };

    const handleKeyDown = (
      e: React.KeyboardEvent<HTMLInputElement>,
      index: number,
    ) => {
      if (e.key === 'Backspace' && OTP[index] === '') {
        if (index > 0) {
          inputRef.current[index - 1]?.focus();
        }
      }
    };

    const handleFocus = (index: number) => {
      inputRef.current[index]?.select();
    };

    useEffect(() => {
      inputRef.current[0]?.focus();
    }, []);

    return (
      <div className="flex justify-center gap-2 flex-row-reverse m-auto">
        {Array.from({ length }).map((_, index) => (
          <input
            key={index}
            ref={(el) => (inputRef.current[index] = el)}
            type="text"
            maxLength={1}
            value={OTP[index]}
            onChange={(e) => {
              const newValue = e.target.value?.toEnglishDigits();
              if (/^\d*$/.test(newValue)) {
                handleTextChange(newValue, index);
              }
            }}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="text-center appearance-none min-w-[42px] h-[52px] py-2 px-4 truncate no-spinner rounded-md bg-grey-100 text-sm font-normal leading-6 text-black placeholder:text-2xs placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-black focus:border-black autofill:shadow-[inset_0_0_0px_1000px_#eaeded]"
            autoComplete="one-time-code"
            disabled={disabled}
            onFocus={() => handleFocus(index)}
            aria-label={`OTP digit ${index + 1}`}
          />
        ))}
      </div>
    );
  },
);

export default OTPInput;