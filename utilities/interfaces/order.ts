export interface OrderStatuses {
  name: string;
  id: number
}

export interface ProductInDraft {
  irc: string;
  gtin: string;
  productName: string;
  quantity: number;
  description: string;
}

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
  items: ProductInDraft[]
}
