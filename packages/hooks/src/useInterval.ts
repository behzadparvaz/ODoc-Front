import { useEffect, useRef } from 'react';

export const useInterval = (callback: () => void, interval: number) => {
  const savedCallback = useRef<typeof callback>();
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      savedCallback.current?.();
    }, interval);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [interval]);

  return intervalRef;
};
