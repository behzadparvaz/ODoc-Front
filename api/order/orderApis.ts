import request from '@api/request';

export const CreateOrderInsurance = async (body) =>
  await request.post(`/order/CreateOrderInsurance`, body, {
    returnError: true,
  });

export const GetOrdersHistory = async (statusId: number) =>
  await request.get(`/order/GetOrdersHistory`, null, { params: { statusId } });

export const GetOrderStatuses = async () =>
  await request.get(`/order/GetOrderStatues`);

export const FinishOrderPayment = async (body) =>
  await request.post(`Order/PaymentOrder`, body, { returnError: true });

export const VerifyPaymentOrder = async (body) =>
  await request.post(`Order/VerifyPaymentOrder`, body, { returnError: true });

export const CancelOrder = async (body) =>
  await request.post(`Order/CancelOrder`, body, { returnError: true });

export const getInsurances = async () =>
  await request.get(`Order/GetInsurances`);

export const GetOrderState = async (orderCode) =>
  await request.get(`/Order/${orderCode}/CurrentState`);

export const getSupplementaryInsurances = async () =>
  await request.get(`Order/GetSupplementaryInsurances`);
