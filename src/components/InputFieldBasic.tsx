import { useContext, useEffect, useState } from 'react';
import ThemeContainer from './ThemeContainer';
import { ThemeContext } from '../contexts/ThemeContext';

const InputFieldBasic = ({
  className,
  type,
  name,
  onChange,
  value,
  label,
}: {
  className: string;
  type: string;
  name: string;
  onChange: (value: string) => void;
  value: string;
  label: string;
}) => {
  const [borderColor, setBorderColor] = useState('transparent');
  const [focus, setFocus] = useState(false);
  const [inputValue, setInputValue] = useState(value || '');
  const [errors, setErrors] = useState('');
  const { accentPrimary, errorPrimary } = useContext(ThemeContext);

  const handleBorder = () => {
    if (!inputValue && !focus) {
      setBorderColor('transparent');
    } else if (focus && errors.length === 0) {
      setBorderColor(accentPrimary);
    } else if (errors.length > 0) {
      setBorderColor(errorPrimary);
    } else if (inputValue) {
      setBorderColor(accentPrimary);
    }
  };

  useEffect(() => {
    handleBorder();
  }, [focus, inputValue]);

  return (
    <div className={`${className}`}>
      <ThemeContainer
        className={`${className} ml-auto`}
        chamfer="small"
        borderColor={borderColor}
      >
        <input
          className={`${className} text-secondary timing focus:bg-primary w-full rounded-none ${!inputValue ? 'bg-zinc-300 dark:bg-zinc-700' : 'bg-primary'} pb-2 pl-4 pt-3 text-xl outline-none clip-4`}
          type={type || 'text'}
          name={name}
          id={name}
          value={inputValue}
          onFocus={() => {
            setFocus(true);
          }}
          onBlur={() => {
            setFocus(false);
          }}
          onChange={(e) => {
            e.preventDefault();
            if (type === 'number') {
              setInputValue(Number(e.target.value));
              if (e.target.value < 0) {
                setErrors('Value must be a positive number');
              } else {
                setErrors('');
              }
            } else {
              setInputValue(e.target.value);
            }
            handleBorder();
            if (onChange) {
              if (type === 'number') {
                onChange(Number(e.target.value));
              } else {
                onChange(e.target.value);
              }
            }
          }}
        />
        <label
          htmlFor={name}
          className={` ${errors.length > 0 ? 'text-error' : ''} ${inputValue || focus ? 'bg-primary text-accent -translate-y-6' : ''} ${!inputValue && !focus ? 'text-gray-400' : ''} timing pointer-events-none absolute left-5 top-3.5 z-20 transform cursor-text transition-all`}
        >
          {label}
        </label>
      </ThemeContainer>
      {errors && (
        <p
          className="timing text-error mt-1 text-base italic leading-5"
          role="alert"
        >
          {errors}
        </p>
      )}
    </div>
  );
};

export default InputFieldBasic;
