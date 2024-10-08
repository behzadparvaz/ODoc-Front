import classNames from 'classnames';

export interface SpinnerProps {
  className?: string;
  width?: string;
  height?: string;
  color?: string;
}

export const Spinner = ({
  className,
  color = 'bg-teal-300',
  width = 'w-3.5',
  height = 'h-3.5',
}: SpinnerProps) => {
  return (
    <div
      className={classNames(
        'flex justify-center items-center min-w-8',
        className,
      )}
    >
      <div className="spinner flex gap-x-2">
        <div className={`${width} ${height} ${color} rounded-full`} />
        <div className={`${width} ${height} ${color} rounded-full`} />
        <div className={`${width} ${height} ${color} rounded-full`} />
      </div>
    </div>
  );
};
