import { OrderDetailsItemDataModel } from './order';

export type TenderDrugStoreDataModel = {
  id: number;
  name: string;
  type: string;
};

export type TenderShipmentDataModel = {
  type: string;
  cost: number;
};

export type TenderDescriptionDataModel = {
  customerNotes?: string;
  drugStoreNotes?: string;
  drugStoreVoice?: string;
};

export type TenderDetailDataModel = {
  drugStore: TenderDrugStoreDataModel;
  shipment: TenderShipmentDataModel;
  items: OrderDetailsItemDataModel[];
  picSearchItems: OrderDetailsItemDataModel[];
  totalAmount?: number;
  packing?: number;
  description?: TenderDescriptionDataModel;
};
