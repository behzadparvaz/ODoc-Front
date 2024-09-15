import CategoryItem from '@com/_atoms/CategoryItem';
import { routeList } from '@routes/routeList';

import prescriptionMedicine from '@static/images/staticImages/mainCategories/prescriptionMedicine.png';
import specialPatients from '@static/images/staticImages/mainCategories/specialPatients.png';
import nonPrescriptionMedicine from '@static/images/staticImages/mainCategories/nonPrescriptionMedicine.png';
import cosmetics from '@static/images/staticImages/mainCategories/cosmetics.png';
import supplement from '@static/images/staticImages/mainCategories/supplement.png';

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
const Categories = () => {
  const categoryMockData: ICategory[] = [
    {
      title: 'داروی بیماران خاص',
      link: routeList?.prescriptionRegisteration,
      image: specialPatients,
      imageHeight: 68,
      imageWidth: 68,
      ratio: '50%',
      query:`${'?title=داروی با نسخه&type=withPr'}`,
    },
    {
      title: 'داروی با نسخه ',
      link: routeList?.prescriptionRegisteration,
      image: prescriptionMedicine,
      imageHeight: 68,
      imageWidth: 68,
      ratio: '50%',
      query:`${'?title=داروی با نسخه&type=SP'}`,
    },
    {
      title: ' داروی بدون نسخه',
      link: routeList?.otcMedicine,
      image: nonPrescriptionMedicine,
      imageHeight: 64,
      imageWidth: 64,
      ratio: '33.3333%',
    },
    {
      title: 'آرایشی بهداشتی',
      link: routeList?.homeRoute,
      image: cosmetics,
      imageHeight: 64,
      imageWidth: 64,
      isSoon: true,
      ratio: '33.3333%',
    },
    {
      title: 'مکمل',
      link: routeList?.homeRoute,
      image: supplement,
      imageHeight: 64,
      imageWidth: 64,
      isSoon: true,
      ratio: '33.3333%',
    },
  ];
  return (
    <div className="flex flex-wrap gap-y-4 w-full">
      {categoryMockData?.map((item: ICategory, index) => {
        return (
          <div
            key={index}
            style={{ width: item?.ratio }}
            className="relative px-2"
          >
            <CategoryItem
              isSoon={item?.isSoon}
              className=" bg-grey-50 w-full rounded-lg"
              link={`${item?.link}${item?.query ? item?.query : ''}`}
              imgHeight={item?.imageHeight}
              alignmentType={`${item?.ratio === '50%' ? 'between' : 'center'}`}
              imgWidth={item?.imageWidth}
              imageUrl={item?.image}
              name={item?.title}
            />
          </div>
        );
      })}
    </div>
  );
};
export default Categories;
