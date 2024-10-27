import classNames from 'classnames';

enum BottomType {
  SINGLEACTION = 'singleAction',
  TWOACTIONVERTIVAL = 'twoActionVertical',
  TWOACTIONHORIZONTAL = 'twoActionHorizontal',
  THREEACTION = 'threeAction',
  PRICE = 'price',
}

type ActionBarProps = {
  type?:
    | 'singleAction'
    | 'twoActionVertical'
    | 'twoActionHorizontal'
    | 'threeAction'
    | 'price';
  children: React.ReactNode;
  className?: string;
  hasDivider?: boolean;
};

const ActionBar = ({
  type,
  children,
  hasDivider,
  className,
}: ActionBarProps) => {
  const renderClassnames = () => {
    switch (type) {
      case BottomType.SINGLEACTION:
        return 'h-[84px] p-4';
      case BottomType.TWOACTIONVERTIVAL:
        return 'h-[148px] p-4 flex-col gap-y-3';
      case BottomType.TWOACTIONHORIZONTAL:
        return 'h-[84px] p-4 gap-x-2';
      case BottomType.THREEACTION:
        return 'h-[212px] p-4 flex-col gap-y-3';
      case BottomType.PRICE:
        return 'h-[120px] p-4 flex-col gap-y-3';
    }
  };

  return (
    <div
      className={classNames(
        'fixed bottom-0 right-1/2 translate-x-1/2 max-w-[460px] w-full flex bg-surface-primary',
        hasDivider && 'border-t border-border-primary',
        className,
        renderClassnames(),
      )}
    >
      {children}
    </div>
  );
};

export default ActionBar;
