import request from '@api/request';

export const GetSearchResult = async (body) =>
  await request.post(`/Product/management/SearchProducts`, body);

export const GetCategoryProducts = async (body) => {
  const res = await request.get(
    `Product/management/FetchCategories?category=${encodeURIComponent(body?.category)}&pageNumber=${body?.pageNumber}&pageSize=${body?.pageSize}`,
    body,
  );
  return res;
};

export const GetSearchProducts = async (body) =>
  await request.get(
    `Product/management/SearchProducts?productName=${encodeURIComponent(body?.productName)}&pageNumber=${body?.pageNumber}&pageSize=${body?.pageSize}`,
    body,
  );
