import request from '@api/request';
import { CreateOrderDraftPayload } from '@utilities/interfaces/order';

export const CreateOrderInsurance = async (body) =>
  await request.post(`/order/CreateOrderInsurance`, body, {
    returnError: true,
  });

export const GetOrdersHistory = async (statusId: number) =>
  await request.get(`/order/GetOrdersHistory`, null, {
    params: { statusId },
  });

export const GetOrderStatuses = async () =>
  await request.get(`/order/GetOrderStatues`);

export const FinishOrderPayment = async (body: any) =>
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

export const createOrderDraft = async (payload: CreateOrderDraftPayload) =>
  await request.post(`Order/CreateOrderDraft`, payload);

export const getOrderDetails = async (orderCode: string) => {
  return await request.get(`/Order/GetOrderDetails?OrderCode=${orderCode}`);
};

export const CreateOrderInlineStep1 = async (body) => {
  return await request.post(`/Orderline/CreateOrderInlineStep1`, body, {
    returnError: true,
  });
};

export const CreateOrderInlineStep2 = async (body) => {
  return await request.post(`/Orderline/CreateOrderInlineStep2`, body, {
    returnError: true,
  });
};

export const getOrderInfo = async (id) => {
  return await request.get(`/Orderline/OrderInfo/${id}`);
};
export const CancelQuickOrder = async (id) => {
  return await request.patch(`/Orderline/CancelOrder/${id}`, {});
};

export const getActiveOrderStatus = async () => {
  return await request.get(`/Orderline/ActiveOrderStatus`);
};

export const getDeliveryCode = async (orderCode: string) => {
  return await request.get(`/Delivery/GetDeliveryCode`, null, {
    params: {
      orderCode,
    },
  });
};

export const DeleteOrderDetail = async (id) => {
  return await request.delete(`/Orderline/DeleteOrderDetail/${id}`);
};
