import request from '@api/request';

export const GetSearchSuggestion = async (searchText:string) =>
  await request.get(`/Product/management/SearchProducts?search=${searchText}`);
