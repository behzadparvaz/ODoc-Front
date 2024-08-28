import request from '@api/request';

export const GetSearchResult = async (body) =>
  await request.post(`/Product/management/SearchProducts`, body);

export const GetSearchProducts = async (body) =>
  await request.post(`Product/management/CategoryProducts`, body);

export const GetCategoryProducts = async (body) =>
  await request.post(`Product/management/FetchCategories`, body);
