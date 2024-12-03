import request from '@api/request';
import { builder } from '@utilities/queryBuilder';

export const getProducts = async () =>
  await request.get('/Product/management/CategoryProducts', null, {
    params: {
      categoryName: 'شیاف استامینوفن',
      pageNumber: 1,
      pageSize: 5,
    },
  });

export const GetCategoryLevel2Products = async (parentCode: string) =>
  await request.get(
    `/Product/management/GetCategoryLevel3Products?categoryCodeLevel2=${parentCode}`,
  );

export const GetProductsShapes = async (categoryCodeLevel2: string) =>
  await request.get(
    `/Product/management/GetShape?categoryCodeLevel2=${categoryCodeLevel2}`,
  );

export const GetFilteredProductsByShapes = async (
  categoryCode: string,
  shapeCode: number,
) =>
  await request.get(
    `/Product/management/FilteProductByShape?categoryCodeLevel2=${categoryCode}&shapeCode=${shapeCode}`,
  );

export const GetProductsFromSearch = async ({
  brandName,
  categoryCodeLevel3,
  irc,
}: {
  brandName: string;
  categoryCodeLevel3: string;
  irc: string;
}) =>
  await request.get(`Product/management/PDPBySearch`, null, {
    params: {
      brandName,
      categoryCodeLevel3,
      irc,
    },
  });

export const GetOtcMedicineProducts = async (body: any) => {
  const params = builder(body);

  return await request.get(`/Product/management/OtcProducts${params}`, body);
};

export const GetOtcProductsShapes = async (categoryCodeLevel1: string) =>
  await request.get(
    `/Product/management/Shapes?categoryCodeLevel1=${categoryCodeLevel1}`,
  );
