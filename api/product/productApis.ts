import request from '@api/request';

export const getProducts = async () =>
  await request.get('/Product/management/CategoryProducts', null, {
    params: {
      categoryName: "شیاف استامینوفن",
      pageNumber: 1,
      pageSize: 5
    }
  });
