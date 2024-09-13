import request from '@api/request';

export const getTenderItems = async (orderCode: string) => {
  if (!orderCode) {
    return;
  } else {
    return await request.get(`/Order/OrderTenders?orderCode=${orderCode}`);
  }
};
