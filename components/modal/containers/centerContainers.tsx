import { motion } from 'framer-motion';
import { useModalCenterStyles } from './modalStyles';
import useModal from '@hooks/useModal';
import { colors } from '@configs/Theme';
import { CloseIconOutline } from '@com/icons';

interface Props {
  width: number | string;
  height: number | string;
  minHeight?: number | string;
  padding?: number | string;
  className?: string;
  style?: React.CSSProperties;
  hasCloseButton?: boolean;
}
export const ModalContainer: React.FC<Props> = ({
  children,
  width,
  height,
  minHeight,
  padding,
  className,
  style,
  hasCloseButton = false,
}) => {
  const classes = useModalCenterStyles({ width, height, minHeight, padding });
  const { removeLastModal } = useModal();
  return (
    <motion.div
      className={[classes.centerModalContainer, className || ''].join(' ')}
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ duration: 0.5, ease: 'backOut' }}
      style={style}
    >
      {hasCloseButton && (
        <span
          className="!absolute top-3 left-3 md:top-4 md:left-6 z-10 !bg-white hover:!bg-white !p-0 cursor-pointer"
          onClick={removeLastModal}
        >
          <span className="flex justify-center items-center" style={{ width: 42, height: 42 }}>
            <CloseIconOutline width={24} height={24} fill={colors.grey[800]} />
          </span>
        </span>
      )}
      {children}
    </motion.div>
  );
};
