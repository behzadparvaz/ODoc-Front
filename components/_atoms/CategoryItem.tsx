import NextImage from '@com/_core/NextImage';
import NextLink from '@com/_core/NextLink';
import classNames from 'classnames';

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
        className={classNames(
          'block py-1.5 rounded-lg',
          isSoon &&
            "after:content-[''] after:w-[calc(100%-16px)] after:h-full after:inline-block after:absolute after:top-0 after:left-2 after:rounded-lg after:bg-gray-50 after:opacity-50 cursor-default",
          isSoon && !isHomePage && 'after:!w-full after:!left-0',
          className,
        )}
      >
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
