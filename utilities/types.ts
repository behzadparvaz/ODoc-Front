import React from 'react';
import { AddModalAction } from '@redux/modal/modalActions';
import modalReducer from '@redux/modal/modalReducer';
import userReducer from '@redux/user/userReducer';
import mapReducer from '@redux/map/mapReducer';
import notificationReducer from '@redux/notification/notificationReducer';
import { OpenNotificationAction } from '@redux/notification/notificationActions';

export interface responseType {
  data: any;
  errorCode: number;
  hasValidationError: boolean;
  message: string;
  success: boolean;
  errorMessage: string;
  items: any;
}

export interface responseTypeMs {
  message: string | null;
  data: any;
  errorMessage: string | null;
  errorCode?: number;
  success: boolean;
}

export type svgColorProps = {
  color?: string;
  width?: number;
  height?: number;
};

export type sliderTemplateProps = {
  data?: any;
  loading: boolean;
  type:
    | 'mainSlider'
    | 'productSlider'
    | 'productBoxSlider'
    | 'productBoxSliderWithInfiniteScroll'
    | 'scrollbarCategories'
    | 'scrollbarBlogs'
    | 'scrollbarYourStores'
    | 'scrollbarTopBrands'
    | 'deliveryTime'
    | 'mobileProductSlider'
    | 'mobileDeliveryTime';
  lazy?: boolean;
  pagination?: {};
  navigation?: boolean;
  spaceBetween?: number;
  effect?: 'slide' | 'fade' | 'cube' | 'coverflow' | 'flip';
  breakpoints?: {};
  centeredSlides?: boolean;
  slidesPerView?: number;
  store?: any;
  fromPDP?: boolean;
  title?: string;
  parentRef?: React.RefObject<any>;
};

export interface IHomeSlider extends responseType {
  data: {
    mobileHomes: any[];
  };
  errorCode: null;
}

// ----------- root reducer type ----------
export interface RootState {
  user: ReturnType<typeof userReducer>;
  modals: ReturnType<typeof modalReducer>;
  mapInfo: ReturnType<typeof mapReducer>;
  notification: ReturnType<typeof notificationReducer>;
}

export type ModalType = {
  id: number;
  modal: AddModalAction['payload']['modal'];
  props: AddModalAction['payload']['props'];
}[];

export type NotificationTypes = {
  open?: OpenNotificationAction['payload']['open'];
  message: OpenNotificationAction['payload']['message'];
  type: OpenNotificationAction['payload']['type'];
  notifType: OpenNotificationAction['payload']['notifType'];
};

export type StateAuthTypes = {
  mobile: string;
  deviceTypeCode: number;
  confirmTerms: boolean;
  code: string;
  step: number;
  hashCode?: string;
  userHasPassword?: boolean;
  checkPasswordHasError?: boolean;
  isForgotenPassword?: boolean;
};

export type ProfileParams = {
  birthDate: string;
  birthDateEpoch: number;
  customerType: number;
  emailAddress: string;
  emailVerified: boolean;
  firstName: string;
  genderCode: 0 | 1 | 2;
  genderTitle: string;
  id: number;
  lastName: string;
  lastUpdatePasswordEpoch: number;
  mobilePhone: string;
  mobileVerified: boolean;
  password: string;
  uniqueCode: string;
  userName: string;
};
export interface DataLayerObject {
  event: DataLayerEventName;
  ecommerce: EventParams;
}

export interface DataLayerMetrixObject {
  event: DataLayerMetrixEventName;
  params?: MetrixEventParams;
}

