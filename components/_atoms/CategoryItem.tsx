import NextImage from '@com/_core/NextImage';
import NextLink from '@com/_core/NextLink';

interface Props {
  name: string;
  className?: string;
  imageUrl: any;
}

const CategoryItem = ({ name, imageUrl, className = '' }: Props) => {
  const url = `app/category/${name}`;
  return (
    <NextLink href={url}>
      <a className={`block py-2 rounded-lg ${className}`}>
        <NextImage width={70} height={70} src={imageUrl} alt={name} />
        <p className='text-xs text-grey-600 text-center pt-1 px-2 truncate'>{name}</p>
      </a>
    </NextLink>
  );
};
export default CategoryItem;
