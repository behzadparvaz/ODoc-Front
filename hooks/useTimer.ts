import { useEffect, useMemo, useRef, useState } from 'react';

function useTimer(target) {
  const firstNow = useRef(new Date().getTime());
  const _target = useRef(0);
  console.log(_target,'msd66');
  
  const [time, setTime] = useState<any>(calculateTimeLeft(_target.current));
  const [finished, setFinished] = useState(false);
  const [restarted, setRestarted] = useState(null);

  const calculateTargetDate = () => {
    let resTatget;
    if (target.constructor === Date) {
      resTatget = target.getTime();
    } else if (target.constructor === Object) {
      const { day = 0, hour = 0, minute = 0, second = 0 } = target;
      resTatget = day * 86400 + hour * 3600 + minute * 60 + second;
      resTatget = resTatget * 1000 + firstNow.current;
    } else if (target.constructor === String) {
      const [day = 0, hour = 0, minute = 0, second = 0] = target?.split(':');
      resTatget = +day * 86400 + +hour * 3600 + +minute * 60 + +second;
      resTatget = resTatget * 1000 + firstNow.current;
    } else {
      resTatget = target * 1000 + firstNow.current;
    }
    return resTatget;
  };

  _target.current = useMemo(
    () => calculateTargetDate(),
    [
      typeof target === 'object'
        ? JSON.stringify(target)
        : typeof target === Date()
          ? target.getTime()
          : target,
      restarted,
    ],
  );

  const restart = () => {
    firstNow.current = new Date().getTime();
    setFinished(false);
    setRestarted(Math.random());
  };

  useEffect(() => {
    let timeout;
    if (!finished) {
      timeout = setTimeout(function () {
        const newTime = calculateTimeLeft(_target.current);
        console.log(newTime,);
        if (newTime) {
          setTime(newTime);
        } else {
          setFinished(true);
        }
      }, 1000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [time.day, time.hour, time.minute, time.second, finished, restarted]);

  return { ...time, finished, restart };
}

function calculateTimeLeft(target) {
  console.log(target,'msd4');
  
  let now = new Date().getTime();
  let distance = target - now;
  console.log(distance,'msd5');
  console.log(now,'msd6');
  if (distance <= 0) return false;
  let day = Math.floor(distance / (1000 * 60 * 60 * 24));
  let hour = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minute = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let second = Math.floor((distance % (1000 * 60)) / 1000);

  return { day, hour, minute, second };
}

export default useTimer;
