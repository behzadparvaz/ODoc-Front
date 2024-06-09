import { useMutation, useQuery, useQueryClient } from "react-query";
import { CreateOrderInsurance, GetOrdersHistory } from "./orderApis";
import { useRouter } from "next/router";

export const useCreateOrderInsurance = () => {
    const { push } = useRouter()
    const queryClient = useQueryClient()

    return useMutation(CreateOrderInsurance, {
        onSuccess: () => {
            queryClient?.invalidateQueries('getOrdersHistory')
            push('/success-order')
        },
    });
};

export const useGetOrdersHistory = () => {

    const { data, isLoading } = useQuery(
        ['getOrdersHistory'],
        () => GetOrdersHistory(),
    );

    return { data, isLoading };
};