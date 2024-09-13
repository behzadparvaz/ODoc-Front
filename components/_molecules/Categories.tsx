import CategoryItem from '@com/_atoms/CategoryItem';
import ScrollSlider from './ScrollSlider.nd';
import { routeList } from '@routes/routeList';
import medicineImage from '@static/images/staticImages/cat-medicine.png';
import pharmaceuticalSupplementImage from '@static/images/staticImages/cat-pharmaceutical-supplement.png';
import cosmeticsAndHygieneImage from '@static/images/staticImages/cat-cosmetics-and-hygiene.png';

interface ICategory {
  title: string;
  link: string;
  image: any;
  imageHeight: number;
  imageWidth: number;
}
const Categories = () => {
  const categoryMockData: ICategory[] = [
    {
      title: 'دارو',
      link: routeList?.categories,
      image: medicineImage,
      imageHeight: 54,
      imageWidth: 58,
    },
    {
      title: 'مکمل',
      link: routeList?.homeRoute,
      image: pharmaceuticalSupplementImage,
      imageHeight: 54,
      imageWidth: 84,
    },
    {
      title: 'آرایشی و بهداشتی',
      link: routeList?.homeRoute,
      image: cosmeticsAndHygieneImage,
      imageHeight: 54,
      imageWidth: 61,
    },
  ];
  return (
    <div className="flex ">
      <ScrollSlider className="px-4 gap-x-2">
        {categoryMockData?.map((item: ICategory, index) => {
          return (
            <div key={index} className="w-[104px] bg-grey-100 rounded-md">
              <CategoryItem
                link={item?.link + '?title=' + item?.title}
                imgHeight={item?.imageHeight}
                imgWidth={item?.imageWidth}
                imageUrl={item?.image}
                name={item?.title}
              />
            </div>
          );
        })}
      </ScrollSlider>
    </div>
  );
};
export default Categories;
