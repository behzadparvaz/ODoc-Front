import request from "@api/request";

export const CreateOrderInsurance = async (body) => await request.post(`/order/CreateOrderInsurance`, body,{orderRegister:true});
export const GetOrdersHistory = async () => await request.get(`/order/GetOrdersHistory`);