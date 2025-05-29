import { ReactNode, useContext, useEffect, useState } from 'react';
import ThemeContainer from './ThemeContainer';
import { ThemeContext } from '../contexts/ThemeContext';
import { FieldApi } from '@tanstack/react-form';

const SelectField = ({
  field,
  onChange,
  children,
  label,
  value,
  className,
}: {
  field: FieldApi;
  onChange?: () => void;
  children: ReactNode;
  label: string;
  value?: string;
  className?: string;
}) => {
  const [borderColor, setBorderColor] = useState('transparent');
  const [focus, setFocus] = useState(false);
  const { accentPrimary, errorPrimary } = useContext(ThemeContext);

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
    handleBorder();
  }, [focus, field.state]);

  return (
    <div className={`${className}`}>
      <ThemeContainer
        className="shadow-md"
        chamfer="small"
        borderColor={borderColor}
      >
        <select
          className={`${className} text-secondary timing focus:bg-primary h-[44px] w-full rounded-none clip-4 lg:h-[48px] ${field.state.value?.length === 0 || !field.state.value ? 'bg-zinc-300 dark:bg-zinc-700' : 'bg-primary'} pb-2 pl-4 pr-2 pt-3 outline-none`}
          name={field.name}
          id={field.name}
          value={value || field.state.value}
          onFocus={() => {
            setFocus(true);
          }}
          onBlur={() => {
            setFocus(false);
          }}
          onChange={(e) => {
            field.handleChange(e.target.value);
            handleBorder();
            if (onChange) {
              onChange(e);
            }
          }}
        >
          {children}
        </select>
        <label
          htmlFor={field.name}
          className={` ${field.state.meta.errors?.length > 0 ? 'text-error' : ''} ${field.state.value || focus ? 'bg-primary text-accent -translate-y-6' : 'text-gray-400'} timing absolute left-5 top-3.5 z-10 transform cursor-text transition-all`}
        >
          {label}
        </label>
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

export default SelectField;
