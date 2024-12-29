import request from '@api/request';

type CodeFirst = { type: 'IRC'; irc: string };
type CodeSecond = { type: 'GTIN'; gtin: string };

export type ItemCode = {
  type: 'IRC' | 'GTIN' | 'RX';
  refrenceNumber?: string;
  irc?: string;
  gtin?: string;
};

export type OneOfCodes = CodeFirst | CodeSecond;

export const getCurrentBasket = async () =>
  await request.get('/Baskets/GetBasket');

export const deleteCurrentBasket = async () =>
  await request.delete('/Baskets/DeleteBasket');

export const deleteProductBasket = async (payload: ItemCode) => {
  const renderPayload = () => {
    switch (payload?.type) {
      case 'IRC':
        return { irc: payload?.irc };
      case 'GTIN':
        return { gtin: payload?.gtin };
      case 'RX':
        return { refrenceNumber: payload?.refrenceNumber };
    }
  };
  return await request.delete('/Baskets/DeleteProduct', null, {
    data: renderPayload(),
  });
};

export type UpdateCountProductBasketPayload = OneOfCodes & {
  productName: string;
  quantity: null;
};

export const updateCountProductBasket = async ({
  productName,
  quantity,
  ...payload
}: UpdateCountProductBasketPayload) =>
  await request.patch('/Baskets/EditProduct', {
    ...(payload.type === 'IRC' ? { irc: payload.irc } : { gtin: payload.gtin }),
    productName,
    quantity,
  });

export type Rxbasket = {
  refrenceNumber: string;
  nationalCode: string;
  phoneNumber: string;
  insuranceTypeId?: number;
  supplementaryInsuranceType?: number | null;
  isSpecialPatient?: boolean;
  vendorCode: string;
  orderType: string;
};

export type ProductBasket = {
  irc?: string;
  quantity: number;
  imageLink?: string;
  productName: string;
  unit?: string;
};

export type ProductsListBasket = {
  nationalCode: string;
  items: ProductBasket[];
};
export type BasketPayload = Rxbasket | ProductBasket | ProductBasket[];

export const addProductToBasket = async (payload: BasketPayload) => {
  await request.post('/Baskets/AddToCart', payload);
};
export const addListToBasket = async (payload: ProductsListBasket) => {
  await request.post('/Baskets/AddListToCart', payload);
};
