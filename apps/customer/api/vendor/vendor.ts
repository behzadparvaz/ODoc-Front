import request from "@api/request";

export const GetVendors = (): Promise<any> => request.get(`/Vendor/management/GetVendors`);
