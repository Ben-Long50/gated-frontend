import { useContext, useEffect, useState } from 'react';
import ThemeContainer from './ThemeContainer';
import { ThemeContext } from '../contexts/ThemeContext';

const InputFieldBasic = (props) => {
  const [borderColor, setBorderColor] = useState('transparent');
  const [focus, setFocus] = useState(false);
  const [inputValue, setInputValue] = useState(props.value || null);
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
    <div className={`${props.className}`}>
      <ThemeContainer
        className={`${props.className} ml-auto`}
        chamfer="small"
        borderColor={borderColor}
      >
        <input
          className={`${props.className} text-secondary timing focus:bg-primary w-full rounded-none ${!inputValue ? 'bg-zinc-300 dark:bg-zinc-700' : 'bg-primary'} pb-2 pl-4 pt-3 text-xl outline-none clip-4`}
          type={props.type || 'text'}
          name={props.name}
          id={props.name}
          value={inputValue}
          onFocus={() => {
            setFocus(true);
          }}
          onBlur={() => {
            setFocus(false);
          }}
          onChange={(e) => {
            if (props.type === 'number') {
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
            if (props.onChange) {
              if (props.type === 'number') {
                props.onChange(Number(e.target.value));
              } else {
                props.onChange(e.target.value);
              }
            }
          }}
        />
        <label
          htmlFor={props.name}
          className={` ${errors.length > 0 ? 'text-error' : ''} ${inputValue || focus ? 'bg-primary text-accent -translate-y-6' : ''} ${!inputValue && !focus ? 'text-gray-400' : ''} timing pointer-events-none absolute left-5 top-3.5 z-20 transform cursor-text transition-all`}
        >
          {props.label}
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
