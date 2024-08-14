import { IconButton } from '../IconButton';
import { MinusIconOutline, PlusIconOutline } from '../icons';
import { TextInput } from '../TextInput';
import { colorPalette } from '../theme';

type CounterProps = {
  id: string;
  handleDecrement: () => void;
  handleIncrement: () => void;
  handleChange: () => void;
  handleBlur: () => void;
};

export const Counter = ({
  id,
  handleDecrement,
  handleIncrement,
  handleChange,
  handleBlur,
}: CounterProps) => {
  return (
    <div className="flex gap-x-2 items-center justify-between">
      <IconButton handleClick={handleDecrement}>
        <MinusIconOutline
          height={20}
          width={20}
          fill={colorPalette.grey[400]}
        />
      </IconButton>
      <TextInput
        type="number"
        id={id}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <IconButton handleClick={handleIncrement}>
        <PlusIconOutline height={20} width={20} fill={colorPalette.grey[400]} />
      </IconButton>
    </div>
  );
};
