import request from '@api/request';

export const GetDrugTypes = async () =>
  await request.get('/Orderline/DrugTypes');
