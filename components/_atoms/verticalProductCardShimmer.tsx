import classNames from 'classnames';

type Props = {
  className?: string;
};
const VerticalProductCardShimmer = ({ className = '' }: Props) => {
  return (
    <div
      className={classNames(
        'w-full h-full flex flex-col items-center animate-pulse p-4 gap-y-2',
        className,
      )}
    >
      <div className="w-[112px] h-[112px] bg-surface-secondary rounded-xl" />

      <div className="h-[24px] w-full bg-surface-secondary rounded-xl" />
      <div className="h-[24px] w-full bg-surface-secondary rounded-xl" />
      <div className="h-[24px] w-full bg-surface-secondary rounded-xl" />
    </div>
  );
};

export default VerticalProductCardShimmer;
