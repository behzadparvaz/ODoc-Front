import { ReactNode } from 'react';

export type IconModel = {
  width: number;
  height: number;
  stroke?: string;
  fill?: string;
  className?: string;
  children?: ReactNode;
  onClick?: () => void;
};
