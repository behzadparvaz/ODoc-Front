import { useQuery } from '@tanstack/react-query';
import { GetSupplementProductById, GetSupplementReviews, GetSupplementReviewSummery } from './plp';

export const useGetSupplementProductById = (productId: string) => {
    const { data, isLoading, isSuccess } = useQuery({
        queryKey: ['getSupplementProductById', productId],
        queryFn: () => GetSupplementProductById(productId),
        enabled: !!productId,
    });
    return { data: data as any, isLoading, isSuccess };
};

export const useGetSupplementReviewSummery = (productId: string) => {
    const { data, isLoading, isSuccess } = useQuery({
        queryKey: ['getSupplementReviewSummery', productId],
        queryFn: () => GetSupplementReviewSummery(productId),
        enabled: !!productId,
    });
    return { data: data as any, isLoading, isSuccess };
};
export const useGetSupplementReview = (productId: string) => {
    const { data, isLoading, isSuccess } = useQuery({
        queryKey: ['getSupplementReview', productId],
        queryFn: () => GetSupplementReviews(productId),
        enabled: !!productId,
    });
    return { data: data as any, isLoading, isSuccess };
};