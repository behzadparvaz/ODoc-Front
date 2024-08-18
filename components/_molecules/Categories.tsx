import CategoryItem from '@com/_atoms/CategoryItem';

import secondSlidePNG from '@static/images/staticImages/sample-category.png';

const Categories = () => {
  const mockData = [
    {
      id: 1,
      name: ' داروی صد درد',
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
      {mockData?.map((item) => {
        return (
          <CategoryItem
            key={item?.id}
            imageUrl={item?.imageUrl}
            latinName={item?.latinName}
            name={item?.name}
            className="flex-1"
          />
        );
      }, [])}
    </div>
  );
};
export default Categories;
