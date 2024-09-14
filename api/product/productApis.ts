import request from '@api/request';

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

export const GetProductsShapes = async () =>
  await request.get(`/Product/management/GetShape`);

export const GetFilteredProductsByShapes = async (
  categoryCode: string,
  shapeCode: number,
) =>
  await request.get(
    `/Product/management/FilteProductByShape?categoryCodeLevel2=${categoryCode}&shapeCode=${shapeCode}`,
  );
