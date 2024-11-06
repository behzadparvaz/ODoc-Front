import request from '@api/request';

export const GetSupplementCategoryLevel2 = async () =>
  await request.get(`Supplement/Management/GetSupplementCategoryLevel2`);
