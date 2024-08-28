import request from '@api/request';

export const GetSearchSuggestion = async (body) =>
  await request.post(`/Product/management/SearchProducts`, body);
