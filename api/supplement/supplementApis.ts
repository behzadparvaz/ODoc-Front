import request from '@api/request';
import { builder } from '@utilities/queryBuilder';

export const GetSupplementCategoryLevel2 = async (body: any) => {
  const params = builder(body);

  return await request.get(
    `Supplement/Management/GetSupplementCategoryLevel2${params}`,
    body,
  );
};

export const GetSupplementCategoryLevel3 = async (categoryCodeLevel2: string) =>
  await request.get(
    `/Supplement/Management/GetSupplementCategoryLevel3?categoryCodeLevel2=${categoryCodeLevel2}`,
  );

export const GetSupplementCategoryLevel4 = async (categoryCodeLevel3: string) =>
  await request.get(
    `/Supplement/Management/GetSupplementCategoryLevel4?categoryCodeLevel3=${categoryCodeLevel3}`,
  );

export const GetSupplementProducts = async (body) => {
  const params = builder(body);

  return await request.get(
    `Supplement/management/GetSupplementProducts${params}`,
    body,
  );
};

export const GetSupplementProductsShapes = async (body) => {
  const params = builder(body);

  return await request.get(
    `Supplement/management/GetSupplementShapes${params}`,
    body,
  );
};

export const GetSupplementProductsBrands = async (body) => {
  const params = builder(body);

  return await request.get(
    `Supplement/management/GetSupplementBrands${params}`,
    body,
  );
};
