import React, {
  memo,
  useState,
  useCallback,
  CSSProperties,
  Dispatch,
  SetStateAction,
} from 'react';
import { useEffect } from 'react';
import SingleInput from './SingleOTPInput';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { getDataFromCookies } from '@utilities/cookiesUtils';

export interface OTPInputProps {
  length: number;
  onChangeOTP?: (otp: string) => any;
  onPasteOtp?: (otp: string) => any;
  setState?: Dispatch<
    SetStateAction<{ mobileNumber: string; code: string; handleReset: boolean }>
  >;
  autoFocus?: boolean;
  isNumberInput?: boolean;
  disabled?: boolean;
  style?: CSSProperties;
  className?: string;
  inputStyle?: CSSProperties;
  inputClassName?: string;
  name?: string;
  reset?: boolean;
  helperText?: string;
}

export function OTPInputComponent(props: OTPInputProps) {
  const {
    length,
    isNumberInput,
    autoFocus,
    disabled,
    onChangeOTP,
    onPasteOtp,
    inputClassName,
    inputStyle,
    name,
    reset,
    setState,
    helperText = '',
    ...rest
  } = props;
  const router = useRouter();
  const autoOtp = getDataFromCookies('otp');
  const [activeInput, setActiveInput] = useState(0);
  const [otpValues, setOTPValues] = useState(Array<string>(length).fill(''));
  const appVersion =
    router.query.app_version || getDataFromCookies('app_version');

  // Helper to return OTP from inputs
  const handleOtpChange = useCallback(
    (otp: string[]) => {
      const otpValue = otp.join('');
      onChangeOTP(otpValue);
    },
    [onChangeOTP],
  );

  // Helper to return value with the right type: 'text' or 'number'
  const getRightValue = useCallback(
    (str: string) => {
      let changedValue = str;
      if (!isNumberInput) {
        return changedValue;
      }
      return !changedValue || /\d/.test(changedValue) ? changedValue : '';
    },
    [isNumberInput],
  );

  // Change OTP value at focussing input
  const changeCodeAtFocus = useCallback(
    (str: string) => {
      const updatedOTPValues = [...otpValues];
      updatedOTPValues[activeInput] = str?.[0] || '';
      setOTPValues(updatedOTPValues);
      handleOtpChange(updatedOTPValues);
    },
    [activeInput, handleOtpChange, otpValues],
  );

  // Focus `inputIndex` input
  const focusInput = useCallback(
    (inputIndex: number) => {
      const selectedIndex = Math.max(Math.min(length - 1, inputIndex), 0);
      setActiveInput(selectedIndex);
    },
    [length],
  );

  const focusPrevInput = useCallback(() => {
    focusInput(activeInput - 1);
  }, [activeInput, focusInput]);

  const focusNextInput = useCallback(() => {
    focusInput(activeInput + 1);
  }, [activeInput, focusInput]);

  // Handle onFocus input
  const handleOnFocus = useCallback(
    (index: number) => () => {
      focusInput(index);
    },
    [focusInput],
  );

  // Handle onChange value for each input
  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = getRightValue(e.currentTarget.value);
      if (!val) {
        e.preventDefault();
        return;
      }
      changeCodeAtFocus(val);
      focusNextInput();
    },
    [changeCodeAtFocus, focusNextInput, getRightValue],
  );

  // Hanlde onBlur input
  const onBlur = useCallback(() => {
    setActiveInput(-1);
  }, []);

  // Handle onKeyDown input
  const handleOnKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      switch (e.key) {
        case 'Backspace':
        case 'Delete': {
          e.preventDefault();
          if (otpValues[activeInput]) {
            focusPrevInput();
            changeCodeAtFocus('');
          } else {
            focusPrevInput();
          }
          break;
        }
        case 'ArrowLeft': {
          e.preventDefault();
          focusPrevInput();
          break;
        }
        case 'ArrowRight': {
          e.preventDefault();
          focusNextInput();
          break;
        }
        case ' ': {
          e.preventDefault();
          break;
        }
        default:
          break;
      }
    },
    [activeInput, changeCodeAtFocus, focusNextInput, focusPrevInput, otpValues],
  );

  const handleOnPaste = useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      onPasteOtp(e.clipboardData?.getData('text/plain')?.trim());
      const clipboardData = e.clipboardData?.getData('text/plain')?.trim();
      const pastedData = e.clipboardData
        ?.getData('text/plain')
        ?.trim()
        ?.slice(0, length - activeInput)
        ?.split('');
      if (pastedData) {
        let nextFocusIndex = 0;
        const updatedOTPValues = [...clipboardData];
        updatedOTPValues.forEach((val, index) => {
          if (index >= activeInput) {
            const changedValue = getRightValue(clipboardData);
            if (changedValue) {
              updatedOTPValues[index] = changedValue[index];
              nextFocusIndex = index;
            }
          }
        });
        setOTPValues(updatedOTPValues);
        setActiveInput(Math.min(nextFocusIndex + 1, length - 1));
      }
    },
    [activeInput, getRightValue, length, otpValues],
  );

  const handleReset = useCallback(() => {
    const updatedOTPValues = [...otpValues];
    updatedOTPValues.forEach((val, index) => {
      updatedOTPValues[index] = '';
    });
    setOTPValues(updatedOTPValues);
    setActiveInput(0);
  }, [otpValues, setState]);

  useEffect(() => {
    if (reset) {
      handleReset();
    }
  }, [reset]);

  return (
    <div className="flex flex-col relative">
      <div {...rest}>
        {Array(length)
          .fill('')
          .map((_, index) => (
            <SingleInput
              key={`SingleInput-${index}`}
              focus={activeInput === index}
              value={otpValues && otpValues[index]}
              autoFocus={autoFocus}
              onFocus={handleOnFocus(index)}
              onChange={handleOnChange}
              onKeyDown={handleOnKeyDown}
              onBlur={onBlur}
              onPaste={handleOnPaste}
              style={inputStyle}
              className={inputClassName}
              disabled={disabled}
              inputMode="numeric"
              type="text"
              autoComplete="one-time-code"
            />
          ))}
      </div>
      {helperText ? (
        <p className="text-red-800 text-2xs mt-1 mb-2">{`*${helperText}!`}</p>
      ) : null}
    </div>
  );
}

const OTPInput = memo(OTPInputComponent);
export default OTPInput;
