import { useGetUserLocations } from '@api/user/user.rq';
import AddressBox from '@com/_atoms/AddressBox';
import { generalTexts } from '@com/texts/generalTexts';

const HomePageAddressBox = () => {
  const { data, isLoading } = useGetUserLocations();
  const addressDate: any = data;
  return (
    <div className="w-full h-[70px] px-4 cursor-pointer">
      <div className="flex justify-between items-center">
        <div className="w-full">
          <p className="text-grey-400 pb-2 text-sm">{generalTexts?.sendTo}</p>

          {addressDate?.length && isLoading === false ? (
            <AddressBox data={data} />
          ) : null}
        </div>
      </div>
    </div>
  );
};
export default HomePageAddressBox;
