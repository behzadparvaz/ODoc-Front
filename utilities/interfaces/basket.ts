type ProductInBasket =  {
  irc: string,
  gtin: string,
  name: string,
  price: number,
  image?: string,
  discount: number,
  tax: number,
  quantity: number,
  createDateTime: null,
  modifiedDateTime: null,
  createBy: null,
  modifiedBy: null
}

interface Basket {
  id: string,
  refrenceCode: string,
  nationalCode: null,
  phoneNumber: string,
  totalPrice: number,
  products: ProductInBasket[],
  createDateTime: null,
  modifiedDateTime: null,
  createBy: null,
  modifiedBy: null
}
