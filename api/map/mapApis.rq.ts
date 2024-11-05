import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';
import {
  parsiMapReverseLocation,
  parsiMapSearchAddress,
  ParsiResponseApi,
} from './mapApis';
import { MapQueryKeys } from '@utilities/queryKeys';

export const useGetParsiMapLocation = (location: string, isEnabled = true) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: [MapQueryKeys.ParsiLocation, location],
    queryFn: () => parsiMapReverseLocation({ location }),

    gcTime: 2000,
    enabled: isEnabled,
  });
  return { data, isLoading, refetch };
};

export const useGetParsiSearchAddress = (
  search: string,
  options?: UseQueryOptions<unknown, Error, ParsiResponseApi>,
): UseQueryResult<ParsiResponseApi, Error> => {
  return useQuery({
    queryKey: [MapQueryKeys.ParsiLocation, search],
    queryFn: () =>
      parsiMapSearchAddress({ search_text: search, district: 10511133 }),
    gcTime: 2000,
    enabled: !!search && search.trim() !== '',
    ...options,
  });
};
