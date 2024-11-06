import request from "@api/request";

export const GetSupplementProductById = async (productId: string) =>
    await request.get(`Supplement/GetById/${productId}`);

export const GetSupplementReviewSummery = async (productId: string) =>
    await request.get(`Supplement/GetReviewSummary/${productId}`);

export const GetSupplementReviews = async (productId: string) =>
    await request.get(`Supplement/GetReviews/${productId}`);

interface IPayloadAddSupplementReview {
    productId: string | number,
    comment: string,
    rating: number
}
export const PostSupplementReviews = async (payload: IPayloadAddSupplementReview) =>
    await request.post(`Supplement/Review`, {
        productId: payload.productId,
        comment: payload.comment,
        rating: payload.rating
    });