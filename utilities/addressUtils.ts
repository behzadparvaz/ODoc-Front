const hasSimilarInformation = (address: string, cedarAddress: string): boolean => {
  return cedarAddress ? address?.includes(cedarAddress) : false;
};

const addressEditableSection = (address: string, cedarAddress: string): string => {
  let indexOfCedarAddress = address?.lastIndexOf(cedarAddress);
  return hasSimilarInformation(address, cedarAddress)
    ? address?.substring(indexOfCedarAddress + cedarAddress?.length)
    : address;
};

const addressReadonlySection = (address: string, cedarAddress: string): string => {
  return hasSimilarInformation(address, cedarAddress) ? cedarAddress : '';
};

type AddressPartsType = {
  addressReadonlyPart: string;
  addressEditablePart: string;
};
export const addressSeparator = (address: string, cedarAddress: string): AddressPartsType => {
  return {
    addressReadonlyPart: addressReadonlySection(address, cedarAddress),
    addressEditablePart: addressEditableSection(address, cedarAddress),
  };
};

export const cedarAddressFixedPartCreator = (address: string, maximumFixedPartNumber: number = 2): string => {
  let addressToArray = address?.split('،')?.map((part) => part?.trim());
  if (addressToArray?.length <= maximumFixedPartNumber) {
    return address;
  } else {
    let combinedAddressParts = '';
    addressToArray?.forEach((part, index) => {
      if (index < maximumFixedPartNumber) {
        combinedAddressParts =
          index !== maximumFixedPartNumber - 1
            ? combinedAddressParts?.concat(part, '، ')
            : combinedAddressParts?.concat(part);
      }
    });
    return combinedAddressParts;
  }
};
