import request from "@api/request";

export const GetSupplementProductByIrc = async (irc: string) =>
    await request.get(`Supplement/GetByIrc/${irc}`);

export const GetSupplementReviewSummery = async (irc: string) =>
    await request.get(`Supplement/GetReviewSummary/${irc}`);

export const GetSupplementReviews = async (irc: string) =>
    await request.get(`Supplement/GetReviews/${irc}`);

interface IPayloadAddSupplementReview {
    irc: string | number,
    comment: string,
    rating: number
}
export const PostSupplementReviews = async (payload: IPayloadAddSupplementReview) =>
    await request.post(`Supplement/Review`, {
        irc: payload.irc,
        comment: payload.comment,
        rating: payload.rating
    });