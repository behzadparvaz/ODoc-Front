import request from "@api/request";

export const GetSupplementProductById = async (productId: string) =>
    await request.get(`Supplement/GetById/${productId}`);

export const GetSupplementReviewSummery = async (productId: string) =>
    await request.get(`Supplement/GetReviewSummary/${productId}`);

export const GetSupplementReviews = async (productId: string) =>
    await request.get(`Supplement/GetReviews/${productId}`);