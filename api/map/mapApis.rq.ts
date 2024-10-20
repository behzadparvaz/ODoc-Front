import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { parsiMapReverseLocation, parsiMapSearchAddress, ParsiResponseApi } from './mapApis';
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

export const useGetParsiSearchAddress
  = (search: string, options?: UseQueryOptions<unknown, unknown, ParsiResponseApi>)
  : UseQueryResult<ParsiResponseApi> => {
  return useQuery(
    [MapQueryKeys.ParsiLocation, search],
    () => parsiMapSearchAddress({ search_text: search, district: 10511133 }),
    {
      ...options,
      cacheTime: 2000,
      enabled: !!search && search.trim() !== '',
    }
  );
};
