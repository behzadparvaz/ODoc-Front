import classNames from 'classnames';

type FixBottomSectionProps = {
  children: React.ReactNode;
  className?: string;
};

const FixBottomSection = ({ children, className }: FixBottomSectionProps) => {
  return (
    <div
      className={classNames(
        'fixed bottom-0 right-1/2 translate-x-1/2 max-w-[460px] w-full flex justify-center items-center h-max',
        className,
      )}
    >
      {children}
    </div>
  );
};
export default FixBottomSection;
