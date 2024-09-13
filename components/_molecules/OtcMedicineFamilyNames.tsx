import { useGetCategories } from '@api/category/categoryApis.rq';
import Spinner from '@com/_atoms/Spinner';

type OtcMedicineFamilyNamesProps = {
  categoryCode: string;
};
const OtcMedicineFamilyNames = ({
  categoryCode,
}: OtcMedicineFamilyNamesProps) => {
  const { data, isLoading } = useGetCategories({
    level: 2,
    parentCode: categoryCode,
  });

  if (isLoading)
    return (
      <Spinner className="h-full min-h-[400px] w-full flex justify-center items-center" />
    );

  return (
    <div className="w-full flex flex-col gap-y-2">
      {data?.queryResult?.map((item) => {
        return (
          <div
            key={item?.categoryCodeLevel2}
            onClick={() => {
              return;
            }}
            className="flex flex-col gap-2 h-[100px] px-4 py-2 text-xs bg-grey-50 rounded-lg "
          >
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-orange-500">
                {item?.categoryNameLevel2}
              </span>

              <span>شکل دارویی</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OtcMedicineFamilyNames;
