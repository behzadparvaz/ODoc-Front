import { useRef, useEffect } from 'react';
export const useHorizontalScrollForDesktop = () => {
  const targetComponentRef = useRef(null);
  useEffect(() => {
    const touchStattus: boolean = 'ontouchstart' in window;
    if (targetComponentRef && !touchStattus) {
      let isDown = false;
      let startX;
      let scrollLeft;
      const targetComponent = targetComponentRef?.current;
      const mouseDown = (e) => {
        isDown = true;
        startX = e?.pageX - targetComponent?.offsetLeft;
        scrollLeft = targetComponent?.scrollLeft;
      };
      const mouseLeave = () => {
        isDown = false;
        targetComponent?.classList?.remove('scroll-drag');
      };
      const mouseUp = () => {
        isDown = false;
        targetComponent?.classList?.remove('scroll-drag');
      };
      const mouseMove = (e) => {
        if (!isDown) return;
        const x = e?.pageX - targetComponent?.offsetLeft;
        const step = x - startX;
        targetComponent.scrollLeft = scrollLeft - step;
        targetComponent?.classList?.add('scroll-drag');
      };
      targetComponent?.addEventListener('mouseup', mouseUp);
      targetComponent?.addEventListener('mouseleave', mouseLeave);
      targetComponent?.addEventListener('mousemove', mouseMove);
      targetComponent?.addEventListener('mousedown', mouseDown);
      return function cleanup() {
        targetComponent?.removeEventListener('mouseup', mouseUp);
        targetComponent?.removeEventListener('mouseleave', mouseLeave);
        targetComponent?.removeEventListener('mousemove', mouseMove);
        targetComponent?.removeEventListener('mousedown', mouseDown);
      };
    }
  }, [targetComponentRef]);
  return { targetComponentRef };
};
