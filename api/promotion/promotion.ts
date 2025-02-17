import request from '@api/request';
import { builder } from '@utilities/queryBuilder';

export const GetBanners = async () =>
  await request.get(`/Promotion/GetBanners`);

export const GetCarousels = async () =>
  await request.get(`/Promotion/GetCarousels`);

export const GetCarouselById = async (body: any) => {
  const params = builder(body);
  return await request.get(`/Promotion/GetProductCarousel${params}`, body);
};
