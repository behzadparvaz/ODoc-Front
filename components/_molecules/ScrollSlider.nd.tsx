import { useHorizontalScrollForDesktop } from '@hooks/useDragingScrollSlider';
import { CSSProperties, useEffect } from 'react';
type Props = {
  children: any;
  className?: string;
  style?: CSSProperties;
  scrollToX?: number;
};

function ScrollSlider({ children, style, scrollToX, className = '' }: Props) {
  const { targetComponentRef } = useHorizontalScrollForDesktop();
  useEffect(() => {
    if (scrollToX && scrollToX < 0) {
      const targetComponent = targetComponentRef?.current;
      targetComponent?.scrollTo(scrollToX, 0);
    }
  }, [scrollToX]);
  return (
    <div
      ref={targetComponentRef}
      style={style}
      className={`${className} overflow-x-auto hidden-scroll-bar flex w-full [&_div]:flex-none`}
    >
      {children}
    </div>
  );
}

export default ScrollSlider;
