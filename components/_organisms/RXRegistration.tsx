import OrderInfoForm from '@com/_molecules/OrderInfoForm';
import { useAddProductToBasket } from '@api/basket/basketApis.rq';
import { useRouter } from 'next/router';
import { routeList } from '@routes/routeList';
import { useGetProfile } from '@api/user/user.rq';
import { BottomModalContainer } from '@com/modal/containers/bottomMobileContainer';
import { selectStoreTexts } from '@com/texts/selectStoreTexts';
import Spinner from '@com/_atoms/Spinner';

const RXRegistration = () => {
  const { data, isLoading: profileDataLoading } = useGetProfile();

  return <BottomModalContainer
    height={'88%'}
    hasCloseButton={true}
    title={selectStoreTexts?.orderRegistration}
    className="!overflow-hidden !pt-5 !max-h-[704px] !bg-white"
  >
    <div className="h-[calc(100vh-230px)] overflow-auto mt-4">
      {profileDataLoading === false ? (
        <OrderRegisterSteps data={data}/>
      ) : (
        <Spinner className="h-[calc(100vh-180px)] w-full flex justify-center items-center"/>
      )}
    </div>
  </BottomModalContainer>;
};

export default RXRegistration;

const OrderRegisterSteps = ({ data, className = '' }) => {
  const userInfo = data?.queryResult[0];
  const router = useRouter()

  const { mutate: addToCart, isLoading: isAddingToCart } =
    useAddProductToBasket({
      onSuccess: () => {
        router.push(routeList.basket)
      },
    });

  return (
    <div className={`relative ${className}`}>
      <OrderInfoForm
        submitForm={(value) => {
          addToCart({
            orderType: 'RX',
            refrenceNumber: value?.referenceNumber,
            nationalCode: value?.nationalCode,
            insuranceType: Number(value?.insuranceTypeId),
            supplementaryInsuranceType: 0,
            isSpecialPatient: false
          })
        }}
        userInfo={userInfo}
      />
    </div>
  );
};
