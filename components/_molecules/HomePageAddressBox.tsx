import { useGetUserLocations } from '@api/user/user.rq';
import AddressBox from '@com/_atoms/AddressBox';
import { BasketIconOutline } from '@com/icons';
import { generalTexts } from '@com/texts/generalTexts';
import { routeList } from '@routes/routeList';
import { useRouter } from 'next/router';

const HomePageAddressBox = () => {
  const router = useRouter();
  const { data, isLoading } = useGetUserLocations();
  const addressDate: any = data;
  return (
    <div className="w-full px-6 py-4 flex justify-between items-center">
      <div className="w-full">
        <p className="text-grey-400 pb-2 text-sm">{generalTexts?.sendTo}</p>

        {addressDate?.length && isLoading === false ? (
          <AddressBox data={data} />
        ) : null}
      </div>
      <div className="w-[22px]" onClick={() => router.push(routeList?.basket)}>
        <BasketIconOutline width={22} height={22} fill={'#000'} />
      </div>
    </div>
  );
};
export default HomePageAddressBox;
