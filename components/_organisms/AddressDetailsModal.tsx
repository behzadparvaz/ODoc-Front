import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';

import { colors } from '@configs/Theme';
import { setMapStateAction } from '@redux/map/mapActions';
import { RootState } from 'utilities/types';
import { addNewAddressSchema } from '@utilities/validationSchemas';
import { useAddLocation, useGetUserLocation } from '@api/user/user.rq';
import {
  addressSeparator,
  cedarAddressFixedPartCreator,
} from '@utilities/addressUtils';
import { selectStoreTexts } from '@com/texts/selectStoreTexts';
import { BottomModalContainer } from '@com/modal/containers/bottomMobileContainer';
import { TextInput } from '@com/_atoms/NewTextInput';
import { routeList } from '@routes/routeList';
import { Location } from '@utilities/interfaces/location';

const Button = dynamic(() => import('@com/_atoms/Button'));

type Props = { addressData?: any; initialData?: Location };

export default function AddressDetailsModal({
  addressData,
  initialData,
}: Props) {
  const { pathname } = useRouter();
  const dispatch = useDispatch();
  const addressInputRef = useRef(null);
  const { viewport, defaultViewPort } = useSelector(
    (state: RootState) => state.mapInfo,
  );
  const { mutate: mutateAddLocation, isPending: mutateAddLocationLoading } =
    useAddLocation({
      isInAddressPage: pathname !== '/app',
      isInEditAddress: !!initialData,
      addressId: initialData?.id,
    });
  const [addressIsFocused, setAddressIsFocused] = useState<boolean>(false);
  const [addressReadonlyPart, setAddressReadonlyPart] = useState<string>('');
  const [addressEditablePart, setAddressEditablePart] = useState<string>('');

  const [neshanLocationAddress, setNeshanLocationAddress] = useState<any>({
    result: {
      address: '',
      city: '',
      country: '',
      district: '',
      formatted_address: '',
      locality: '',
      place: '',
      province: '',
      village: '',
    },
  });

  const initialValues = {
    plaque: initialData?.houseNumber ?? '',
    unit: initialData?.homeUnit ?? '',
    latitude: viewport?.latitude,
    longitude: viewport?.longitude,
    name: initialData?.name ?? '',
  };

  const textAreaChangeHandler = (e) => {
    if (
      e.target.value.length >= addressReadonlyPart.length &&
      e.target?.selectionStart >= addressReadonlyPart.length
    ) {
      setAddressEditablePart(
        addressSeparator(
          e.target.value ? e.target.value : '',
          addressReadonlyPart,
        ).addressEditablePart,
      );
    } else {
      e.preventDefault();
    }
  };
  const textAreaFocusHandler = (e) => {
    if (e.target?.selectionStart < addressReadonlyPart.length) {
      e.preventDefault();
      e.target.setSelectionRange(
        addressReadonlyPart.length,
        addressReadonlyPart.length,
      );
    }
  };
  const formik = useFormik({
    initialValues,
    validationSchema: addNewAddressSchema,
    onSubmit: (values) => {
      const body = {
        latitude: viewport?.latitude,
        longitude: viewport?.longitude,
        name: values?.name,
        city: addressData?.subdivision_prefix,
        Description: `${addressReadonlyPart}${addressEditablePart}`,
        HouseNumber: values?.plaque,
        HomeUnit: values?.unit,
      };

      const editAddressBody = {
        id: initialData?.id,
        latitude: viewport?.latitude,
        longitude: viewport?.longitude,
        name: values?.name,
        city: addressData?.subdivision_prefix,
        description: `${addressReadonlyPart}${addressEditablePart}`,
        homeUnit: String(values?.unit),
        houseNumber: String(values?.plaque),
        postalCode: initialData?.postalCode,
        modifiedBy: initialData?.modifiedBy,
      };

      mutateAddLocation(initialData ? editAddressBody : body);
    },
  });

  useEffect(() => {
    let neshanAddress = cedarAddressFixedPartCreator(addressData?.address, 5);
    const { addressReadonlyPart, addressEditablePart } = addressSeparator(
      addressData?.address,
      neshanAddress,
    );
    setAddressReadonlyPart(addressReadonlyPart);
    setAddressEditablePart(addressEditablePart);
  }, [neshanLocationAddress]);

  useEffect(() => {
    return () => {
      dispatch(
        setMapStateAction({
          searchCity: '',
          searchLocation: '',
          showSearchCityResult: false,
          showSearchLocationResult: false,
          selectedCity: {
            id: defaultViewPort.id,
            name: defaultViewPort.name,
            lat: defaultViewPort.latitude,
            lng: defaultViewPort.longitude,
          },
        }),
      );
    };
  }, []);

  return (
    <BottomModalContainer
      title="جزییات آدرس"
      height={436}
      style={{ overflowY: 'scroll' }}
    >
      <form className="flex flex-col p-4">
        <div className="flex flex-col gap-y-2 py-3">
          <p className="text-xs font-semibold text-grey-800">
            {selectStoreTexts?.title}
          </p>

          <TextInput
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            isTouched={formik.touched.name && Boolean(formik.errors.name)}
            onBlur={formik.handleBlur}
            errorMessage={formik.errors.name}
          />
        </div>

        <div className="flex flex-col gap-y-2 py-3">
          <div className="flex flex-col gap-y-2">
            <p className="text-xs font-normal text-grey-800">
              {selectStoreTexts?.AddressDetail}
            </p>

            <textarea
              className="w-full h-[72px] resize-none rounded-md outline-none text-xs text-grey-600 font-normal px-4 py-3 bg-grey-100"
              id="address"
              name="address"
              value={addressReadonlyPart + addressEditablePart}
              onChange={(e) => textAreaChangeHandler(e)}
              onFocus={(e) => {
                !addressIsFocused && setAddressIsFocused(true);
              }}
              onClick={(e) => {
                textAreaFocusHandler(e);
              }}
              onBlur={() => {
                addressIsFocused && setAddressIsFocused(false);
              }}
              ref={addressInputRef}
            />
          </div>

          <div className="w-full flex justify-between gap-2  pt-5">
            <TextInput
              placeholder={selectStoreTexts?.plaque}
              type="number"
              id="plaque"
              name="plaque"
              value={formik.values.plaque}
              onChange={formik.handleChange}
              isTouched={formik.touched.plaque && Boolean(formik.errors.plaque)}
              onBlur={formik.handleBlur}
              errorMessage={formik.errors.plaque}
            />
            <TextInput
              placeholder={selectStoreTexts?.unit}
              type="number"
              id="unit"
              name="unit"
              value={formik.values.unit}
              onChange={formik.handleChange}
              isTouched={formik.touched.unit && Boolean(formik.errors.unit)}
              onBlur={formik.handleBlur}
              errorMessage={formik.errors.unit}
            />
          </div>
        </div>

        <div className="flex gap-x-3">
          <Button
            className="flex-1 mt-11"
            color={colors.grey[50]}
            size="large"
            variant="primary"
            disabled={mutateAddLocationLoading}
            handleClick={formik.handleSubmit}
            isLoading={mutateAddLocationLoading}
          >
            {selectStoreTexts?.saveMyAddress}
          </Button>
        </div>
      </form>
    </BottomModalContainer>
  );
}
