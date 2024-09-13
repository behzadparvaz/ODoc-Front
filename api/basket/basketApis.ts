import request from '@api/request';

type CodeFirst = { type: 'IRC'; irc: string; }
type CodeSecond = { type: 'GTIN'; gtin: string; }
export type OneOfCodes = CodeFirst | CodeSecond

export const getCurrentBasket = async () =>
  await request.get('/Baskets/GetBasket');


export const deleteCurrentBasket = async () =>
  await request.delete('/Baskets/DeleteBasket');


export const deleteProductBasket = async (payload: OneOfCodes) =>
  await request.delete('/Baskets/DeleteProduct', null, { data: payload.type === 'IRC' ? { irc: payload.irc } : { gtin: payload.gtin} });


export type UpdateCountProductBasketPayload = (OneOfCodes) & { productName: string; quantity: null }

export const updateCountProductBasket = async ({ productName, quantity, ...payload }: UpdateCountProductBasketPayload) =>
  await request.patch('/Baskets/EditProduct', {
    ...(payload.type === 'IRC' ? { irc: payload.irc } : { gtin: payload.gtin }),
    productName,
    quantity
  });


export type AddProductToBasketPayload = (
  OneOfCodes & { quantity: number; orderType: 'OTC' }
  ) | ({
    orderType: 'RX';
    refrenceNumber: string;
    nationalCode: string;
    insuranceType: number;
    supplementaryInsuranceType: number
    isSpecialPatient: boolean
  })

export const addProductToBasket = async (payload: AddProductToBasketPayload) =>
  await request.post('/Product/management/AddToCart', payload.orderType === 'RX' ? {
    refrenceNumber: String(payload.refrenceNumber),
    nationalCode: payload.nationalCode,
    insuranceType: payload.insuranceType,
    supplementaryInsuranceType: payload.supplementaryInsuranceType,
    isSpecialPatient: payload.isSpecialPatient
  } : {
    ...(payload.type === 'IRC' ? { irc: String(payload.irc) } : { gtin: String(payload.gtin) }),
    quantity: payload.quantity
  });


