import request from '@api/request';

export const GetBanners = async () =>
  await request.get(`/Promotion/GetBanners`);

export const GetCarousels = async () =>
  await request.get(`/Promotion/GetCarousels`);
