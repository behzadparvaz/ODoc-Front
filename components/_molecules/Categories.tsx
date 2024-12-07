import { useRouter } from 'next/router';
import classNames from 'classnames';

import CategoryItem from '@com/_atoms/CategoryItem';
import { routeList } from '@routes/routeList';

import PrescriptionMedicine from '@public/images/tiles/prescriptionMedicine.png';
import NonPrescriptionMedicine from '@public/images/tiles/specialPatients.png';
import SpecialPatients from '@public/images/tiles/nonPrescriptionMedicine.png';
import Supplement from '@public/images/tiles/supplement.png';
import MotherChildSupplement from '@public/images/tiles/mother&Baby.png';
import MedicineEquipment from '@public/images/tiles/medicineEquipment.png';

import ScrollSlider from './ScrollSlider.nd';

interface ICategory {
  title: string;
  link: string;
  image: any;
  imageHeight: number;
  imageWidth: number;
  isSoon?: boolean;
  ratio: string;
  query?: string;
}

type CategoriesProps = {
  isHomePage?: boolean;
};

const Categories = ({ isHomePage }: CategoriesProps) => {
  const { pathname } = useRouter();

  const categoryMockData: ICategory[] = [
    {
      title: ' داروی بدون نسخه',
      link: routeList?.otcMedicine,
      image: NonPrescriptionMedicine,
      imageHeight: 68,
      imageWidth: 68,
      ratio: '33.3333%',
    },
    {
      title: 'داروی با نسخه ',
      link: routeList?.prescriptionRegisteration,
      image: PrescriptionMedicine,
      imageHeight: 68,
      imageWidth: 68,
      ratio: '33.3333%',
      query: `${'?title=داروی با نسخه&type=withPr'}`,
    },
    {
      title: 'داروی بیماران خاص',
      link: routeList?.prescriptionRegisteration,
      image: SpecialPatients,
      imageHeight: isHomePage ? 64 : 68,
      imageWidth: isHomePage ? 64 : 68,
      ratio: '33.3333%',
      query: `${'?title=داروی با نسخه&type=SP'}`,
    },
    {
      title: 'مادر و کودک',
      link: routeList?.motherKidProductsList,
      image: MotherChildSupplement,
      imageHeight: isHomePage ? 64 : 68,
      imageWidth: isHomePage ? 64 : 68,
      isSoon: false,
      ratio: '33.3333%',
      query: '?categoryCodeLevel1=15',
    },
    {
      title: 'مکمل',
      link: routeList?.supplementPage,
      image: Supplement,
      imageHeight: isHomePage ? 64 : 68,
      imageWidth: isHomePage ? 64 : 68,
      isSoon: false,
      ratio: '33.3333%',
    },
    {
      title: 'تجهیزات پزشکی',
      link: routeList?.equipment,
      image: MedicineEquipment,
      imageHeight: isHomePage ? 64 : 68,
      imageWidth: isHomePage ? 64 : 68,
      isSoon: false,
      ratio: '33.3333%',
    },
  ];

  if (isHomePage) {
    return (
      <div className="flex flex-wrap gap-y-4 w-full py-4 px-2">
        {categoryMockData?.map((item: ICategory, index) => {
          return (
            <div
              key={index}
              style={{ width: item?.ratio }}
              className="relative px-2"
            >
              <CategoryItem
                isSoon={item?.isSoon}
                className=" bg-grey-50 w-full rounded-md overflow-hidden"
                link={`${item?.link}${item?.query ? item?.query : ''}`}
                imgHeight={item?.imageHeight}
                alignmentType={`${item?.ratio === '50%' ? 'between' : 'center'}`}
                imgWidth={item?.imageWidth}
                imageUrl={item?.image}
                name={item?.title}
                isHomePage={isHomePage}
              />
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <ScrollSlider className="gap-x-4 py-2 px-4 h-max">
      {categoryMockData?.map((item: ICategory, index) => {
        return (
          <div
            key={index}
            style={{ minWidth: '70px', flexBasis: '17.3%' }}
            className={classNames(
              'relative text-2xs',
              pathname === item?.link && '-order-1',
            )}
          >
            <CategoryItem
              isSoon={item?.isSoon}
              className={'w-full rounded-base'}
              titleClassName="!text-[9px] !p-0 whitespace-nowrap"
              imageClassName={
                pathname === item?.link && 'border border-border-selected'
              }
              link={`${item?.link}${item?.query ? item?.query : ''}`}
              imgHeight={item?.imageHeight}
              alignmentType={'center'}
              imgWidth={item?.imageWidth}
              imageUrl={item?.image}
              name={item?.title}
            />
          </div>
        );
      })}
    </ScrollSlider>
  );
};
export default Categories;
