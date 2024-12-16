import { useGetUserLocations } from '@api/user/user.rq';
import AddressBox from '@com/_atoms/AddressBox';

const HomePageAddressBox = () => {
  const { data } = useGetUserLocations();
  const addressList: any = data;
  return <AddressBox data={addressList} />;
};
export default HomePageAddressBox;
