import request from '@api/request';

export const getTenderItems = async (orderCode: string) => {
  return await request.get(`/Order/OrderTenders?orderCode=${orderCode}`);
};

export const getTenderPrepartionTime = async (lat: number, lng: number) => {
  return await request.get(`Tender/PrepartionTime/${lat}/${lng}`);
};