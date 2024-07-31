import { motion } from 'framer-motion';
import { useModalFullMobileStyles } from './modalStyles';
import { mobileModeMaxWidthClassName, shouldShowMobileMode } from '@configs/ControlMobileView';

export enum FullModalAnimations {
  slideUp = 'up',
  slideLeft = 'left',
  fade = 'fade',
  none = 'none',
}
const animations = {
  [FullModalAnimations.slideUp]: {
    initial: { y: '100%', opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: '100%', opacity: 0 },
  },
  [FullModalAnimations.slideLeft]: {
    initial: { x: '-100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '100%', opacity: 0 },
  },
  [FullModalAnimations.fade]: {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.9, opacity: 0 },
  },
  [FullModalAnimations.none]: {},
};
interface Props {
  animation?: FullModalAnimations;
  className?: string;
  style?: React.CSSProperties;
}
export const FullModalContainer: React.FC<Props> = ({
  children,
  animation = FullModalAnimations.slideLeft,
  className = '',
  style = {},
}) => {
  const classes = useModalFullMobileStyles();
  return (
    // <LazyMotion features={domAnimation}>
    //   <m.div
    <motion.div
      layout
      layoutId={animation}
      className={`${classes.container} ${className} ${
        shouldShowMobileMode ? mobileModeMaxWidthClassName + ' mx-auto' : ''
      }`}
      transition={{ duration: 0.2, ease: 'anticipate' }}
      {...animations[animation]}
      style={style}
    >
      {children}
    </motion.div>
    //   </m.div>
    // </LazyMotion>
  );
};
