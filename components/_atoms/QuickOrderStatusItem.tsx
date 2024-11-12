import NextLink from '@com/_core/NextLink';

interface Props {
  icon: React.ReactElement;
  className?: string;
  title: string;
  subTitle: string;
  CTAText?: string;
  link?: string;
}

const QuickOrderStatusItem = ({
  className = '',
  icon,
  link,
  subTitle,
  title,
  CTAText,
}: Props) => {
  return (
    <div className={`w-full ${className}`}>
      <div className=" text-center border border-gray-200 rounded-base p-4 bg-white">
        {icon}
        <p className="py-2">{title}</p>
        <p className="text-gray-500 text-xs pb-4 border-b border-gray-200">
          {subTitle}
        </p>
        {link ? (
          <NextLink href={link}>
<<<<<<< HEAD
            <a className="mt-4 font-medium text-sm py-2.5 rounded-full block bg-gray-100">
=======
            <span className="mt-4 font-medium text-xs py-2.5 rounded-full block bg-gray-100">
>>>>>>> stage
              {CTAText}
            </a>
          </NextLink>
        ) : (
          <p className="pt-4 pb-2 text-gray-500 text-xs">{CTAText}</p>
        )}
      </div>
    </div>
  );
};
export default QuickOrderStatusItem;
