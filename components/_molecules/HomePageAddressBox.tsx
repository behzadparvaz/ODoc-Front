import { useGetUserLocations } from '@api/user/user.rq';
import AddressBox from '@com/_atoms/AddressBox';

const HomePageAddressBox = () => {
  const { data, isLoading } = useGetUserLocations();
  const addressDate: any = data;
  return (
    <div className="h-full flex items-center cursor-pointer">
      {addressDate?.length && isLoading === false ? (
        <AddressBox data={data} />
      ) : null}
    </div>
  );
};
export default HomePageAddressBox;
