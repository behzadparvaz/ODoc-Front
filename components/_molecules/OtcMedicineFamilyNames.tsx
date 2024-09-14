import { useGetCategories } from '@api/category/categoryApis.rq';
import Spinner from '@com/_atoms/Spinner';
import OtcSlider from './OtcSlider';
import { useGetProductsShapes } from '@api/product/productApis.rq';

type Level2DataModel = {
  categoryCodeLevel2: string;
  categoryNameLevel2: string;
};

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

  const { data: shapesData, isLoading: isLoadingShapes } =
    useGetProductsShapes();

  if (isLoading || isLoadingShapes)
    return (
      <Spinner className="h-full min-h-[400px] w-full flex justify-center items-center" />
    );

  return (
    <div className="w-full flex flex-col gap-y-2">
      {data?.queryResult?.map((product: Level2DataModel) => (
        <OtcSlider
          key={product?.categoryCodeLevel2}
          category={product}
          shapesData={shapesData?.queryResult}
        />
      ))}
    </div>
  );
};

export default OtcMedicineFamilyNames;
