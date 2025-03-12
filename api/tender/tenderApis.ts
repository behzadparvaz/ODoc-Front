import request from '@api/request';
import { builder } from '@utilities/queryBuilder';

export const getTenderItems = async (orderCode: string) => {
  return await request.get(`/Order/OrderTenders?orderCode=${orderCode}`);
};

export const getTenderPrepartionTime = async (body: any): Promise<any> => {
  const params = builder(body);

  return await request.get(`/Tender/PrepartionTime${params}`, body);
};
