import NextImage from '@com/_core/NextImage';
import NextLink from '@com/_core/NextLink';

interface Props {
  name: string;
  latinName: string;
  className?: string;
  imageUrl: any;
}

const CategoryItem = ({ name, latinName, imageUrl, className = '' }: Props) => {
  const url = `category/${name}`;
  return (
    <NextLink href={url}>
      <a className={`flex flex-col items-center gap-y-1 py-2 rounded-lg ${className}`}>
        <NextImage width={70} height={70} src={imageUrl} alt={name} />
        <p className='text-xs text-grey-600'>{name}</p>
      </a>
    </NextLink>
  );
};
export default CategoryItem;
