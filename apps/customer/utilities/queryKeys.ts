export enum ProductDetailQueryKeys {
  getProductDetail = 'getProductDetail',
  getProductBreadcrumb = 'getProductBreadcrumb',
  getProductBreadcrumbWithSlug = 'getProductBreadcrumbWithSlug',
  getProductAttribute = 'getProductAttribute',
  getRelatedProducts = 'getRelatedProducts',
  getSupplementaryProducts = 'getSupplementaryProducts',
  getProductComments = 'getProductComments',
}

export enum FavoriteProduct {
  checkFavorite = 'checkProductFavorite',
  addfavorite = 'addProductFavorite',
  removefavorite = 'addProductFavorite',
}

export enum ProfileKeys {
  profileLoadData,
  customerDiscount,
  customerNotification = 'customerNotification',
  readNotification = 'readNotification',
  transactionHistory = 'TransactionHistory',
  creditCustomerCanReturn = 'CreditCustomerCanReturn',
  refundHistory = 'RefundHistory',
  deleteRequestRefund = 'DeleteRequestRefund',
  closedOrders = 'closedOrders',
  openOrders = 'openOrders',
  orderResultDetails = 'orderResultDetails',
  supportSubCaseType = 'supportSubCaseType',
  supportrequestList = 'supportRequestList',
  supportCustomerOrders = 'supportCustomerOrders',
  allOrders = 'allOrders',
}

export enum CategoryLinesKey {
  categoryLinesKey,
  mainCategories = 'mainCategories',
}

export enum BrandKeys {
  brandLinesKey = 'brandLinesKey',
  specialBrandsKey = 'specialBrandsKey',
}

export enum ProductListPageKeys {
  getListOfProduct = 'getListOfProduct',
  getOfferListOfProduct = 'getOfferListOfProduct',
  getListOfMobileProduct = 'getListOfMobileProduct',
  getOfferListOfMobileProduct = 'getOfferListOfMobileProduct',
  getListOfProductGroupByStore = 'getListOfProductGroupByStore',
  getCarouselOfferMultiStore = 'getCarouselOfferMultiStore',
  getPLPDescription = 'getPLPDescription',
  getProductRecommendationByStoreGrouping = 'getProductRecommendationByStoreGrouping',
}

export enum HeadTagKeys {
  headTag = 'headTag',
}

export enum HomePageQueryKeys {
  // GetDailyOffer = 'GetDailyOfferForReact',
  // GetAverageSales = 'GetAverageSalesForReact',
  // GetMostDiscount = 'GetMostDiscountForReact',
  // GetNewProduct = 'GetNewProductForReact',
  // GetProductRecommendation = 'GetProductRecommendationForReact',
  GetDailyOffer = 'GetDailyOffer',
  GetAverageSales = 'GetAverageSales',
  GetMostDiscount = 'GetMostDiscount',
  GetNewProduct = 'GetNewProduct',
  GetSpecificOffer = 'GetSpecificOffer',
  GetProductRecommendation = 'GetProductRecommendation',
  homeSlider = 'homeSlider',
  mainCategories = 'mainCategories',
  brandCategories = 'brandCategories',
  mainClientSideCategories = 'mainClientSideCategories',
  okalaBlog = 'okalaBlog',
  specialBrands = 'specialBrands',
  megaMenuCategories = 'megaMenuCategories',
  brandLines = 'brandLines',
  categoryLines = 'categoryLines',
  subCategories = 'subCategories',
  categoryById = 'categoryById',
  userStoresByLocation = 'userStoresByLocation',
  getFAQ = 'FAQHomepage',
}

export enum ShoppingCartQueryKeys {
  allShoppingCartItems = 'allShoppingCartItems',
  getCheckoutOrderDetails = 'getCheckoutOrderDetails',
}

export enum OrderDetailsPageKeys {
  getOrderResultDetails = 'getOrderResultDetails',
  getOrderInvoiceDetails = 'getOrderInvoiceDetails',
}

export enum BrandsPageQueryKeys {
  GetAllBrandsKeys = 'GetAllBrandsKeys',
  GetSpecialBrandKey = 'GetSpecialBrandKey',
  GetAllPopularBrands = 'GetAllPopularBrands',
}

export enum SuggestionSearchKeys {
  SuggestionSearch = 'SuggestionSearch',
}

export enum slidersKeys {
  TopHeaderImg = 'TopHeaderImg',
  MainSlider = 'MainSlider',
  SideBanner = 'SideBanner',
  BelowDailyOffer = 'BelowDailyOffer',
  AboveCategoryLine = 'AboveCategoryLine',
  BelowCategoryLine = 'BelowCategoryLine',
  AboveBrandLine = 'AboveBrandLine',
  BelowBrandLine = 'BelowBrandLine',
  SearchSuggestionBanner = 'SearchSuggestionBanner',
}

export enum loginKeys {
  loginAsCustomer = 'loginAsCustomer',
  externalLogin = 'externalLogin',
}

export enum StorePageQueryKeys {
  GetTodaysOffer = 'GetDailyOffer',
  GetMostDiscount = 'GetMostDiscount',
  GetSpecificOffer = 'GetSpecificOffer',
  mainCategories = 'mainCategories',
  GetStoreDetail = 'GetStoreDetail',
}

export enum StoresPageQueryKeys {
  GetStoresInArea = 'GetStoresInArea',
  AllStoresDeliveryTime = 'AllStoresDeliveryTime',
}

export enum SliderBodyKeys {
  newHomepageMobile = 'newHomepageMobile',
  NewHomepageDesktop = 'NewHomepageDesktop',
  StorePageMobile = 'StorePageMobile',
  StorePageDesktop = 'StorePageDesktop',
}

export enum SliderPositionKeyName {
  TopHeaderImg = 'TopHeaderImg',
  MainSlider = 'MainSlider',
  SideBanner = 'SideBanner',
  BelowDailyOffer = 'BelowDailyOffer',
  AboveCategoryLine = 'AboveCategoryLine',
  BelowCategoryLine = 'BelowCategoryLine',
  AboveBrandLine = 'AboveBrandLine',
  BelowBrandLine = 'BelowBrandLine',
  SearchSuggestionBanner = 'SearchSuggestionBanner',
  UnderTheCategory = 'UnderTheCategory',
}

export enum MapQueryKeys {
  NeshanLocation = 'NeshanLocation',
  ParsiLocation = 'ParsiLocation',
}
