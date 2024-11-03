import { useQuery } from '@tanstack/react-query';
import { GetVendorDatails, GetVendors } from './vendor';

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
  });

  return { data, isLoading };
};
