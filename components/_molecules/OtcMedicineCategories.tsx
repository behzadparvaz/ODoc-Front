import Link from 'next/link';

import { useGetCategories } from '@api/category/categoryApis.rq';
import NextImage from '@com/_core/NextImage';
import { routeList } from '@routes/routeList';

type CategoryItemsDataModel = {
  categoryNameLevel1: string;
  categoryCodeLevel1: string;
  iconLink?: string;
};

const OtcMedicineCategories = () => {
  const { data, isLoading } = useGetCategories({ level: 1 });

  if (isLoading) {
    return (
      <>
        <div className="w-full px-4 h-max grid grid-cols-2 gap-4">
          {[...Array(8).keys()].map((item, index) => (
            <div
              key={index}
              className="relative h-[104px] flex items-end px-4 py-2 rounded-lg bg-surface-secondary cursor-pointer gap-y-2 animate-pulse"
            ></div>
          ))}
        </div>

        <div className="w-full h-[200px] px-4 pb-3">
          <div className="!aspect-w-23 !aspect-h-10 bg-surface-secondary animate-pulse rounded-xl" />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="w-full px-4 h-max grid grid-cols-2 gap-4">
        {data?.queryResult?.map((item) => (
          <Link
            key={item?.categoryCodeLevel1}
            href={`${routeList?.otcMedicineProductsList}?categoryCodeLevel1=${item?.categoryCodeLevel1}`}
          >
            <div
              key={item?.categoryCodeLevel1}
              className="relative h-[104px] flex items-end px-4 py-2 rounded-lg bg-surface-secondary cursor-pointer gap-y-2"
            >
              <div className="absolute top-1 left-2 !w-[72px] !h-[72px] flex items-center justify-center overflow-hidden rounded-base">
                {item?.iconLink && (
                  <NextImage
                    src={item?.iconLink}
                    width={72}
                    height={72}
                    alt={item?.categoryNameLevel1}
                  />
                )}
              </div>

              <span className="text-sm w-full  truncate font-medium leading-6 ">
                {item?.categoryNameLevel1}
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="w-full px-4 pb-3">
        <div className="!aspect-w-23 !aspect-h-10">
          <NextImage
            src={'/images/otc-medicine-banner.png'}
            alt="fast-order"
            fill
            style={{ objectFit: 'contain' }}
          />
        </div>
      </div>
    </>
  );
};

export default OtcMedicineCategories;
