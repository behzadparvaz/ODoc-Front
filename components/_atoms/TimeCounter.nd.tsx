import useTimer from '@hooks/useTimer';
import { Fragment } from 'react';

interface counter {
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
}
interface Props {
  counter: counter;
  className?: string;
}
const TimeCounter = ({ counter, className = '' }: Props) => {
  const { d, h, m, s } = useTimer({
    d: counter.days,
    h: counter.hours,
    m: counter.minutes,
    s: counter.seconds,
  });
  const timerArray = [d, h, m, s];
  return (
    <div className={`flex flex-row-reverse items-center text-xs text-grey-800 font-bold ${className}`}>
      {timerArray?.map((timerItem: number, index) => (
        <Fragment key={`timer-${timerItem}-${index}`}>
          {index !== 0 || !!timerItem ? (
            <span className="w-[15px] h-4 flex items-center justify-center">
              {timerItem !== undefined && !Number.isNaN(timerItem)
                ? timerItem >= 10 || index === 0
                  ? timerItem
                  : '0' + timerItem
                : ''}
            </span>
          ) : null}
          {index === timerArray?.length - 1 ? null : index === 0 && !timerItem ? null : (
            <span className="h-4 duration-1000 ease-linear animate-pulse mx-1.5">:</span>
          )}
        </Fragment>
      ))}
    </div>
  );
};

export default TimeCounter;
