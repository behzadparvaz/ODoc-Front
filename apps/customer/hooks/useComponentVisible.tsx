import { useState, useRef, useEffect } from 'react';

export const useComponentVisible = (initialIsVisible, actionButtonRef = undefined) => {
  const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible);
  const targetComponentRef = useRef(null);

  const handleClickOutside = (event) => {
    if (
      targetComponentRef?.current &&
      !targetComponentRef?.current?.contains(event.target) &&
      !actionButtonRef?.current?.contains(event.target)
    ) {
      setIsComponentVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  return { targetComponentRef, isComponentVisible, setIsComponentVisible };
};