export interface DataLayerDataArtObject {
  eventKey: DataLayerEventName;
  userKey: string;
  isAnonymousUser: boolean;
  timestamp: Date;
  metadata: Record<string, unknown>;
}
export type DataLayerEventName =
  | 'SEARCH_AUTOSUGGESTED_IMPRESSION'
  | 'SEARCH_AUTO_SUGGESTED'
  | 'SEARCH_AUTOSUGGESTED_ITEM_CLICKED'
  | 'SEARCH_KEYBOARD_ENTERED'
  | 'SEARCH_EMPTY_STATE_ITEM_CLICKED'
  | 'SEARCH_EMPTY_STATE_IMPRESSION'
  | 'SEARCH_USER_HISTORY_DELETED'
  | 'SEARCH_KEYBOARD_ICON_TAPPED__ANDROID'
  | 'ADD_TO_CART'
  | 'DELETE_FROM_CART'
  | 'ZERO_RESULT_PAGE_LOADED'
  | 'PLP_PRODUCT_VIEW_TAPPED'
  | 'PRODUCT_IMPRESSION'
  | 'LOGIN_OTP_DONE'
  | 'LOGIN_OTP_REQUEST'
  | 'ACCOUNT_USER_LOGGED_OUT'
  | 'SEARCH_KEYBOARD_ENTERED'
  | 'ADDRESS_SELECTED'
  | 'STORE_SELECTED'
  | 'BASKET_SUBMISSION'
  | 'BASKET_DELETE_ITEM'
  | 'DELIVERY_TYPE_IMPRESSION__ANDROID_IOS'
  | 'PAYMENT_COUPON_SUBMISSION__ANDROID_IOS'
  | 'CHECKOUT_PURCHASE'
  | 'PURCHASE'
  | 'PURCHASE_FAILURE'
  | 'PROFILE_MY_ORDERS_PAGE_LOADED'
  | 'CANCEL_ORDER_PROCESS_START'
  | 'ORDER_DETAIL_LOADED'
  | 'ORDER_HAS_PROBLEM_PRESSED'
  | 'PROFILE_MY_MESSAGES_PAGE_LOADED'
  | 'PROFILE_CONTACT_US_PAGE_LOADED'
  | 'CONTACT_CASE_PROCESS'
  | 'REORDER_BUTTON_PRESSED'
  | 'ORDER_IMPRESSION'
  | 'SORT_BY_OPENED'
  | 'SORT_BY_SELECTED'
  | 'FILTER_OPENED'
  | 'SUB_CATEGORY_IMPRESSION'
  | 'SUB_CATEGORY_CLICKED'
  | 'FILTER_SELECTED'
  | 'USER_ID'
  | 'IS_ADDRESS_MODIFIED'
  | 'VOUCHER_SUBMITTED'
  | 'NO_DELIVERY_AVAILABILITY'
  | 'NO_DELIVERY_AVAILABILITY_AT_ALL'
  | 'DELIVERY_TIME_SELECTED'
  | 'DELIVERY_TIME_CLICK'
  | 'STORE_CARD_ITEM_CLICKED'
  | 'STORE_CARD_ITEM_IMPRESSION'
  | 'MAP_IMPRESSION'
  | 'MAP_SUBMISSION'
  | 'lead_mci';

export type DataLayerMetrixEventName = 'USER';

export interface EventParams {
  product_id?: number | null;
  product_name?: string | null;
  final_price?: number | null;
  sort_type?: string | null;
  discount_percent?: number | null;
  search_term?: string | null;
  section_name?: string | null;
  product_rank?: number | null;
  plp_page_number?: number | null;
  store_id?: number | null;
  store_ids?: string | null;
  store_type?: string | null;
  store_name?: string | null;
  search_item_type?: string | null;
  search_item_name?: string | null;
  search_item_rank?: number | null;
  mobile_number?: string | null;
  reference_type?: string | null;
  reference_id?: string | null;
  reference_name?: string | null;
  cart_item_number?: number | null;
  is_in_cart?: number | null;
  is_available?: number | null;
  number_of_results?: number | null;
  address_id?: number | null;
  number_of_active_orders?: number | null;
  number_of_closed_orders?: number | null;
  order_id?: number | null;
  active_status?: boolean | null;
  shipping_period?: string | null;
  creation_time?: string | null;
  delivery_date?: string | null;
  time_to_delivery_period_start?: string | null;
  time_to_delivery_period_end?: string | null;
  order_status?: string;
  currency?: string | null;
  value?: number | null;
  base_value?: number | null;
  total_special_offer?: number | null;
  shipping?: number | null;
  wallet_credit_used?: number | null;
  coupon?: number | null;
  payment_type?: string | null;
  address?: string | null;
  item_name?: string | null;
  item_rank?: string | null;
  number_of_unread_messages?: number | null;
  case_type?: string | null;
  case_sub_type?: string | null;
  attachment_file_type?: string | null;
  creation_date?: string | null;
  button_position?: string;
  shopping_cart_id?: number;
  number_of_items?: number | null;
  total_price?: number;
  total_ok_price?: number;
  city_name?: string | null;
  is_new?: number | null;
  selected_time?: string | null;
  position?: string | null;
  day_index?: number;
  feature?: string | null;
  place_type?: string | null;
  total?: number | null;
  plaque?: string | number;
  map_name?: string | null;
  mood?: string | null;
}

