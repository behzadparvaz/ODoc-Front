import CategoryItem from '@com/_atoms/CategoryItem';
import { routeList } from '@routes/routeList';

import prescriptionMedicine from '@static/images/staticImages/mainCategories/prescriptionMedicine.png';
import nonPrescriptionMedicine from '@static/images/staticImages/mainCategories/specialPatients.png';
import specialPatients from '@static/images/staticImages/mainCategories/nonPrescriptionMedicine.png';
import cosmetics from '@static/images/staticImages/mainCategories/cosmetics.png';
import supplement from '@static/images/staticImages/mainCategories/supplement.png';
import ScrollSlider from './ScrollSlider.nd';
import { useRouter } from 'next/router';
import classNames from 'classnames';

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
      image: nonPrescriptionMedicine,
      imageHeight: 68,
      imageWidth: 68,
      ratio: '50%',
    },
    {
      title: 'داروی با نسخه ',
      link: routeList?.prescriptionRegisteration,
      image: prescriptionMedicine,
      imageHeight: 68,
      imageWidth: 68,
      ratio: '50%',
      query: `${'?title=داروی با نسخه&type=withPr'}`,
    },
    {
      title: 'داروی بیماران خاص',
      link: routeList?.prescriptionRegisteration,
      image: specialPatients,
      imageHeight: isHomePage ? 64 : 68,
      imageWidth: isHomePage ? 64 : 68,
      ratio: '33.3333%',
      query: `${'?title=داروی با نسخه&type=SP'}`,
    },
    {
      title: 'آرایشی بهداشتی',
      link: routeList?.homeRoute,
      image: cosmetics,
      imageHeight: isHomePage ? 64 : 68,
      imageWidth: isHomePage ? 64 : 68,
      isSoon: true,
      ratio: '33.3333%',
    },
    {
      title: 'مکمل',
      link: routeList?.supplementPage,
      image: supplement,
      imageHeight: isHomePage ? 64 : 68,
      imageWidth: isHomePage ? 64 : 68,
      isSoon: false,
      ratio: '33.3333%',
    },
  ];

  if (isHomePage) {
    return (
      <div className="flex flex-wrap gap-y-4 w-full py-2">
        {categoryMockData?.map((item: ICategory, index) => {
          return (
            <div
              key={index}
              style={{ width: item?.ratio }}
              className="relative px-2"
            >
              <CategoryItem
                isSoon={item?.isSoon}
                className=" bg-grey-50 w-full rounded-base"
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
