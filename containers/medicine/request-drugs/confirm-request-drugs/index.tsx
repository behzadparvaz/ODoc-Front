import {
  useCreateOrderInline,
  useCreateOrderInlineStep1,
} from '@api/order/orderApis.rq';
import { useGetUserLocations } from '@api/user/user.rq';
import Button from '@com/_atoms/Button';
import Input from '@com/_atoms/Input.nd';
import { TextAreaInput } from '@com/_atoms/NewTextArea';
import SelectAddress from '@com/_organisms/SelectAddress';
import MainPageLayout from '@com/_template/MainPageLayout';
import {
  ChevronLeftIconOutline,
  ClipboardClockIcon,
  LocationIconOutline,
  NewDeleteIcon,
} from '@com/icons';
import { MainLayout } from '@com/Layout';
import { colors } from '@configs/Theme';
import useModal from '@hooks/useModal';
import useNotification from '@hooks/useNotification';
import { useSelectAddressByCurrentLocation } from '@hooks/useSelectAddressByCurrentLocation';
import {
  clearDrugsStateAction,
  removeDrugAction,
} from '@redux/requestDrugs/requestDrugsActions';
import { setUserAction } from '@redux/user/userActions';
import { routeList } from '@routes/routeList';
import { RootState } from '@utilities/types';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const ConfirmRequestDrugsContainer = () => {
  const dispatch = useDispatch();
  const { back, push } = useRouter();
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState({
    description: '',
    nationalCode: '',
  });
  const { addModal, removeLastModal } = useModal();
  const { user } = useSelector((state: RootState) => state.user);
  const drugs = useSelector((state: any) => state.requestDrugs.drugs);

  const { mutate, isLoading } = useCreateOrderInline();
  const { openNotification } = useNotification();

  useEffect(() => {
    if (user?.defaultAddress) {
      removeLastModal();
    } else {
      addModal({
        modal: SelectAddress,
      });
    }
  }, [dispatch, user?.defaultAddress]);

  useEffect(() => {
    if (!loading && (!drugs || drugs.length === 0)) {
      push('/app/otc-medicine');
    }
  }, [drugs, loading, push]);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setLoading(false);
    };
    fetchData();
    return () => {
      setState({
        description: '',
        nationalCode: '',
      });
    };
  }, []);

  const handleDeleteDrug = (drugId) => {
    dispatch(removeDrugAction(drugId));
  };

  const handleNationalCodeChange = (e) => {
    const value = e.target.value;

    // Allow only numeric input
    if (/^\d*$/.test(value)) {
      setState({
        ...state,
        nationalCode: value,
      });
    }
  };

  const handleSendForm = () => {
    const serializeData = (drugs: any) => {
      const body: any = {};
      const data = drugs.map((item) => {
        return {
          drugName: item.drugName,
          drugCount: item.quantity,
          drugType: item.drugShape?.id,
        };
      });
      body.nationalCode = state.nationalCode;
      body.description = state.description;
      body.orderDetails = data;
      body.addressId = user?.defaultAddress?.id;
      return body;
    };
    mutate(serializeData(drugs), {
      onSuccess: (data: any) => {
        if (data?.isSuccess) {
          push(`${routeList?.QuickOrderSuccess}/${data?.data?.orderUuid}`);
        } else {
          openNotification({
            type: 'error',
            message: data?.message,
            notifType: 'successOrFailedMessage',
          });
        }
      },
    });
  };

  return (
    <MainLayout
      title="تایید ثبت درخواست دارو"
      hasHeader
      headerType="withoutLogo"
      hasBackButton
    >
      <div className="flex justify-between flex-col h-full">
        <div className="flex flex-col px-4 cursor-pointer">
          <div
            onClick={() => {
              addModal({
                modal: SelectAddress,
              });
            }}
            className="flex justify-between gap-6"
          >
            <div>
              <LocationIconOutline
                width={36}
                height={36}
                fill={colors.grey[600]}
              />
            </div>
            <div className="w-full">
              <h1 className="font-bold text-xl">آدرس</h1>
              <p className="font-normal text-grey-500">
                {user?.defaultAddress?.description
                  ? user?.defaultAddress?.description
                  : 'آدرس خود را انتخاب کنید'}
              </p>
            </div>
            <div>
              <ChevronLeftIconOutline
                width={36}
                height={36}
                fill={colors.grey[400]}
              />
            </div>
          </div>
          <div className="h-[1px] bg-grey-200 w-full mt-5 mb-5" />
        </div>
        <div className="flex flex-col px-4">
          <h1 className="font-bold text-lg">اقلام درخواست</h1>
          <div className="mt-5 mb-5">
            {drugs.length > 0 ? (
              drugs.map((item, index) => (
                <div
                  className="flex justify-between items-center gap-6"
                  key={index}
                >
                  <div className="min-w-[32px] min-h-[32px] flex justify-center items-center bg-gray-200 rounded-full">
                    <ClipboardClockIcon
                      width={20}
                      height={20}
                      fill={colors.grey[600]}
                    />
                  </div>
                  <div className="w-full">
                    <p className="text-xl font-medium">{item.drugName}</p>
                    <p className="text-sm font-light text-grey-500">
                      {item.drugShape?.name}
                    </p>
                  </div>
                  <div
                    onClick={() => handleDeleteDrug(item.id)}
                    className="w-[72px] h-[72px] flex justify-center items-center cursor-pointer"
                  >
                    <NewDeleteIcon
                      width={24}
                      height={24}
                      fill={colors.red[400]}
                    />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">هیچ دارویی برای نمایش وجود ندارد.</p>
            )}
          </div>

          <div className="h-[1px] bg-grey-200 w-full mt-5 mb-5" />
        </div>
        <div className="w-full px-4">
          <TextAreaInput
            id="description"
            onChange={(e) => {
              setState({
                ...state,
                description: e?.target?.value,
              });
            }}
            labelClassName="text-base font-medium mt-5"
            label="توضیحات سفارش"
            placeholder="برای داروخانه توضیح بنویسید"
            rows={5}
            value={state.description}
          />

          <Input
            onChange={handleNationalCodeChange}
            labelClassName="text-base font-medium mt-5"
            label="کد ملی"
            type="text"
            inputClassName="h-[52px] text-base bg-gray-100 py-4 px-3"
            placeholder="1234567890"
            value={state.nationalCode}
          />
        </div>
        <div className="px-4">
          <Button
            buttonType="contained"
            variant="primary"
            className="w-full mb-9 mt-9"
            size="large"
            type="button"
            handleClick={() => handleSendForm()}
            isLoading={isLoading}
          >
            تایید و ادامه
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};
export default ConfirmRequestDrugsContainer;
