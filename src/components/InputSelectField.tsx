import { useContext, useEffect, useRef, useState } from 'react';
import ThemeContainer from './ThemeContainer';
import { ThemeContext } from '../contexts/ThemeContext';
import { FieldApi } from '@tanstack/react-form';
import { Action } from 'src/types/action';
import { mdiChevronDown } from '@mdi/js';
import Icon from '@mdi/react';
import InputFieldBasic from './InputFieldBasic';
import Divider from './Divider';
import { Character } from 'src/types/character';

const InputSelectField = ({
  field,
  onChange,
  label,
  className,
  options,
}: {
  field?: FieldApi;
  onChange?: () => void;
  label: string;
  className?: string;
  options: Character[] | Action[] | string[];
  initialValue?: string;
}) => {
  const [borderColor, setBorderColor] = useState('transparent');
  const [focus, setFocus] = useState(false);
  const { accentPrimary, errorPrimary } = useContext(ThemeContext);
  const [query, setQuery] = useState('');

  const searchRef = useRef<HTMLInputElement | null>(null);
  const selectRef = useRef<HTMLDivElement | null>(null);

  const handleBorder = () => {
    if (
      (field.state.value?.length === 0 || field.state.value === null) &&
      field.state.meta.errors?.length === 0 &&
      !focus
    ) {
      setBorderColor('transparent');
    } else if (focus && field.state.meta.errors?.length === 0) {
      setBorderColor(accentPrimary);
    } else if (field.state.meta.errors?.length > 0) {
      setBorderColor(errorPrimary);
    } else if (field.state.value) {
      setBorderColor(accentPrimary);
    }
  };

  useEffect(() => {
    const minimizeSelect = (e: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(e.target)) {
        setFocus(false);
      }
    };

    window.addEventListener('click', minimizeSelect);

    return () => window.removeEventListener('click', minimizeSelect);
  }, []);

  useEffect(() => {
    handleBorder();
  }, [focus, field.state]);

  const optionName = (option) => {
    if (!option) return;
    if (option?.firstName) {
      return option.firstName + ' ' + option.lastName;
    } else if (option?.name) {
      return option.name
        ? option.name[0].toUpperCase() + option.name.slice(1)
        : option.name;
    } else if (typeof option === 'string') {
      return option[0].toUpperCase() + option.slice(1);
    } else return;
  };

  const filteredOptions =
    options?.filter((option) => {
      return optionName(option).toLowerCase().includes(query.toLowerCase());
    }) || [];

  return (
    <div
      ref={selectRef}
      className={`${className} relative ${focus ? 'z-50' : 'z-10'} timing flex w-full items-center`}
    >
      <ThemeContainer
        className="grow"
        chamfer="small"
        borderColor={borderColor}
      >
        <input
          ref={searchRef}
          className={`${className} text-secondary timing focus:bg-primary relative w-full rounded-none ${field.state.value?.length === 0 || !field.state.value ? 'bg-zinc-300 dark:bg-zinc-700' : 'bg-primary'} pb-2 pl-4 pr-2 pt-3 outline-none clip-4`}
          name={field.name}
          id={field.name}
          value={optionName(field.state.value)}
          onFocus={() => {
            setFocus(true);
          }}
          onChange={() => {
            handleBorder();
          }}
          readOnly
        />
        <label
          htmlFor={field.name}
          className={` ${field.state.meta.errors?.length > 0 ? 'text-error' : ''} ${field.state.value || focus ? 'bg-primary text-accent -translate-y-6' : 'text-gray-400'} timing absolute left-5 top-3.5 z-20 transform cursor-text transition-all`}
        >
          {label}
        </label>
        <div
          className={`${focus ? 'max-h-96 py-3' : 'max-h-0'} bg-secondary timing absolute left-0 top-full flex w-full translate-y-2 flex-col items-start overflow-hidden rounded-md px-3 shadow-lg shadow-zinc-950`}
        >
          <InputFieldBasic
            className="w-full"
            label="Search"
            value={query}
            onChange={(value: string) => setQuery(value)}
          />
          <Divider />
          <div className="scrollbar-secondary flex w-full flex-col overflow-y-auto">
            {filteredOptions.map((option) => (
              <button
                className="hover:bg-tertiary text-secondary w-full rounded-md p-2 text-left text-lg"
                key={optionName(option)}
                value={optionName(option)}
                onMouseDown={(e) => e.preventDefault()}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  field.handleChange(option);
                  if (onChange) {
                    onChange();
                  }
                  setFocus(false);
                  if (searchRef.current) {
                    searchRef.current.blur();
                  }
                }}
              >
                <p>{optionName(option)}</p>
              </button>
            ))}
          </div>
        </div>
        <Icon
          className="timing text-tertiary absolute right-2 top-2 size-9 rounded-full"
          path={mdiChevronDown}
          rotate={focus ? 180 : 0}
        />
      </ThemeContainer>

      {field.state.meta.errors &&
        field.state.meta.errors.map((error: string) => (
          <p
            key={error}
            className="timing text-error mt-1 text-base italic leading-5"
            role="alert"
          >
            {error}
          </p>
        ))}
    </div>
  );
};

export default InputSelectField;
