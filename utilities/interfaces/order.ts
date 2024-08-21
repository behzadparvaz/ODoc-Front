export interface OrderStatuses {
  name: string;
  id: number;
}

export type OrderDetailsItemDataModel = {
  id: number;
  image: string;
  drugName?: string;
  companyName: string;
  quantity: string;
  price: number;
  quantityType: string;
  total: number;
  companyCountry: string | string[];
  unavaiable: boolean;
  sugesstedItems?: OrderDetailsItemDataModel[];
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
