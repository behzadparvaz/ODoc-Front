import classNames from 'classnames';
import React, { useState, useEffect, useRef, memo } from 'react';

interface CountDownTimerProps {
  resendAction: () => void;
}

const CountDownTimer: React.FC<CountDownTimerProps> = ({ resendAction }) => {
  const [timeLeft, setTimeLeft] = useState(120);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timeLeft <= 0) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `دریافت مجدد کد : ${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const resetTime = () => {
    if (timeLeft > 0) return;
    setTimeLeft(120);
    resendAction();
  };

  return (
    <div className="mt-4 mb-4 text-center flex justify-center w-fit mx-auto">
      <span
        className={classNames(
          'select-none cursor-pointer py-2 font-medium px-4 rounded-full text-xs',
          timeLeft <= 0 && 'bg-grey-100',
        )}
        onClick={resetTime}
      >
        {timeLeft > 0 ? formatTime(timeLeft) : 'ارسال مجدد کد'}
      </span>
    </div>
  );
};

export default memo(CountDownTimer);
