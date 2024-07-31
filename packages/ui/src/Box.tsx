import classNames from 'classnames';
import React, { PropsWithChildren } from 'react';

type BoxProps = {
  className?: string
  borderColor?: string
}

export const Box: React.FC<PropsWithChildren<BoxProps>> = ({ children, className, borderColor = 'grey-100' }) => {
  return <div className={classNames(`flex flex-col border rounded-xl p-4 mt-3`, 'border-' + borderColor, className)}>
    {children}
  </div>;
};
