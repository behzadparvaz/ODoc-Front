import { useState, useEffect } from 'react';

function useAuthTimer() {
  const [timer, setTimer] = useState({
    min: 0,
    sec: 10,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const { sec, min } = timer;

      if (sec > 0) {
        setTimer((prev) => ({
          ...prev,
          sec: sec - 1,
        }));
      }

      if (sec === 0) {
        if (min === 0) {
          clearInterval(interval);
        } else {
          setTimer(() => ({
            min: min - 1,
            sec: 59,
          }));
        }
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [timer]);
  // ------------------- end Timer

  return { timer, setTimer };
}

export default useAuthTimer;
