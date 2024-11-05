import { colors } from '@configs/Theme';
import React from 'react';

type Props = {
  value: number | string;
  className?: string;
  backgroundColor?: string;
  style?: React.CSSProperties;
};

export default function Badge({
  value,
  className = '',
  backgroundColor = colors.red[500],
  style = {},
}: Props) {
  return (
    <div
      className={`w-auto h-6 text-center text-sm font-medium leading-none border border-white rounded-[100px] py-1 px-2 ${className}`}
      style={{ ...style, backgroundColor }}
    >
      {value}
    </div>
  );
}
