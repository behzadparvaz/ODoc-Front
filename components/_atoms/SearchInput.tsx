import { SearchIconOutline } from '@com/icons';
import { generalTexts } from '@com/texts/generalTexts';
import { routeList } from '@routes/routeList';
import { debounce } from '@utilities/debounce';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useRef, useState } from 'react';

interface Props {
  title?: string;
  className?: string;
  handleChange?: (value: string) => void;
  defualtValue: string | string[];
  autoFocus?: boolean;
  isActiveEnterButton?: boolean;
}

const SearchBox = ({
  title,
  className = '',
  handleChange,
  defualtValue,
  autoFocus = false,
  isActiveEnterButton = true,
}: Props) => {
  const inputRef = useRef(null);
  const [value, setValue] = useState<any>(inputRef?.current?.value);
  const debouncedSetBody = useMemo(() => debounce(setValue, 600), []);
  const { query, push } = useRouter();

  const handlePaste = (e: React.ClipboardEvent) => {
    const target = e.target as HTMLInputElement;
    setValue(target.value);
  };

  useEffect(() => {
    handleChange(value);
    return () => {
      debouncedSetBody.cancel();
    };
  }, [inputRef?.current?.value]);

  useEffect(() => {
    if (!!defualtValue) {
      setValue(defualtValue);
    }
  }, [defualtValue]);

  useEffect(() => {
    if (autoFocus) {
      inputRef?.current?.focus();
    }
  }, [autoFocus]);

  return (
    <div className={`w-full relative h-[48px] ${className}`}>
      <SearchIconOutline
        className="absolute right-4 top-1/2 -translate-y-1/2"
        height={24}
        width={24}
        fill={'#535454'}
      />
      <input
        defaultValue={defualtValue}
        ref={inputRef}
        onKeyUp={(e: any) => {
          e?.key === 'Enter' && isActiveEnterButton
            ? push({
                pathname: routeList?.search,
                query: {
                  ...query,
                  searchText: e?.target?.value,
                },
              })
            : null;
        }}
        onChange={(e) => debouncedSetBody(e?.target?.value)}
        onPaste={handlePaste}
        className="h-[48px] pr-12 pl-3 bg-grey-100 text-grey-500 placeholder:text-grey-500 font-bold w-full py-3.5 rounded-full text-sm"
        placeholder={`${title ? title : generalTexts?.drugSearch}` + '...'}
      />
    </div>
  );
};
export default SearchBox;
