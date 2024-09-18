import request from '@api/request';

export const getTenderItems = async (orderCode: string) => {
  return await request.get(`/Order/OrderTenders?orderCode=${orderCode}`);
};
