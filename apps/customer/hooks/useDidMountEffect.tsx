import { useEffect, useRef } from 'react';

export default function useDidMountEffect(func, deps) {
  const didMountEffect = (func, deps) => {
    const didMount = useRef(false);
    useEffect(() => {
      if (didMount.current) {
        func();
      } else {
        didMount.current = true;
      }
    }, deps);
  };

  return didMountEffect(() => {
    func();
  }, deps);
}
