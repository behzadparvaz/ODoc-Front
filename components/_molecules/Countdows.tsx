import { useState, useEffect } from 'react';

interface CountdownProps {
  expirationTime: number | null;
  onFinishTimer?: () => void;
}

const Countdown = ({ expirationTime, onFinishTimer }: CountdownProps) => {
  const [remainingTime, setRemainingTime] = useState<number | null>(null);

  useEffect(() => {
    if (expirationTime) {
      const intervalId = setInterval(() => {
        const currentTime = new Date().getTime();
        const timeDifference = expirationTime - currentTime;

        if (timeDifference <= 0) {
          // If the remaining time is less than or equal to 0, stop the interval
          clearInterval(intervalId);
          setRemainingTime(0);
          if (onFinishTimer) {
            onFinishTimer();
          }
        } else {
          // Calculate remaining minutes and seconds
          const minutes = Math.floor(
            (timeDifference % (1000 * 60 * 60)) / (1000 * 60),
          );
          const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

          // Update the state with the remaining time
          setRemainingTime(minutes * 60 + seconds);
        }
      }, 1000);

      // Cleanup function to clear the interval when the component unmounts
      return () => {
        setRemainingTime(null);
        clearInterval(intervalId);
      };
    }
  }, [expirationTime]);

  // If remainingTime is null, return null explicitly
  if (remainingTime === null) return null;

  return (
    <>
      {remainingTime > 0 ? (
        <span className="w-max h-[24px] px-4 bg-surface-accentLight rounded-full text-xs text-content-accent flex items-center justify-center">
          {Math.floor(remainingTime / 60)}:
          {(remainingTime % 60).toString().padStart(2, '0')}
        </span>
      ) : (
        <span className="w-max h-[24px] px-4 bg-surface-nagativeLight rounded-full text-xs text-content-nagative flex items-center justify-center">
          زمان به پایان رسید
        </span>
      )}
    </>
  );
};

export default Countdown;
