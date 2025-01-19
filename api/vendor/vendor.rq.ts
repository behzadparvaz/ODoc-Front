import { useQuery } from '@tanstack/react-query';
import { GetVendorDatails, GetVendors, GetVendorWorkingHours } from './vendor';

export const useGetVendors = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['GetVendors'],
    queryFn: () => GetVendors(),
  });

  return { data, isLoading };
};

export const useGetVendorDetails = (vendorCode: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ['GetVendorDatails', vendorCode],
    queryFn: () => GetVendorDatails(vendorCode),
    enabled: !!vendorCode,
  });

  return { data, isLoading };
};

export const useGetVendorWorkingHours = (vendorCode: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ['GetVendorWorkingHours', vendorCode],
    queryFn: () => GetVendorWorkingHours(vendorCode),
    enabled: !!vendorCode,
  });

  return { data, isLoading };
};
