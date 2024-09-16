type ProductInBasket = {
  irc: string;
  gtin: string;
  name?: string;
  persianName?: string;
  productName?: string;
  price: number;
  image?: string;
  discount: number;
  tax: number;
  quantity: number;
  createDateTime: null;
  modifiedDateTime: null;
  createBy: null;
  modifiedBy: null;
};

interface Basket {
  id: string;
  refrenceCode: string;
  nationalCode: string | null;
  phoneNumber: string;
  totalPrice: number;
  products: ProductInBasket[];
  createDateTime: string | null;
  modifiedDateTime: string | null;
  createBy: string | null;
  modifiedBy: string | null;
  insuranceType: number;
  isSpecialPatient: false;
  refrenceNumber: string | null;
  supplementaryInsuranceType: number;
  vendorCode: string;
}
