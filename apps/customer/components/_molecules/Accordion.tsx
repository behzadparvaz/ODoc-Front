import { ArrowDownIconOutLine } from '@com/icons';
import { colors } from '@configs/Theme';
import React, { ReactElement, ReactNode, useState } from 'react';

interface Props {
  header: string | ReactNode | ReactElement;
  content: string | ReactNode | ReactElement;
  contentClassName?: string;
  className?: string;
  hasArrowDown?: boolean;
}

const Accordion = ({
  header,
  content,
  contentClassName = '',
  className = '',
  hasArrowDown = true,
}: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`border border-grey-100 rounded-md my-4 ${className}`}>
      <div className="flex items-center justify-between px-4 py-2 cursor-pointer" onClick={toggleAccordion}>
        <p className="typo-subtitle-3">{header}</p>
        {hasArrowDown && (
          <ArrowDownIconOutLine
            width={24}
            height={24}
            stroke={colors?.grey[400]}
          />
        )}
      </div>
      {isOpen && (
        <div className={`typo-subtitle-2 px-4 py-3 ${contentClassName}`}>
          {content}
        </div>
      )}
    </div>
  );
};

export default Accordion;
