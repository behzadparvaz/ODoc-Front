import { SearchIconOutline } from '@com/icons';
import { generalTexts } from '@com/texts/generalTexts';
import { colors } from '@configs/Theme';
import { debounce } from '@utilities/debounce';
import { useEffect, useMemo, useRef, useState } from 'react';

interface Props {
  className?: string;
  handleChange: (value: string) => void;
  defualtValue: string;
}

const SearchBox = ({ className = '', handleChange, defualtValue }: Props) => {
  const inputRef = useRef(null);
  const [value, setValue] = useState<any>(inputRef?.current?.value);
  const debouncedSetBody = useMemo(() => debounce(setValue, 600), []);

  useEffect(() => {
    handleChange(value);
    return () => {
      debouncedSetBody.cancel();
    };
  }, [inputRef?.current?.value]);
  return (
    <div className={`w-full relative ${className}`}>
      <SearchIconOutline
        className="absolute right-2 top-1/2 -translate-y-1/2"
        height={16}
        width={16}
        fill={colors?.grey[300]}
      />
      <input
        defaultValue={defualtValue}
        ref={inputRef}
        onChange={(e) => debouncedSetBody(e?.target?.value)}
        className="border pr-7 pl-3 border-grey-300 w-full py-2 rounded-md text-sm"
        placeholder={generalTexts?.drugSearch}
      />
    </div>
  );
};
export default SearchBox;
