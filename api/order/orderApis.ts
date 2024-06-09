import request from "@api/request";

export const oDocUrl = 'https://sap.okcs.com/td/'

export const CreateOrderInsurance = async (body) => await request.post(`${oDocUrl}order/CreateOrderInsurance`, body);
export const GetOrdersHistory = async () => await request.get(`${oDocUrl}order/GetOrdersHistory`);