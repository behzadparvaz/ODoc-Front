import { useEffect, useState } from 'react';

type geoStateType = 'prompt' | 'denied' | 'granted';

export const useGeoLocation = () => {
  const [geoLocationState, setGeoLocationState] = useState<geoStateType>('prompt');
  useEffect(() => {
    navigator?.permissions?.query({ name: 'geolocation' }).then((result) => {
      switch (result.state) {
        case 'granted':
          setGeoLocationState('granted');
          break;
        case 'denied':
          setGeoLocationState('denied');
          break;
        case 'prompt':
          setGeoLocationState('prompt');
          break;
        default:
          break;
      }
    });
  }, []);

  return { geoLocationState };
};
