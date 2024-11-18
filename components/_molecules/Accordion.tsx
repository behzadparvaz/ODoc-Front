import { ArrowDownIconOutLine } from '@com/icons';
import { colors } from '@configs/Theme';
import React, { ReactElement, ReactNode, useState } from 'react';

interface Props {
  header: string | ReactNode | ReactElement;
  content: string | ReactNode | ReactElement;
  contentClassName?: string;
  className?: string;
  hasArrowDown?: boolean;
  label?: string;
}

const Accordion = ({
  header,
  content,
  contentClassName = '',
  className = '',
  hasArrowDown = true,
  label,
}: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={` my-4 ${className}`}>
      <div className="flex flex-col gap-y-1">
        {label && (
          <span
            className="text-xs text-content-primary font-semibold
        "
          >
            {label}
          </span>
        )}
        <div
          className="flex items-center justify-between px-4 py-2 cursor-pointer bg-gray-100 rounded-md"
          onClick={toggleAccordion}
        >
          <p className="text-content-tertiary typo-subtitle-3">{header}</p>
          {hasArrowDown && (
            <ArrowDownIconOutLine
              width={24}
              height={24}
              stroke={colors?.grey[400]}
            />
          )}
        </div>
      </div>
      {isOpen && (
        <div
          className={`typo-subtitle-2 px-4 py-3 border border-grey-100 rounded-md ${contentClassName}`}
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default Accordion;
