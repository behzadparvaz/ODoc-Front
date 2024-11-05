import { useGetUserLocations } from '@api/user/user.rq';
import AddressBox from '@com/_atoms/AddressBox';
import { generalTexts } from '@com/texts/generalTexts';

const HomePageAddressBox = () => {
  const { data, isLoading } = useGetUserLocations();
  const addressDate: any = data;
  return (
    <div className="w-full flex flex-col cursor-pointer">
      <p className="text-grey-400 pb-2 text-xs">{generalTexts?.sendTo}</p>

      {addressDate?.length && isLoading === false ? (
        <AddressBox data={data} />
      ) : null}
    </div>
  );
};
export default HomePageAddressBox;
