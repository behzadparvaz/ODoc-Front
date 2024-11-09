import { ArrowRightIconOutline } from '@com/icons';
import { colors } from '@configs/Theme';
import React, { ReactNode } from 'react';
import { CSSProperties } from 'react';
interface Props {
  description?: string | ReactNode;
  title?: string;
  sectionName?: string;
  actionButton?: ReactNode;
  tag?: string;
  className?: string;
  titleClassName?: string;
  sectionNameClassName?: string;
  descriptionClassName?: string;
  color?: string;
  style?: CSSProperties;
  rightActionButton?: ReactNode;
}

const SectionTitle = ({
  title,
  tag,
  description,
  sectionName,
  actionButton,
  className = '',
  titleClassName = '',
  sectionNameClassName = '',
  descriptionClassName = '',
  style,
  color,
  rightActionButton,
}: Props) => {
  const CustomTag: any = `${tag ? tag : 'p'}`;
  return (
    <div className={`flex flex-col ${className}`} style={style}>
      {sectionName && (
        <div
          style={{ color: color }}
          className={`font-extrabold text-[13px] truncate ${sectionNameClassName}`}
        >
          <p>{sectionName}</p>
        </div>
      )}
      <div
        className={`flex justify-between ${sectionName ? 'items-end' : 'items-center'}`}
      >
        {rightActionButton && <div>{rightActionButton}</div>}
        <CustomTag className={`typo-subtitle-2 truncate ${titleClassName}`}>
          {title}
        </CustomTag>
        <div>{actionButton}</div>
      </div>
      {description && (
        <div
          className={`text-2xs text-grey-500 truncate mt-1 ${descriptionClassName}`}
        >
          <p>{description}</p>
        </div>
      )}
    </div>
  );
};
export default SectionTitle;
