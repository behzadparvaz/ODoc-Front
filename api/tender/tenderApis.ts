import request from '@api/request';

export const getTenderItems = async (orderCode: string) => {
  return await request.get(`/Order/OrderTenders?orderCode=${orderCode}`);
};


export const getTenderPrepartionTime = async (body: any): Promise<any> => {
  return await request.get(`Tender/PrepartionTime/${body.lat}/${body.lng}`);
};