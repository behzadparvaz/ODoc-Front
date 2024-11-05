type DividerProps = {
  className?: string;
  padding?: number | string;
};

const Divider = ({ className, padding = 4 }: DividerProps) => {
  return (
    <div className={`px-${padding}`}>
      <div className={`h-0.5 w-full bg-surface-secondary ${className || ''}`} />
    </div>
  );
};

export default Divider;
