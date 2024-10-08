import classNames from 'classnames';
import { PropsWithChildren } from 'react';

export interface BoxProps {
  className?: string;
  borderColor?: string;
}

export const Box = ({
  children,
  className,
  borderColor = 'grey-100',
}: PropsWithChildren<BoxProps>) => {
  return (
    <div
      className={classNames(
        `flex flex-col border rounded-xl p-4 mt-3`,
        'border-' + borderColor,
        className,
      )}
    >
      {children}
    </div>
  );
};