export interface MetrixEventParams {
  first_name?: string | null;
  last_name?: string | null;
  mobile_number?: string | null;
  product_name?: string;
  store_id?: number | null;
  store_type?: number | null;
}

export interface AttributeNames {
  anonymous_id?: number | null;
  phone?: string;
  first_name?: string | null;
  last_name?: string | null;
  segment_id?: number | null;
  device_model?: string;
  device_brand?: string;
  os_version?: string;
  device_id?: number | null;
  city_name?: string;
  app_version?: string;
  app_push_id?: string | null;
  web_push_id?: Promise<string | void> | null;
  firebase_version?: 'new';
  last_device_type_code?: number | null;
  metrix_user_id?: number | null;
  metrix_acquisition_ad?: string | null;
  metrix_acquisition_ad_set?: string | null;
  metrix_acquisition_campaign?: string | null;
  metrix_acquisition_source?: string | null;
  metrix_acquisition_status?: 'ATTRIBUTED' | 'NOT_ATTRIBUTED_YET' | 'ATTRIBUTION_NOT_NEEDED' | 'UNKNOWN' | null;
  user_id?: string;
  metrix_session_id?: number | null;
  advertising_id?: any;
  idfa?: any;
}
declare global {
  interface Window {
    dataLayer?: object[];
    webengage?: any;
  }
}

export type PlpStateType = {
  showGrid: boolean;
  productIndex: number | null;
  selectedSort: string;
  currentRoute: string;
  params: {
    sort: string | null;
    page: number | null;
    take: number | null;
    isDailyOffer: boolean;
    hasQuantity: boolean;
    minPrice: number | null;
    maxPrice: number | null;
    brandIds: number[];
    searchText: string | string[];
    categorySlugs;
    category1Name: string | null;
    category2Name: string | null;
    category3Name: string | null;
    brandSlugs;
    storeId?: number;
    carouselId?: string;
    brandNames: string[];
  };
  isLoading: boolean;
  isLoaded: boolean;
  typing: boolean;
  typingTimeout: any;
  openInModal: boolean;
  categoryOrBrandName: string;
  parent: string[] | null;
};

export type TMapState = {
  defaultViewPort: {
    latitude: number;
    longitude: number;
    id: number;
    name: string;
  };
  viewport: {
    latitude: number;
    longitude: number;
  };
  searchCity: string;
  searchLocation: string;
  filteredCities: any[];
  searchLocationResult: any[];
  selectedCity: {
    id: number;
    name: string;
    lat: number;
    lng: number;
  };
  neshanCityName: string;
  showSearchCityResult: boolean;
  showSearchLocationResult: boolean;
  mapIsTouched: boolean;
  eventStartTime: number;
};
// export type EventParams = {
//   product_id: number | null;
//   product_name: string | null;
//   final_price: number | null;
//   sort_type: number | null;
//   discount_percent: number | null;
//   plp_category_name: string | null;
//   plp_category_id: number | null;
//   search_term: string | null;
//   section_name: string | null;
//   reference_type: string | null;
//   reference_id: number | null;
//   product_rank: number | null;
//   plp_page_number: number | null;
//   store_id: number | null;
//   store_type: number | null;
//   mobile_number: string | null;
// };
export interface INeshanAddressByLocation {
  result: {
    components?: INeshanComponent[];
    address: string;
    formatted_address: string;
    locality: string;
    district: string;
    place: string;
    village: string;
    city: string;
    province: string;
    country: string;
    traffic_zone?: INeshanTrafficZone;
  };
}

