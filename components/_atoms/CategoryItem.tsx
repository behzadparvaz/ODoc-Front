import NextImage from '@com/_core/NextImage';
import NextLink from '@com/_core/NextLink';

interface Props {
  name: string;
  className?: string;
  imageUrl: any;
  handleClick?: () => void;
  imgWidth?: number;
  imgHeight?: number;
  link: string;
}

const CategoryItem = ({
  name,
  imageUrl,
  className = '',
  handleClick = null,
  imgWidth = 70,
  imgHeight = 70,
  link,
}: Props) => {
  return (
    <NextLink href={link}>
      <a
        onClick={
          handleClick
            ? (e) => {
                e?.preventDefault(), handleClick();
              }
            : null
        }
        className={`block py-3 text-center rounded-lg ${className}`}
      >
        <NextImage
          width={imgWidth}
          height={imgHeight}
          src={imageUrl}
          alt={name}
        />
        <p className="text-xs text-black font-semibold text-center py-1 px-2 truncate">
          {name}
        </p>
      </a>
    </NextLink>
  );
};
export default CategoryItem;
