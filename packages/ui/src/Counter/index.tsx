import { ChangeEvent, useState } from 'react';
import { IconButton } from '../IconButton';
import { MinusIconOutline, PlusIconOutline } from '../icons';
import { TextInput, TextInputProps } from '../TextInput';
import { colorPalette } from '../theme';

export interface CounterProps extends TextInputProps {
  id: string;
  handleDecrement: () => void;
  handleIncrement: () => void;
}

export const Counter = ({
  id,
  value,
  max,
  handleDecrement,
  handleIncrement,
  onChange,
  onBlur,
}: CounterProps) => {
  return (
    <div className="flex gap-x-2 items-center justify-between">
      <IconButton
        size="large"
        buttonType="contained"
        handleClick={handleIncrement}
        className={value >= max && '!bg-grey-100'}
        disabled={value >= max}
      >
        <PlusIconOutline
          height={20}
          width={20}
          fill={colorPalette.grey[1000]}
        />
      </IconButton>

      <TextInput
        className="!w-10"
        inputClassName="!w-10 !p-0 text-center"
        type="number"
        id={id}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />

      <IconButton
        size="large"
        buttonType="contained"
        handleClick={handleDecrement}
        className={!value && '!bg-grey-100'}
        disabled={!value}
      >
        <MinusIconOutline
          height={20}
          width={20}
          fill={colorPalette.grey[1000]}
        />
      </IconButton>
    </div>
  );
};
