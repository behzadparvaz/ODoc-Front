import useModal from '@hooks/useModal';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { ReactNode, useRef, useState } from 'react';
import { CloseSquareIconOutline } from '@com/icons';
import { colors } from '@configs/Theme';
import { CSSProperties } from 'react';
import {
  mobileModeWidth,
  shouldShowMobileMode,
} from '@configs/ControlMobileView';

const SectionTitle = dynamic(() => import('@com/_molecules/SectionTitle.nd'));

interface Props {
  height: number | string;
  minHeight?: number | string;
  padding?: number | string;
  className?: string;
  isDraggable?: boolean;
  touchAreaWidth?: number | string;
  touchAreaHeight?: number | string;
  bottom?: number | string;
  hasCloseButton?: boolean;
  title?: string;
  style?: CSSProperties;
  titleClassName?: string;
  rightActionButton?: ReactNode;
}

export const BottomModalContainer: React.FC<Props> = ({
  children,
  height,
  minHeight,
  padding,
  className = '',
  isDraggable = false,
  touchAreaWidth = '100%',
  touchAreaHeight = '72px',
  bottom,
  hasCloseButton = true,
  title = '',
  style = {},
  titleClassName = '',
  rightActionButton = false,
}) => {
  const { removeLastModal } = useModal();
  const bottomModalRef = useRef(null);
  const [touchY, setTouchY] = useState<number | undefined>();

  const handleTouchMove = (e) => {
    let diff = e?.touches?.[0]?.clientY - touchY;
    if (touchY !== undefined && diff >= 0) {
      bottomModalRef.current.style.transform = `translateY(${diff}px)`;
    } else return;
  };

  const handleTouchStart = (e) => {
    setTouchY(e?.touches?.[0].clientY);
    bottomModalRef.current.style.transition = 'none';
  };

  const handleTouchEnd = (e) => {
    const computedModalHeight = parseInt(
      getComputedStyle(bottomModalRef.current).height.replace(/[^\d.]/g, ''),
    );
    let translateY = bottomModalRef.current.style.transform.replace(
      /[^\d.]/g,
      '',
    );
    if (translateY > computedModalHeight * 0.35) {
      bottomModalRef.current.style.transition =
        'all 0.3s cubic-bezier(0.67, 0.19, 0.61, 0.83)';
      bottomModalRef.current.style.transform = `translateY(${computedModalHeight}px`;
      setTimeout(() => removeLastModal(), 300);
    } else {
      bottomModalRef.current.style.transition =
        'all 0.26s cubic-bezier(0.54, 0.1, 0.48, 0.9)';
      bottomModalRef.current.style.transform = 'translateY(0px)';
      setTouchY(undefined);
    }
  };

  return (
    <motion.div
      layout
      layoutId="bottomModal"
      className={`bg-grey-50 w-full !fixed inset-x-0 overflow-y-auto overflow-x-hidden rounded-t-[20px] ${className} ${
        shouldShowMobileMode ? 'mx-auto' : ''
      } relative`}
      initial={{ y: '100%', opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: '110%', opacity: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      ref={bottomModalRef}
      style={{
        direction: 'rtl',
        height: height ? height : '100%',
        minHeight: minHeight ? minHeight : 'fit-content',
        bottom: 0,
        maxWidth: shouldShowMobileMode ? mobileModeWidth - 16 : 'auto',
        ...style,
      }}
    >
      <SectionTitle
        title={title}
        actionButton={
          hasCloseButton ? (
            <div onClick={removeLastModal}>
              <CloseSquareIconOutline
                height={32}
                width={32}
                stroke={colors?.black}
                fill={colors.grey[100]}
              />
            </div>
          ) : null
        }
        rightActionButton={rightActionButton}
        style={{ direction: 'rtl' }}
        className={`cursor-pointer select-none border-b px-4 py-2.5 border-grey-200 ${titleClassName}`}
      />
      {isDraggable && (
        <>
          <span className="w-10 h-1 bg-grey-400 rounded-full absolute top-3 right-1/2 translate-x-1/2 translate-y-1/2 cursor-pointer"></span>
          <span
            className="absolute top-0 right-1/2 translate-x-1/2 cursor-pointer z-10 select-none"
            style={{ width: touchAreaWidth, height: touchAreaHeight }}
            onTouchMove={(e) => handleTouchMove(e)}
            onTouchStart={(e) => handleTouchStart(e)}
            onTouchEnd={(e) => handleTouchEnd(e)}
          ></span>
        </>
      )}
      <div className="px-4">{children}</div>
    </motion.div>
  );
};
