import { useQuery } from "react-query";
import { GetVendors } from "./vendor";

export const useGetVendors = () => {

  const { data, isLoading } = useQuery(
    ['GetVendors'],
    () => GetVendors(),
  );

  return { data, isLoading };
};
