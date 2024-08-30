import CategoryItem from '@com/_atoms/CategoryItem';

import secondSlidePNG from '@static/images/staticImages/sample-category.png';
import ScrollSlider from './ScrollSlider.nd';

const Categories = () => {
  const mockData = [
    {
      id: 1,
      name: ' داروی ضد درد',
      latinName: 'test',
      imageUrl: secondSlidePNG,
    },
    {
      id: 2,
      name: 'داروی معده',
      latinName: 'test',
      imageUrl: secondSlidePNG,
    },
    {
      id: 3,
      name: 'داروی انتی بیوتیک',
      latinName: 'test',
      imageUrl: secondSlidePNG,
    },
  ];
  return (
    <div className="flex ">
      <ScrollSlider className='px-4 gap-x-2'>
        {mockData?.map((item) => {
          return (
            <div className="w-[104px] bg-grey-100 rounded-md">
              <CategoryItem
                key={item?.id}
                imageUrl={item?.imageUrl}
                latinName={item?.latinName}
                name={item?.name}
              />
            </div>
          );
        })}
      </ScrollSlider>
    </div>
  );
};
export default Categories;
