import request from '@api/request';

export const CreateOrderInsurance = async (body) =>
  await request.post(`/order/CreateOrderInsurance`, body, {
    returnError: true,
  });

export const GetOrdersHistory = async () =>
  await request.get(`/order/GetOrdersHistory`);

export const FinishOrderPayment = async (body) =>
  await request.post(`Order/FinishPayment`, body);

export const getInsurances = async () =>
  await request.get(`Order/GetInsurances`, {});
