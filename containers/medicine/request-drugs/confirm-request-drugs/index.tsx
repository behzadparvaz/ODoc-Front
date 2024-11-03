import { useCreateOrderInline } from '@api/order/orderApis.rq';
import { useGetProfile } from '@api/user/user.rq';
import { Button } from '@com/_atoms/NewButton';
import Input from '@com/_atoms/Input.nd';
import { TextAreaInput } from '@com/_atoms/NewTextArea';
import SelectAddress from '@com/_organisms/SelectAddress';
import SelectGender from '@com/_organisms/selectGender';
import {
  ChevronDownIcon,
  ChevronLeftIconOutline,
  ClipboardClockIcon,
  LocationIconOutline,
  NewDeleteIcon,
} from '@com/icons';
import { MainLayout } from '@com/Layout';
import ActionBar from '@com/Layout/ActionBar';
import { colors } from '@configs/Theme';
import useModal from '@hooks/useModal';
import useNotification from '@hooks/useNotification';
import { removeDrugAction } from '@redux/requestDrugs/requestDrugsActions';
import { routeList } from '@routes/routeList';
import { RootState } from '@utilities/types';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const ConfirmRequestDrugs = () => {
  const dispatch = useDispatch();
  const { back, push } = useRouter();
  const { data, isLoading: profileDataLoading } = useGetProfile();
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState({
    description: '',
    age: '',
    gender: '',
    nationalCode: data?.queryResult?.[0]?.nationalCode || '',
    sensitivity: '',
  });
  const { addModal, removeLastModal } = useModal();
  const { user } = useSelector((state: RootState) => state.user);
  const drugs = useSelector((state: any) => state.requestDrugs.drugs);

  const { mutate, isPending } = useCreateOrderInline();
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
        age: '',
        gender: '',
        sensitivity: '',
      });
    };
  }, []);
  useEffect(() => {
    if (!profileDataLoading) {
      setState((prev) => ({
        ...prev,
        nationalCode: data?.queryResult?.[0]?.nationalCode || '',
      }));
    }
  }, [profileDataLoading]);
  const handleDeleteDrug = (drugId) => {
    dispatch(removeDrugAction(drugId));
  };

  const handleGenderClick = (e) => {
    addModal({
      modal: SelectGender,
      props: {
        handleClick: (item) => {
          setState({
            ...state,
            gender: item?.name,
          });
          removeLastModal();
        },
      },
    });
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
      // Generate formatted description
      const formattedDescription = [
        state.age ? `سن: ${state.age}` : '', // Add age if it exists
        state.gender ? `جنسیت: ${state.gender}` : '', // Add gender if it exists
        state.sensitivity ? `حساسیت: ${state.sensitivity}` : '', // Add sensitivity if it exists
        state.description, // Always add description
      ]
        .filter(Boolean)
        .join('\n'); // Join with line breaks

      body.nationalCode = state.nationalCode;
      body.description = formattedDescription;
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
          <div className="flex items-center justify-center gap-4">
            <div className="w-full flex flex-col">
              <Input
                onChange={(e) => {
                  setState({
                    ...state,
                    age: e?.target?.value,
                  });
                }}
                labelClassName="text-base font-medium mt-5"
                label="سن"
                type="number"
                inputClassName="h-[52px] text-base bg-gray-100 py-4 px-3"
                value={state.age}
              />
            </div>
            <div className="w-full flex flex-col">
              <label className=" text-grey-800 mb-2 text-base font-medium mt-5">
                جنسیت
              </label>
              <div
                onClick={handleGenderClick}
                className={`bg-gray-100 flex justify-between items-center cursor-pointer px-3 rounded-md h-[52px]`}
              >
                {data?.drugShape?.name ? (
                  data?.drugShape?.name
                ) : (
                  <span
                    className={classNames(
                      !state.gender ? 'text-grey-400' : 'text-black',
                    )}
                  >
                    {state.gender ? state.gender : 'جنسیت'}
                  </span>
                )}
                <ChevronDownIcon width={20} height={20} stroke={colors.black} />
              </div>
            </div>
          </div>
          <div className="w-full">
            <TextAreaInput
              id="description"
              onChange={(e) => {
                setState({
                  ...state,
                  sensitivity: e?.target?.value,
                });
              }}
              labelClassName="text-base font-medium mt-5"
              label="حساسیت های دارویی"
              placeholder="برای داروخانه توضیح بنویسید"
              rows={5}
              value={state.sensitivity}
            />
          </div>
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
        <ActionBar type="singleAction" hasDivider>
          <Button
            className="w-full"
            variant="primary"
            size="large"
            type="submit"
            onClick={() => handleSendForm()}
            isLoading={isPending}
          >
            تأیید و ادامه
          </Button>
        </ActionBar>
      </div>
    </MainLayout>
  );
};
export default ConfirmRequestDrugs;
