import { useMutation, UseMutationOptions, UseMutationResult, useQuery } from '@tanstack/react-query';
import { GetSupplementProductByIrc, GetSupplementReviews, GetSupplementReviewSummery, PostSupplementReviews } from './plp';

export const useGetSupplementProductByIrc = (irc: string) => {
    const { data, isLoading, isSuccess } = useQuery({
        queryKey: ['getSupplementProductByIrc', irc],
        queryFn: () => GetSupplementProductByIrc(irc),
        enabled: !!irc,
    });
    return { data: data as any, isLoading, isSuccess };
};

export const useGetSupplementReviewSummery = (irc: string) => {
    const { data, isLoading, isSuccess } = useQuery({
        queryKey: ['getSupplementReviewSummery', irc],
        queryFn: () => GetSupplementReviewSummery(irc),
        enabled: !!irc,
    });
    return { data: data as any, isLoading, isSuccess };
};
export const useGetSupplementReview = (irc: string) => {
    const { data, isLoading, isSuccess, refetch } = useQuery({
        queryKey: ['getSupplementReview', irc],
        queryFn: () => GetSupplementReviews(irc),
        enabled: !!irc,
    });
    return { data: data as any, isLoading, isSuccess, refetch };
};

interface IPayloadAddSupplementReview {
    irc: string | number,
    comment: string
    rating: number
}
export const usePostSupplementReview: (
    options?: UseMutationOptions<unknown, unknown, IPayloadAddSupplementReview>,
) => UseMutationResult<unknown, unknown, IPayloadAddSupplementReview> = (
    options,
) =>
        useMutation({
            mutationFn: (variables) => PostSupplementReviews(variables),
            ...options,
        });