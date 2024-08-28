import request from '@api/request';

export const GetSearchResult = async (body) =>
  await request.post(`/Product/management/SearchProducts`, body);