export interface INeshanComponent {
  long_name: string;
  short_name: string;
  type: string;
}

export interface INeshanTrafficZone {
  name: string;
  in_central: boolean;
  in_evenodd: boolean;
}

export interface INeshanAddressByLocation {
  status: string;
  formatted_address: string;
  route_name: string;
  route_type: string;
  neighbourhood: string;
  city: string;
  state: string;
  place: string | null;
  municipality_zone: string | number;
  in_traffic_zone: boolean | string;
  in_odd_even_zone: boolean | string;
  village: string | null;
  county: string;
  district: string;
}

export type ProductType = {
  storeId: number | null;
  id: number | null;
  section_name: string | null;
  product_rank: number | null;
  reference_id?: string | null;
  reference_type: string | null;
  reference_name: string | null;
  brandId?: number | null;
  brandLatinName?: string | null;
  brandName?: string | null;
  categoryId?: number | null;
  categoryName?: string | null;
  discountPercent?: number | null;
  hasQuantity?: boolean | null;
  highlightName?: string | null;
  isDailyOffer?: boolean | null;
  isShowDiscount?: boolean | null;
  maxOrderLimit?: number | null;
  maximumOrderWholesale?: number | null;
  name?: string | null;
  noInPackage?: number | null;
  okPrice?: number | null;
  price?: number | null;
  psmStateCode?: number | null;
  psmStatusCode?: number | null;
  shoppingCartQuantity?: number | null;
  shortDescription?: string | null;
  storeTypeName?: string | null;
  stateCode?: number | null;
  statusCode?: number | null;
  thumbImage?: string | null;
  queryId?: string | null;
  position?: number | null;
  webLink?: string;
  isInPdpBottomSheet?: boolean | null;
  lineIndex?: number | null;
};

export type Color = 'inherit' | 'primary' | 'secondary' | 'default';
export type TStoreInfo = {
  deliveryCost?: string;
  displayOrder?: number;
  firstActiveDeliverySchedule?: string;
  hasFreeDelivery?: boolean;
  isActive?: boolean;
  isExist?: boolean;
  isServes?: boolean;
  logo?: string;
  minimumOrder?: number;
  rate?: number;
  reviews?: number;
  storeId?: number;
  storeName?: string;
  storeStatusMessage?: string;
  storeType?: string;
};
export type TStoreItem = {
  cityId: number;
  cityName: string;
  description: string;
  firstDeliveryTime: string;
  imageUrl: string;
  isDefault: boolean;
  latitude: number;
  longitude: number;
  oneHourDeliveryDescription: string;
  sectorId: number;
  sectorName: string;
  sectorPartId: number;
  sectorPartName: string;
  showOneHourDelivery: boolean;
  storeId: number;
  storeName: string;
  storeType: string;
  storeTypeId: number;
  cost: number;
  id: number;
  isOk24: boolean;
  logo: string;
  logoFile: string;
  logoUrl: string;
  partnerId: number;
  partnerName: string;
  rate: number;
  statusCode: 1;
  hasFreeDelivery: boolean;
  firstActiveDeliverySchedule: string;
  isSuperFastDelivery: boolean;
  labels?: string[];
};

export interface IUserAddresses {
  address?: string;
  cityId?: number;
  cityName?: string;
  countOfStores?: number;
  customerId?: number;
  customerName?: string;
  id?: number;
  isAvailableInCurrentStore?: boolean;
  isDefault?: boolean;
  lat?: number;
  lng?: number;
  mobilePhone?: string;
  phoneNumber?: string | number;
  plaque?: string;
  postalCode?: string | number;
  sectorId?: number;
  sectorName?: string;
  sectorPartId?: number;
  sectorPartName?: string;
  stateCode?: number;
  storeId?: number;
  title?: string;
  transferee?: string;
  unit?: string;
}

