import { SearchIconOutline } from '@com/icons';
import { generalTexts } from '@com/texts/generalTexts';
import { routeList } from '@routes/routeList';
import { debounce } from '@utilities/debounce';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useRef, useState } from 'react';

interface Props {
  className?: string;
  handleChange?: (value: string) => void;
  defualtValue: string | string[];
}

const SearchBox = ({ className = '', handleChange, defualtValue }: Props) => {
  const inputRef = useRef(null);
  const [value, setValue] = useState<any>(inputRef?.current?.value);
  const debouncedSetBody = useMemo(() => debounce(setValue, 600), []);
  const { push } = useRouter();
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
        height={24}
        width={24}
        fill={'#535454'}
      />
      <input
        defaultValue={defualtValue}
        ref={inputRef}
        onKeyUp={(e: any) => {
          e?.key === 'Enter'
            ? push({
                pathname: routeList?.search,
                query: {
                  search: e?.target?.value,
                },
              })
            : null;
        }}
        onChange={(e) => debouncedSetBody(e?.target?.value)}
        className="pr-9 pl-3 bg-grey-100 text-grey-500 placeholder:text-grey-500 font-bold w-full py-3.5 rounded-lg text-base"
        placeholder={generalTexts?.drugSearch + ' ...'}
      />
    </div>
  );
};
export default SearchBox;
