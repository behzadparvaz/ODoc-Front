export type VendorDetailDataModel = {
  id: string | null;
  vendorCode: string;
  vendorName: string;
  contactNumber: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
    province: string;
    city: string;
    region: number;
    createDateTime: string | null;
    modifiedDateTime: string | null;
    createBy: string | null;
    modifiedBy: string | null;
  };
  founder: {
    name: string;
    nationalCode: {
      value: string;
    };
    phoneNumber: {
      value: string;
    };
    createDateTime: string | null;
    modifiedDateTime: string | null;
    createBy: string | null;
    modifiedBy: string | null;
  };
  status: {
    name: string;
    id: number;
  };
  pharmacyType: {
    name: string;
    id: number;
  };
  cooperationType: {
    name: string;
    id: number;
  };
  person: string | null;
  nationalImage: string | null;
  pharmacyLicense: string | null;
  createDateTime: string | null;
  modifiedDateTime: string | null;
  createBy: string | null;
  modifiedBy: string | null;
  fromTimeActive: string | null;
  toTimeActive: string | null;
};
