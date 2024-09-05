import request from '@api/request';
import { builder } from '@utilities/queryBuilder';
import { log } from 'console';

export const GetMainCategories = async () =>
  await request.get(`/Product/management/GetCategoryLevel1`);

export const GetCategoryLevel2 = async (parentCode: string) =>
  await request.get(
    `/Product/management/GetCategoryLevel2?CategoryCodeLevel1=${parentCode}`,
  );
export const GetCategoryLevel3 = async (parentCode: string) =>
  await request.get(
    `/Product/management/GetCategoryLevel3?CategoryCodeLevel2=${parentCode}`,
  );

export const GetCategoryLevel4 = async (body: any) => {
  const params = builder(body);
  const res: any = await request.get(
    `/Product/management/GetCategoryLevel4${params}`,
  );
  if (res?.statusCode === 200) {
    return res?.value;
  } else return res;
};
