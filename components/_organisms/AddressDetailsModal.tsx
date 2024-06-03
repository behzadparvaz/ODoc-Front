import { HomeIconOutline, MoreSquareIconOutLine, TickIcon, WorkIcon } from '@com/icons';
import { colors } from '@configs/Theme';
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { useDispatch, useSelector } from 'react-redux';
import { setMapStateAction } from '@redux/map/mapActions';
import { useFormik } from 'formik';
import { responseType, RootState } from 'utilities/types';
import { addNewAddressSchema } from '@utilities/validationSchemas';
import { useAddLocation } from '@api/user/user.rq';
import { useRouter } from 'next/router';
import { addressSeparator, cedarAddressFixedPartCreator } from '@utilities/addressUtils';
import useModal from '@hooks/useModal';
import { selectStoreTexts } from '@com/texts/selectStoreTexts';
import { convertPersianNumbersToEnglishNumbers } from '@utilities/mainUtils';
import useNotification from '@hooks/useNotification';
import { FullModalContainer } from '@com/modal/containers/fullMobileContainer';
import { mobileModeMaxWidthClassName, shouldShowMobileMode } from '@configs/ControlMobileView';

const Button = dynamic(() => import('@com/_atoms/Button'));
const Input = dynamic(() => import('@com/_atoms/Input.nd'));

type Props = { addressData?: any; addressId?: number };

