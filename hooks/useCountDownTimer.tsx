import { useEffect, useState } from 'react';

interface TimerProps {
  hours: number;
  minutes: number;
  seconds: number;
}
export function useCountDownTimer({ hours, minutes, seconds }: TimerProps) {
  const [timer, setTimer] = useState<TimerProps>({
    hours,
    minutes,
    seconds,
  });
  const [ended, setEnded] = useState<boolean>(false);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (timer.seconds > 0) {
        setTimer({
          ...timer,
          seconds: timer.seconds - 1,
        });
      } else {
        if (timer.minutes > 0) {
          setTimer({
            ...timer,
            minutes: timer.minutes - 1,
            seconds: 59,
          });
        } else {
          if (timer.hours > 0) {
            setTimer({
              ...timer,
              hours: timer.hours - 1,
              minutes: 59,
            });
          } else {
            return;
          }
        }
      }
    }, 1000);

    if (timer.hours === 0 && timer.minutes === 0 && timer.seconds === 0) {
      setEnded(true);
      clearInterval(timerInterval);
      return;
    }

    return () => {
      clearInterval(timerInterval);
    };
  }, [timer]);

  return { timer, ended };
}
