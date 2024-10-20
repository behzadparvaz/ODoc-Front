import NextImage from '@com/_core/NextImage';
import NextLink from '@com/_core/NextLink';

interface Props {
  name: string;
  className?: string;
  alignmentType?: 'center' | 'between';
  imageUrl: any;
  handleClick?: () => void;
  imgWidth?: number;
  imgHeight?: number;
  link: string;
  isSoon?: boolean;
  isHomePage?: boolean;
}

const CategoryItem = ({
  name,
  imageUrl,
  className = '',
  alignmentType = 'center',
  isSoon = false,
  handleClick = null,
  imgWidth = 70,
  imgHeight = 70,
  link,
  isHomePage,
}: Props) => {
  return (
    <NextLink href={link}>
      <a
        onClick={
          handleClick
            ? (e) => {
                e?.preventDefault(), handleClick();
              }
            : isSoon
              ? (e) => {
                  e?.preventDefault();
                }
              : null
        }
        className={`block py-1.5 rounded-lg ${className}`}
      >
        {isSoon ? (
          <span
            style={{ backgroundColor: '#276EF1' }}
            className={`text-xs font-light text-white px-2 py-0.5 rounded-full absolute left-1 -top-0.5 z-3 ${isHomePage && '-left-1'}`}
          >
            به زودی
          </span>
        ) : null}
        <div
          className={`flex bg-grey-50 rounded-xl ${alignmentType === 'center' ? 'justify-center' : 'justify-end px-3'}`}
        >
          <NextImage
            width={imgWidth}
            height={imgHeight}
            src={imageUrl}
            alt={name}
          />
        </div>
        <p
          className={`text-xs my-1.5 text-black truncate font-medium ${alignmentType === 'center' ? 'text-center px-1' : 'px-3'}`}
        >
          {name}
        </p>
      </a>
    </NextLink>
  );
};
export default CategoryItem;
