import { useQuery } from 'react-query';
import { parsiMapReverseLocation } from './mapApis';
import { MapQueryKeys } from '@utilities/queryKeys';

export const useGetParsiMapLocation = (location: string, isEnabled=true) => {
  const { data, isLoading, refetch } = useQuery(
    [MapQueryKeys.ParsiLocation, location],
    () => parsiMapReverseLocation({ location }),
    {
      cacheTime: 2000,
      enabled: isEnabled,
    }
  );
  return { data, isLoading, refetch };
};