export interface IUser {
  alternativeCustomerId?: number;
  alternativeId?: string;
  anonymousCode?: string;
  birthDate?: string;
  birthDateEpoch?: number;
  confirmTerms?: boolean;
  createdOn?: string;
  customerGuid?: string;
  customerPassword?: string;
  customerType?: boolean;
  deviceTypeCode?: boolean;
  emailAddress?: string;
  emailVerified?: boolean;
  emailVerifyDate?: null;
  firstName?: string;
  genderCode?: number;
  genderTitle?: string;
  hasAddress?: boolean;
  hasPassword?: boolean;
  id?: number;
  invitee?: string | number;
  isVIP?: number;
  lastName?: string;
  lastUpdatePassword?: string;
  lastUpdatePasswordEpoch?: number;
  loyaltyLevel?: number;
  mobilePhone?: string;
  mobileVerified?: boolean;
  mobileVerifyDate?: string | number;
  modifiedOn?: string;
  okClubCard?: string;
  password?: string;
  phoneNumber?: string;
  resellerId?: number | string;
  stateCode?: number;
  stateCodeTitle?: string;
  statusCode?: number | string;
  storeId?: number;
  tel1?: string;
  tel2?: string;
  uniqueCode?: string;
  userName?: string;
  zipPostalCode?: string | number;
}

// ----------- events anlytic type ----------
export interface ISessionStartEvent {
  sessionId: string;
  eventName: string;
  params: {
    userId: number;
    advertisingId: string;
    appVersion: string;
    androidVersion: string;
    hostName: string;
    deviceModel: string;
    deviceBrand: string;
    browserModel: string;
    sourceMedium: any;
  };
}
export interface IPageViewEvent {
  eventName: string;
  sessionId: string;
  timeStamp: number;
  params: {
    userId: number;
    hostName: string;
    pagePath: string;
    referrer: string;
    sourceMedium: any;
  };
}
export interface IAddToCartEvent {
  eventName: string;
  sessionId: string;
  timeStamp: number;
  params: {
    product_id: number;
    product_name: string;
    final_price: number;
    sort_type: string;
    discount_percent: number;
    cart_item_number: number;
    product_quantity: number;
    search_term: string | string[];
    section_name: string;
    reference_type: string;
    reference_id: string;
    product_rank: number;
    plp_page_number: number | string;
    store_id: number;
    store_type: string;
    user_id: number;
    queryId: string | null;
    sourceMedium: any;
    line_rank: number | string;
  };
}

export interface IBannerEvent {
  eventName: string;
  sessionId: string;
  timeStamp: number;
  params: {
    bannerId: number;
    deviceType: string;
    position: number;
    pageType: string;
    userId: number;
    type: 'slider' | 'banner';
    // sourceMedium: any;
    eventType: 'click' | 'view';
  };
}

export interface IStoreInfoEvent {
  eventName: string;
  sessionId: string;
  timeStamp: number;
  params: {
    userId: number;
    position: number;
    storeId: number;
    storeTypeId: number;
    storeName: string;
    storeTypeName: string;
    sourceMedium: any;
  };
}

export interface IPaymentClickEvent {
  eventName: string;
  sessionId: string;
  timeStamp: number;
  params: {
    userId: number;
    orderId: number;
    sourceMedium: any;
  };
}
export interface IAddressListEvent {
  eventName: string;
  sessionId: string;
  timeStamp: number;
  params: {
    userId: number;
  };
}

export interface IVPNAlertEvent {
  eventName: string;
  sessionId: string;
  timeStamp: number;
  params: {
    userId: number;
    pagePath: string;
  };
}

export interface IReorderButtonEvent {
  eventName: string;
  sessionId: string;
  timeStamp: number;
  params: {
    userId: number;
    orderId: number;
    pagePath: string;
  };
}
export interface IPopularBrandEvent {
  eventName: string;
  sessionId: string;
  timeStamp: number;
  params: {
    eventType: string;
    position: number;
    destinationUrl: string;
    brandId: number;
    brandName: string;
    pagePath: string;
  };
}
