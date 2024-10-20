import request from '@api/request';

export const GetVendors = (): Promise<any> =>
  request.get(`/Vendor/management/GetVendors`);

export const GetVendorDatails = (vendorCode: string): Promise<any> =>
  request.get(`/Vendor/management/GetVendor?vendorCode=${vendorCode}`);
