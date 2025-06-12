import { useContext, useEffect, useRef, useState } from 'react';
import ThemeContainer from './ThemeContainer';
import { ThemeContext } from '../contexts/ThemeContext';
import { FieldApi } from '@tanstack/react-form';
import { Action } from 'src/types/action';
import { mdiChevronDown, mdiSync } from '@mdi/js';
import Icon from '@mdi/react';
import InputFieldBasic from './InputFieldBasic';
import Divider from './Divider';
import { Character } from 'src/types/character';
import { Keyword } from 'src/types/keyword';
import BtnIcon from './buttons/BtnIcon';
import { capitalCase } from 'change-case';
import { Campaign } from 'src/types/campaign';

type onChangeArg = Character | Action | Keyword | Campaign | string;

const InputSelectField = ({
  field,
  onChange,
  label,
  className,
  options,
}: {
  field: FieldApi;
  label: string;
  options: any[];
  onChange?: (value: onChangeArg) => void;
  className?: string;
}) => {
  const [borderColor, setBorderColor] = useState('transparent');
  const [focus, setFocus] = useState(false);
  const { accentPrimary, errorPrimary } = useContext(ThemeContext);
  const [query, setQuery] = useState('');

  const inputRef = useRef<HTMLInputElement | null>(null);
  const selectRef = useRef<HTMLDivElement | null>(null);

  const handleBorder = () => {
    if (
      !inputRef.current?.value &&
      field?.state.meta.errors?.length === 0 &&
      !focus
    ) {
      setBorderColor('transparent');
    } else if (focus && field?.state.meta.errors?.length === 0) {
      setBorderColor(accentPrimary);
    } else if (field?.state.meta.errors?.length > 0) {
      setBorderColor(errorPrimary);
    } else if (field.state.value) {
      setBorderColor(accentPrimary);
    }
  };

  useEffect(() => {
    const minimizeSelect = (e) => {
      if (selectRef.current && !selectRef.current.contains(e.target)) {
        setFocus(false);
      }
    };

    document.addEventListener('click', minimizeSelect);

    return () => document.removeEventListener('click', minimizeSelect);
  }, []);

  useEffect(() => {
    handleBorder();
  }, [focus, field.state]);

  const optionName = (option: any) => {
    if (!option) return '';
    if (option?.firstName) {
      return option.firstName + ' ' + option.lastName;
    } else if (option?.name) {
      return capitalCase(option.name);
    } else if (typeof option === 'number') {
      return option.toString();
    } else if (typeof option === 'string') {
      return capitalCase(option);
    } else return '';
  };

  const filteredOptions =
    options?.filter((item) => {
      return item
        ? optionName(item).toLowerCase().includes(query.toLowerCase())
        : '';
    }) || [];

  return (
    <div
      ref={selectRef}
      className={`${className} ${focus ? 'z-50' : 'z-10'} timing relative flex w-full items-center`}
    >
      <ThemeContainer
        className="grow"
        chamfer="small"
        borderColor={borderColor}
      >
        <input
          ref={inputRef}
          className={`${field.state.value ? 'bg-primary' : 'bg-zinc-300 dark:bg-zinc-700'} text-secondary timing focus:bg-primary relative w-full rounded-none pb-2 pl-4 pr-2 pt-3 outline-none clip-4`}
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
          htmlFor={field?.name}
          className={` ${field.state.meta.errors?.length > 0 ? 'text-error' : ''} ${field.state.value || focus ? 'bg-primary text-accent -translate-y-6' : 'text-gray-400'} timing absolute left-5 top-3.5 z-20 transform cursor-text transition-all`}
        >
          {label}
        </label>
        <div
          className={`${focus ? 'max-h-96 py-3' : 'max-h-0'} bg-secondary timing absolute left-0 top-full flex w-full translate-y-2 flex-col items-start overflow-hidden rounded-md px-3 shadow-lg shadow-zinc-950`}
        >
          <div className="flex w-full items-center gap-4">
            <InputFieldBasic
              className="w-full"
              label="Search"
              value={query}
              onChange={(value: string) => setQuery(value)}
            />
            <BtnIcon
              path={mdiSync}
              active={true}
              onClick={() => {
                if (field) {
                  field?.handleChange('');
                }
                if (onChange) {
                  onChange('');
                }
                setFocus(false);
                if (inputRef.current) {
                  inputRef.current.blur();
                }
              }}
            />
          </div>

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
                  if (field) {
                    field?.handleChange(option);
                  }
                  if (onChange) {
                    onChange(option);
                  }
                  setFocus(false);
                  if (inputRef.current) {
                    inputRef.current.blur();
                  }
                }}
              >
                <p>{optionName(option)}</p>
              </button>
            ))}
          </div>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            setFocus(!focus);
          }}
        >
          <Icon
            className="timing text-tertiary absolute right-2 top-2 size-9 rounded-full"
            path={mdiChevronDown}
            rotate={focus ? 180 : 0}
          />
        </button>
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
