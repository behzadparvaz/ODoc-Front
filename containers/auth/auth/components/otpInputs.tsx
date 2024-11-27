import React, { useRef, useState } from 'react';

type InputProps = {
  length?: number;
  onComplete: (pin: string) => void;
};

const OTPInput = ({ length = 6, onComplete }: InputProps) => {
  const inputRef = useRef<HTMLInputElement[]>(Array(length).fill(null));
  const [OTP, setOTP] = useState<string[]>(Array(length).fill(''));

  const handleTextChange = (input: string, index: number) => {
    const newPin = [...OTP];
    newPin[index] = input;
    setOTP(newPin);

    // Autofocus on next input
    if (input.length === 1 && index < length - 1) {
      inputRef.current[index + 1]?.focus();
    }

    // Focus on previous input if current is empty
    if (input.length === 0 && index > 0) {
      inputRef.current[index - 1]?.focus();
    }

    // Call onComplete when all inputs are filled
    if (newPin.every((digit) => digit.length === 1)) {
      onComplete(newPin.join(''));
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === 'Backspace' && OTP[index] === '') {
      // Focus on previous input if current is empty and backspace is pressed
      if (index > 0) {
        inputRef.current[index - 1]?.focus();
      }
    }
  };

  return (
    <div className="flex justify-between gap-2 px-2 flex-row-reverse max-w-[400px] m-auto">
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => (inputRef.current[index] = el)}
          type="text"
          maxLength={1}
          value={OTP[index]}
          onChange={(e) => handleTextChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)} // Add key down event handler
          className={
            'appearance-none text-left min-w-[52px] h-[52px] py-2 px-4 truncate no-spinner rounded-md bg-grey-100 text-sm font-normal leading-6 text-black placeholder:text-2xs placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-black focus:border-black autofill:shadow-[inset_0_0_0px_1000px_#eaeded]'
          }
          autoComplete="one-time-code" // Enable autofill
        />
      ))}
    </div>
  );
};

export default OTPInput;
