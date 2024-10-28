import { MinusIconOutline, PlusIconOutline } from '@com/icons';
import { Button } from './NewButton';

const CounterControl = ({
  count,
  isLoading = false,
  onChange,
  min = 1,
  max = 100,
  unitName = '',
  className = '',
  type = 'vertical',
}) => {
  const onChangeHandler = (value) => {
    // Prevent value from going below min or above max
    if (value < min || value > max) {
      return;
    }
    onChange(value);
  };

  return (
    <div
      className={`${className} ${type === 'vertical' ? 'flex items-center justify-center' : ''} shadow-[#0000001A] shadow-xl bg-white rounded-full p-[6px]`}
    >
      {count > 0 ? (
        <>
          <button
            className="w-8 h-8 flex items-center justify-center rounded-full text-xl font-bold disabled:bg-grey-100"
            disabled={Boolean(isLoading || count >= max)}
            onClick={(event) => {
              event.stopPropagation();
              onChangeHandler(count + 1); // Increment count
            }}
          >
            <PlusIconOutline width={20} height={20} fill={'black'} />
          </button>
          <div className="flex items-center justify-center gap-1 min-w-8">
            <span className="text-sm font-medium black">{count}</span>
            <span className="text-sm font-medium black">{unitName}</span>
          </div>
          <button
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-xl font-bold disabled:bg-grey-100"
            disabled={Boolean(isLoading || count <= min)}
            onClick={(event) => {
              event.stopPropagation();
              onChangeHandler(count - 1);
            }}
          >
            <MinusIconOutline width={20} height={20} fill={'black'} />
          </button>
        </>
      ) : (
        <Button disabled>تمام شد</Button>
      )}
    </div>
  );
};

export default CounterControl;
