import React, { useMemo, useRef, useState } from 'react';
import Input, { Props as InputProps } from '@com/_atoms/Input.nd';
import classNames from 'classnames';
import useActiveElement from '@hooks/useActiveElement';

type OptionItem = { description: string | number; value: string | number };

interface AutoCompleteProps<TOption> {
  inputProps?: InputProps;
  defaultValue?: string | number;
  suggestions?: TOption[];
  getOptionLabel?: (option: TOption) => string | number;
  onSelect: (option: TOption) => void;
  onChange: InputProps['onChange'];
  className?: string;
}

const AutoComplete = <OpT extends OptionItem>({
  defaultValue,
  suggestions = [],
  getOptionLabel,
  onSelect,
  onChange,
  inputProps,
  className,
}: AutoCompleteProps<OpT>) => {
  const [text, setText] = useState(defaultValue ?? '');
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const { activeElement } = useActiveElement();
  const [isOpen, setIsOpen] = useState(false);

  const focused = useMemo(() => {
    setIsOpen(true);
    return (
      activeElement &&
      (activeElement === inputRef.current || activeElement === listRef.current)
    );
  }, [activeElement, inputRef, listRef]);

  const onClickItem = (item: OpT) => {
    onSelect?.(item);
    setText(getOptionLabel?.(item) ?? item.description);
    setIsOpen(false);
    listRef.current.blur();
  };

  return (
    <div className={classNames('flex flex-col', className)}>
      <div className="relative w-full">
        <Input
          {...inputProps}
          className={classNames(
            'shadow-md shadow-grey-100 border-grey-100 bg-white',
            isOpen && focused && suggestions.length > 0
              ? 'rounded-t-base border-b'
              : 'rounded-base',
          )}
          inputClassName="px-3 !shadow-none"
          dir={'rtl'}
          value={text}
          ref={inputRef}
          onChange={(event) => {
            setText(() => {
              onChange?.(event);
              return event.target.value;
            });
          }}
        />
        {isOpen && focused && suggestions.length > 0 && (
          <button
            dir="rtl"
            id="suggestions_list"
            ref={listRef}
            className="appearance-none w-full bg-white shadow-base px-4 pt-2 absolute max-h-52 overflow-y-auto rounded-b-base text-right"
          >
            {suggestions.map((item) => (
              <div
                key={getOptionLabel?.(item) ?? item.description}
                className="w-full [&:not(:last-child)]:border-b border-grey-100 py-2 text-xs font-light"
                onClick={(event) => {
                  onClickItem(item);
                }}
              >
                {getOptionLabel?.(item) ?? item.description}
              </div>
            ))}
          </button>
        )}
      </div>
    </div>
  );
};

export default AutoComplete;
