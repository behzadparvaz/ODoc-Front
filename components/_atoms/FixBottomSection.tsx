import classNames from 'classnames';

type FixBottomSectionProps = {
  children: React.ReactNode;
  className?: string;
};
const FixBottomSection = ({ children, className }: FixBottomSectionProps) => {
  return (
    <div
      className={classNames(
        'fixed bottom-0 right-1/2 translate-x-1/2 max-w-[600px] w-full border-t border-grey-200 flex justify-center items-center h-max',
        className,
      )}
    >
      {children}
    </div>
  );
};
export default FixBottomSection;
