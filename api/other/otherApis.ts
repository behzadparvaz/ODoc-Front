import request from '@api/request';

export const GetDrugTypes = async () =>
  await request.get('http://5.34.204.173:9095/Orderline/DrugTypes');