export default function AddressDetailsModal({ addressData, addressId }: Props) {
  const router = useRouter();
  const dispatch = useDispatch();
  const addressInputRef = useRef(null);
  const { addModal, removeLastModal, removeAllModalAction } = useModal();
  const { openNotification } = useNotification();
  const [addressTitle, setAddressTitle] = useState<string>('');
  const { viewport, eventStartTime, defaultViewPort } = useSelector((state: RootState) => state.mapInfo);
  const { user } = useSelector((state: RootState) => state.user);
  const { mutate: mutateAddLocation, isLoading: mutateAddLocationLoading } =
    useAddLocation();
  const [addressIsFocused, setAddressIsFocused] = useState<boolean>(false);
  const [addressReadonlyPart, setAddressReadonlyPart] = useState<string>('');
  const [addressEditablePart, setAddressEditablePart] = useState<string>('');
  const addressTitleOption = [
    {
      title: 'خانه',
      icon: <HomeIconOutline width={14} height={14} fill={colors.grey[600]} />,
      activeIcon: <HomeIconOutline width={14} height={14} fill={colors.white} />,
    },
    {
      title: 'محل‌کار',
      icon: <WorkIcon width={14} height={14} fill={colors.grey[600]} />,
      activeIcon: <WorkIcon width={14} height={14} fill={colors.white} />,
    },
    {
      title: 'سایر',
      icon: <MoreSquareIconOutLine width={14} height={14} stroke={colors.grey[600]} />,
      activeIcon: <MoreSquareIconOutLine width={14} height={14} stroke={colors.white} />,
    },
  ];
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
  const [initialValues] = useState({
    plaque: '',
    unit: '',
    latitude: viewport?.latitude,
    longitude: viewport?.longitude,
    name: '',
    postalCode: '',
  });
  const textAreaChangeHandler = (e) => {
    if (e.target.value.length >= addressReadonlyPart.length && e.target?.selectionStart >= addressReadonlyPart.length) {
      setAddressEditablePart(
        addressSeparator(e.target.value ? e.target.value : '', addressReadonlyPart).addressEditablePart
      );
    } else {
      e.preventDefault();
    }
  };
  const textAreaFocusHandler = (e) => {
    if (e.target?.selectionStart < addressReadonlyPart.length) {
      e.preventDefault();
      e.target.setSelectionRange(addressReadonlyPart.length, addressReadonlyPart.length);
    }
  };
  const formik = useFormik({
    initialValues,
    validationSchema: addNewAddressSchema,
    onSubmit: (values) => {
      const body = {
        latitude: viewport?.latitude,
        longitude: viewport?.longitude,
        name: values?.name !== '' ? values?.name : addressTitle,
        city: addressData?.subdivision_prefix,
        Description: `${addressReadonlyPart}${addressEditablePart} پلاک ${values?.plaque} واحد ${values?.unit}`,
        postalCode: String(values?.postalCode)
      }
      mutateAddLocation(body,
        {
          onSuccess: () => {
            removeLastModal()
            openNotification({
              message: `${selectStoreTexts?.successAddAddress}`,
              type: 'success',
              notifType: 'successOrFailedMessage',
            });
          },
        }
      );
    },
  });

  useEffect(() => {
    let neshanAddress = cedarAddressFixedPartCreator(
      addressData?.address,
      5
    );
    const { addressReadonlyPart, addressEditablePart } = addressSeparator(
      addressData?.address,
      neshanAddress
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
        })
      );
    };
  }, []);

  return (
    <FullModalContainer style={{ overflowY: 'scroll' }}>

      <div className='px-4'>
        <form className="flex flex-col mb-[86px]">
          <p className="text-sm font-normal text-grey-800 mb-2 mt-4">{selectStoreTexts?.AddressDetail}</p>
          <textarea
            className="w-full h-[72px] rounded-md border border-grey-300 outline-none text-sm text-grey-600 font-normal px-4 py-3"
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
          <div className="w-full flex justify-between gap-2 mt-5 border-t border-grey-100 pt-5">
            <Input
              placeholder={selectStoreTexts?.enterPlaque}
              label={selectStoreTexts?.plaque}
              className="flex-auto"
              labelClassName="font-normal text-sm"
              inputClassName="placeholder-grey-300 border border-grey-300 text-grey-600 text-sm px-4 custom-input"
              id="plaque"
              name="plaque"
              value={formik.values.plaque}
              onChange={formik.handleChange}
              isTouched={formik.touched.plaque && Boolean(formik.errors.plaque)}
              errorMessage={formik.errors.plaque}
            />
            <Input
              placeholder={selectStoreTexts?.enterUnit}
              label={selectStoreTexts?.unit}
              className="flex-auto"
              labelClassName="font-normal text-sm"
              inputClassName="placeholder-grey-300 border border-grey-300 text-grey-600 text-sm px-4 custom-input"
              id="unit"
              name="unit"
              value={formik.values.unit}
              onChange={formik.handleChange}
              isTouched={formik.touched.unit && Boolean(formik.errors.unit)}
              errorMessage={formik.errors.unit}
            />
          </div>
          <div className="w-full flex justify-between gap-2 mt-5 border-t border-grey-100 pt-5">
            <Input
              placeholder={selectStoreTexts?.enterPostalCode}
              label={selectStoreTexts?.postalCode}
              className="flex-auto"
              labelClassName="font-normal text-sm"
              inputClassName="placeholder-grey-300 border border-grey-300 text-grey-600 text-sm px-4 custom-input"
              id="postalCode"
              name="postalCode"
              type='number'
              value={formik.values.postalCode}
              onChange={formik.handleChange}
              isTouched={formik.touched.postalCode && Boolean(formik.errors.postalCode)}
              errorMessage={formik.errors.postalCode}
            />
          </div>
          <p className="text-sm font-semibold text-grey-800 mb-3 mt-5  border-t border-grey-100 pt-5">{selectStoreTexts?.title}</p>
          <div className="grid grid-cols-3  gap-2">
            {addressTitleOption?.map((item, index) => {
              return (
                <Button
                  backgroundColor={addressTitle === item?.title ? colors.teal[600] : colors.teal?.[50]}
                  color={addressTitle === item?.title ? colors.white : colors.teal[600]}
                  size="large"
                  className="!rounded-xl transition-all duration-200 border border-teal-700"
                  handleClick={(e) => {
                    e.preventDefault();
                    setAddressTitle(item?.title);
                  }}
                  key={index}
                >
                  {item?.title}
                </Button>
              );
            })}
          </div>
          {addressTitle === addressTitleOption?.[2].title && (
            <Input
              placeholder={selectStoreTexts?.enterAddressTitle}
              className="flex-auto"
              labelClassName="font-normal"
              inputClassName="placeholder-grey-300 border border-grey-300 text-grey-600 text-sm px-4 mt-3 custom-input"
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
          )}
          <div
            className={`fixed inset-x-0 px-6  bottom-4 truncate mx-auto z-10 ${shouldShowMobileMode ? mobileModeMaxWidthClassName + ' mx-auto' : ''
              }`}
          >
            <Button
              className="w-full"
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
      </div>
    </FullModalContainer>
  );
}
