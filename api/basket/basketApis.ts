import request from '@api/request';

type CodeFirst = { type: 'IRC'; irc: string };
type CodeSecond = { type: 'GTIN'; gtin: string };
export type OneOfCodes = CodeFirst | CodeSecond;

export const getCurrentBasket = async () =>
  await request.get('/Baskets/GetBasket');

export const deleteCurrentBasket = async () =>
  await request.delete('/Baskets/DeleteBasket');

export const deleteProductBasket = async (payload: OneOfCodes) =>
  await request.delete('/Baskets/DeleteProduct', null, {
    data:
      payload.type === 'IRC' ? { irc: payload.irc } : { gtin: payload.gtin },
  });

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
export type BasketPayload = ProductBasket | ProductBasket[];

export const addProductToBasket = async (payload: BasketPayload) => {
  await request.post('/Baskets/AddToCart', payload);
};
export const addListToBasket = async (payload: ProductsListBasket) => {
  await request.post('/Baskets/AddListToCart', payload);
};
