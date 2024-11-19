export interface OrderStatuses {
  name: string;
  id: number;
}

export type OrderCompanyCountryDataModel = {
  id: number | string;
  name: string;
  price?: number;
};

export type OrderDetailsItemDataModel = {
  id: number;
  image: string;
  drugName?: string;
  companyName: string;
  quantity: string;
  price: number;
  quantityType: string;
  total: number;
  companyCountry: OrderCompanyCountryDataModel[];
  unavaiable: boolean;
  sugesstedItem?: OrderDetailsItemDataModel;
};

export type OrderDetailsDataModel = {
  address?: string;
  pharmacyName?: string;
  orderStatus?: string;
  remaingTime?: string;
  orderCreatedAt?: string;
  items?: OrderDetailsItemDataModel[];
  picSearchItems: OrderDetailsItemDataModel[];
  bikerDetails?: {
    bikerName?: string;
    bikerImage?: string;
    bikerPhone?: number;
    bikePlateNumber?: string;
    deliveryCode?: number;
  };
};
export type ProductInDraft =
  | {
      irc: string;
      productName: string;
      quantity: number;
      description: string;
    }
  | {
      referenceNumber: string;
      productType: number;
    };

export interface CreateOrderDraftPayload {
  referenceNumber: string;
  insuranceTypeId: number;
  supplementaryInsuranceTypeId: number;
  comment: string;
  nationalCode: string;
  latitude: number;
  longitude: number;
  customerName: string;
  valueAddress: string;
  titleAddress: string;
  houseNumber: string;
  homeUnit: number;
  deliveryDate: string;
  fromDeliveryTime: string;
  toDeliveryTime: string;
  items: ProductInDraft[];
  isSpecialPatient: boolean;
  vendorCode: string;
}
