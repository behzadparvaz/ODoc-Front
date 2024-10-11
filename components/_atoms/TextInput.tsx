import React, { FC, ReactElement, forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import type { VariantProps } from 'class-variance-authority';
import classNames from 'classnames';
import clsx from 'clsx';
import { colors as colorPalette } from '@configs/Theme';

const InputVariants = cva([], {
  variants: {
    variant: {
      default:
        'flex item-center justify-start bg-white px-4 py-3 outline-none border border-grey-200 placeholder-grey-300',
    },
    rounded: {
      none: 'rounded-0',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
      xxl: 'rounded-2xl',
      full: 'rounded-full',
    },
    inputSize: {
      default: 'w-full h-10',
    },
    border: {
      default: 'border',
      none: 'border-0',
    },
    disabled: {
      true: true,
      false: false,
    },
    error: {
      true: true,
      false: false,
    },
    borderColor: colorPalette.gray,
    textColor: colorPalette.gray,
    fontSize: {
      xxs: 'text-2xs',
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-md',
      lg: 'text-lg',
      '11': 'text-[11px]',
    },
    fontWeight: {
      thin: 'font-thin',
      light: 'font-light',
      exteralight: 'font-extralight',
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
      exterabold: 'font-exterabold',
      black: 'font-black',
    },
  },
  //****** Variants that apply when multiple other variant conditions are met ******------------------
  compoundVariants: [
    { variant: 'default', error: true, className: 'border border-red-800' },
  ],
  defaultVariants: {
    variant: 'default',
    inputSize: 'default',
    rounded: 'xl',
    textColor: 800,
    fontSize: '11',
  },
});

type InputType = {
  helperText?: string;
  leftIcon?: ReactElement;
  rightIcon?: ReactElement;
  labelIcon?: ReactElement;
  wrapperClassName?: string;
  labelClassName?: string;
  helperClassName?: string;
};

interface InputProps
  extends React.AllHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof InputVariants> {
  ref?: any;
}

const TextInput: FC<InputProps & InputType> = forwardRef(
  (
    {
      variant,
      type,
      inputSize,
      rounded,
      border,
      error,
      borderColor,
      disabled,
      textColor,
      fontSize,
      fontWeight,
      className = '',
      children,
      ...props
    },
    ref,
  ) => {
    const inputProps = {
      className: `${'rightIcon' in props ? `${className} pr-10` : className}`,
    };
    const labelProps = {
      className: `flex mb-2 text-grey-800 typo-body-5 ${props?.labelClassName ? props?.labelClassName : ''}`,
    };
    const wrapperProps = {
      className: `flex flex-col relative ${props?.wrapperClassName ? props?.wrapperClassName : ''}`,
    };
    const helperTextProps = {
      className: `text-red-800 text-2xs mt-1 ${props?.helperClassName ? props?.helperClassName : ''}`,
    };
    const leftIconProps = {
      className: 'absolute inline left-4 h-10 top-1/2 -translate-y-1/2',
    };
    const rightIconProps = {
      className: 'absolute right-4 h-10 bottom-0 flex flex-col justify-center',
    };
    const labelIconProps = {
      className: 'ml-1.5 pl-1 border-l border-grey-100',
    };

    return (
      <div {...wrapperProps}>
        {'label' in props ? (
          <label {...labelProps}>
            {'labelIcon' in props ? (
              <div {...labelIconProps}>{props.labelIcon}</div>
            ) : null}
            {props.label}
          </label>
        ) : null}
        <div className="relative">
          <input
            ref={ref}
            type={type}
            className={classNames(
              clsx(
                InputVariants({
                  variant,
                  inputSize,
                  rounded,
                  border,
                  error,
                  borderColor,
                  disabled,
                  textColor,
                  fontSize,
                  fontWeight,
                  className,
                  ...inputProps,
                }),
              ),
            )}
            {...props}
          ></input>
          {'leftIcon' in props ? (
            <div {...leftIconProps}>{props.leftIcon}</div>
          ) : null}
          {'rightIcon' in props ? (
            <div {...rightIconProps}>{props.rightIcon}</div>
          ) : null}
        </div>
        {'helperText' in props && !!props.helperText ? (
          <p {...helperTextProps}>{`* ${props.helperText}`}</p>
        ) : null}
      </div>
    );
  },
);

export default TextInput;
