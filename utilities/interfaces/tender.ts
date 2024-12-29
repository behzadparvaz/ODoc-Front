export type TenderOrderAltDataModel = {
  brandName: string;
  createBy: string | null;
  createDateTime: string | null;
  irc: string;
  modifiedBy: string | null;
  modifiedDateTime: string | null;
  price: number;
  productName: string;
  quantity: number;
  imageLink: string;
  unit?: string;
  description?: string;
  type: { name: string; id: number };
};
export type TenderOrderdisCountDataModel = {
  amount: number;
  createBy: string | null;
  createDateTime: string | null;
  modifiedBy: string | null;
  modifiedDateTime: string | null;
  percentage: number;
};

export type TenderItemsOrderDataModel = {
  alternatives: TenderOrderAltDataModel[];
  createBy: string | null;
  createDateTime: string | null;
  description: string;
  discount: TenderOrderdisCountDataModel;
  erx: string | null;
  gtin: string;
  imageLink: string;
  irc: string;
  modifiedBy: string | null;
  modifiedDateTime: string | null;
  price: number;
  productName: string;
  quantity: number;
  status: { name: string; id: number };
  tax: number;
  unit: string;
  referenceNumber?: string;
  type: { name: string; id: number };
};

export type TenderCustomerAddressDataModel = {
  createBy: string | null;
  createDateTime: string | null;
  homeUnit: number;
  houseNumber: string | null;
  latitude: number;
  longitude: number;
  modifiedBy: string | null;
  modifiedDateTime: string | null;
  titleAddress: string | null;
  valueAddress: string | null;
};
export type TenderItemsCustomerDataModel = {
  addresses: TenderCustomerAddressDataModel[];
  createBy: string | null;
  createDateTime: string | null;
  modifiedBy: string | null;
  modifiedDateTime: string | null;
  name: string;
  nationalCode: string;
  phoneNumber: string;
};

export type TenderItemsDeliveryDataModel = {
  createBy: string | null;
  createDateTime: string | null;
  deliveryPrice: number;
  deliveryTime: string;
  modifiedBy: string | null;
  modifiedDateTime: string | null;
};

export type TenderItemsDescriptionDataModel = {
  comment: string;
  link: string;
};
export type TenderItemsDoctorDataModel = {
  createBy: string | null;
  createDateTime: string | null;
  jobtitle: string;
  modifiedBy: string | null;
  modifiedDateTime: string | null;
  name: string;
  phoneNumber: string;
};

export type TenderItemsListDataModel = {
  cash: number;
  comment: string;
  createBy: string | null;
  createDateTime: string;
  createDateTimeOrder: string;
  customer: TenderItemsCustomerDataModel;
  declineType: { name: string; id: number };
  delivery: TenderItemsDeliveryDataModel;
  delta: number;
  description: TenderItemsDescriptionDataModel | null;
  discount: string | null;
  discountType: { name: string; id: number };
  doctor: TenderItemsDoctorDataModel;
  finalPrice: number;
  fromDeliveryTime: string;
  id: string;
  insuranceType: { name: string; id: number };
  isSpecialPatient: false;
  modifiedBy: string | null;
  modifiedDateTime: string | null;
  online: number;
  orderCode: string;
  orderDetails: TenderItemsOrderDataModel[];
  orderStatus: { name: string; id: number };
  orderType: { name: string; id: number };
  packingPrice: number;
  paymentType: { name: string; id: number };
  prepartionTime: string;
  referenceNumber: string;
  supplementaryInsuranceType: { name: string; id: number };
  taxCoefficient: number;
  taxPrice: number;
  toDeliveryTime: string;
  totalPrice: number;
  vat: number;
  vendorCode: string;
  vendors: [];
};
