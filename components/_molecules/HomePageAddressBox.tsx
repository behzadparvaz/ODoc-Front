import { useGetUserLocations } from '@api/user/user.rq';
import AddressBox from '@com/_atoms/AddressBox';
import { BasketIconOutline } from '@com/icons';
import { generalTexts } from '@com/texts/generalTexts';
import { colors } from '@configs/Theme';

const HomePageAddressBox = () => {
  const { data, isLoading } = useGetUserLocations();
  const addressDate: any = data;
  return (
    <div className="w-full px-6">
      <p className="text-grey-400 pt-3 pb-2 text-xs">{generalTexts?.sendTo}</p>
      <div className="flex justify-between items-center">
        <div className="w-[calc(100%-22px)] pl-3">
          {addressDate?.length && isLoading === false ? (
              <AddressBox data={data} />
          ) : null}
        </div>
        <div className="w-[22px]">
          <BasketIconOutline
            width={22}
            height={22}
            fill={colors?.grey?.[400]}
          />
        </div>
      </div>
    </div>
  );
};
export default HomePageAddressBox;
