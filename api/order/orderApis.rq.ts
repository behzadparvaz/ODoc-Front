import { useMutation } from "react-query";
import { CreateOrderInsurance } from "./orderApis";
import { useRouter } from "next/router";

export const useCreateOrderInsurance = () => {
    const { push } = useRouter()
    return useMutation(CreateOrderInsurance, {
        onSuccess: () => {
            push('/success-order')
        }
    });
};