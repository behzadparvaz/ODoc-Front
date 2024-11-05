import classNames from 'classnames';

type Props = {
  className?: string;
};
const VerticalProductCardShimmer = ({ className = '' }: Props) => {
  return (
    <div
      className={classNames(
        'w-[120px] h-[204px] flex flex-col animate-pulse p-2 gap-y-2',
        className,
      )}
    >
      <div className="w-[112px] h-[112px] bg-surface-secondary rounded-base" />

      <div className="h-[24px] w-[112px] bg-surface-secondary rounded-base" />
      <div className="h-[24px] w-[112px] bg-surface-secondary rounded-base" />
      <div className="h-[24px] w-[112px] bg-surface-secondary rounded-base" />
    </div>
  );
};

export default VerticalProductCardShimmer;
