import request from '@api/request';

export const GetMainCategories = async () =>
  await request.get(`/Product/management/GetCategoryLevel1`);
