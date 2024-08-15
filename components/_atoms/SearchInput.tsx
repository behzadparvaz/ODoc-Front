import { SearchIconOutline } from '@com/icons';
import { homePageTexts } from '@com/texts/homePage';
import { colors } from '@configs/Theme';
import { debounce } from '@utilities/debounce';
import { useEffect, useMemo, useRef, useState } from 'react';

interface Props {
  calssName?: string;
  handleChange: (value: string) => void;
}

const SearchBox = ({ calssName = '', handleChange }: Props) => {
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
    <div className={`w-full relative ${calssName}`}>
      <SearchIconOutline
        className="absolute right-2 top-1/2 -translate-y-1/2"
        height={16}
        width={16}
        fill={colors?.grey[300]}
      />
      <input
        ref={inputRef}
        onChange={(e) => debouncedSetBody(e?.target?.value)}
        className="border pr-7 pl-3 border-grey-300 w-full py-2 rounded-md text-sm"
        placeholder={homePageTexts?.drugSearch}
      />
    </div>
  );
};
export default SearchBox;
