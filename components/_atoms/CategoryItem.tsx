import NextImage from '@com/_core/NextImage';
import NextLink from '@com/_core/NextLink';
import classNames from 'classnames';

interface Props {
  name: string;
  className?: string;
  titleClassName?: string;
  imageClassName?: string;
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
  titleClassName = '',
  imageClassName = '',
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
      <span
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
        className={`block py-1.5 rounded-base
          ${
            isSoon &&
            "after:content-[''] after:inline-block after:absolute  after:rounded-base after:bg-gray-50 after:opacity-50 cursor-default after:rounded-xl"
          } 
          ${
            isSoon && !isHomePage
              ? 'after:w-full after:left-0 after:h-[68px] after:top-1.5'
              : 'after:top-0 after:left-2 after:h-full after:w-[calc(100%-16px)] after:rounded-md'
          }
          ${className}`}
      >
        <div className="w-full flex items-center justify-center">
          <div
            className={classNames(
              'w-[64px] h-[64px] flex justify-center items-center rounded-xl object-contain aspect-square overflow-hidden',
              alignmentType === 'center'
                ? 'justify-center'
                : 'justify-end px-3',
              imageClassName,
            )}
          >
            <NextImage
              width={64}
              height={64}
              src={imageUrl}
              alt={name}
              style={{ width: '64px', height: '64px', objectFit: 'contain' }}
            />
          </div>
        </div>
        <p
          className={classNames(
            'text-xs my-1.5 text-black font-medium truncate',
            alignmentType === 'center' ? 'text-center px-1' : 'px-3',
            titleClassName,
            isSoon && !isHomePage && 'text-content-disabled',
          )}
        >
          {name}
        </p>
      </span>
    </NextLink>
  );
};
export default CategoryItem;
