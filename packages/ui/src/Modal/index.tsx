import { ReactNode } from 'react';
import classNames from 'classnames';
import { colorPalette } from '../theme';
import { CloseIconOutline } from '../icons';

export interface ModalProps {
  className?: string;
  title?: string;
  children?: ReactNode;
}

export const Modal = ({ className, title, children }: ModalProps) => {
  return (
    <div
      className={classNames(
        'w-full grid h-full overflow-hidden grid-rows-[50px_1fr]',
        className,
      )}
    >
      <div className="relative row-start-1 row-span-1 flex justify-between items-center w-full">
        <span className="absolute top-0 left-0 flex items-center justify-center">
          <CloseIconOutline
            stroke={colorPalette.grey[600]}
            width={20}
            height={20}
          />
        </span>
        <span className="absolute top-0 left-1/2 flex items-center justify-center -translate-x-1/2 text-grey-600 text-md font-semibold">
          {title}
        </span>
      </div>

      <div className="row-start-2 row-span-1">{children}</div>
    </div>
  );
};
