import { useQuery } from 'react-query';
import { GetVendorDatails, GetVendors } from './vendor';

export const useGetVendors = () => {
  const { data, isLoading } = useQuery(['GetVendors'], () => GetVendors());

  return { data, isLoading };
};

export const useGetVendorDetails = (vendorCode: string) => {
  const { data, isLoading } = useQuery(['GetVendorDatails', vendorCode], () =>
    GetVendorDatails(vendorCode),
  );

  return { data, isLoading };
};
