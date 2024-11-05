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
            "after:content-[''] after:inline-block after:absolute  after:rounded-base after:bg-gray-50 after:opacity-50 cursor-default"
          } 
          ${
            isSoon && !isHomePage
              ? 'after:w-full after:left-0 after:h-[68px] after:top-1.5'
              : 'after:top-0 after:left-2 after:h-full after:w-[calc(100%-16px)]'
          }
          ${className}`}
      >
        <div
          className={classNames(
            `flex bg-grey-50 rounded-xl ${alignmentType === 'center' ? 'justify-center' : 'justify-end px-3'}`,
            imageClassName,
          )}
        >
          <NextImage
            width={imgWidth}
            height={imgHeight}
            src={imageUrl}
            alt={name}
          />
        </div>
        <p
          className={classNames(
            'text-2xs my-1.5 text-black font-medium',
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
