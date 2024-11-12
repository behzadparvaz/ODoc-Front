type ProductInBasket = {
  irc: string;
  gtin: string;
  name?: string;
  persianName?: string;
  productName?: string;
  price: number;
  imageLink?: string;
  discount: number;
  tax: number;
  quantity: number;
  createDateTime: null;
  modifiedDateTime: null;
  createBy: null;
  modifiedBy: null;
  categoryCodeLevel2: string;
  categoryNameLevel2: string;
  brandName: string;
  categoryCodeLevel3: string;
  categoryCode: string;
  isOtc: boolean;
  unit: string
  slangs?: string[]
  imagelink?: string
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
