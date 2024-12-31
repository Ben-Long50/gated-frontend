import { useContext, useEffect, useState } from 'react';
import ThemeContainer from './ThemeContainer';
import { ThemeContext } from '../contexts/ThemeContext';

const InputFieldBasic = (props) => {
  const [borderColor, setBorderColor] = useState('transparent');
  const [focus, setFocus] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const { accentPrimary, errorPrimary } = useContext(ThemeContext);

  const handleBorder = () => {
    if (focus && inputValue.length === 0) {
      setBorderColor(accentPrimary);
    } else if (inputValue.length > 0) {
      setBorderColor(errorPrimary);
    } else if (inputValue.value) {
      setBorderColor(accentPrimary);
    }
  };

  useEffect(() => {
    handleBorder();
  }, []);

  return (
    <div className={`${props.className}`}>
      <ThemeContainer
        className={`${props.className} ml-auto`}
        chamfer="16"
        borderColor={borderColor}
      >
        <input
          className={`${props.className} text-secondary timing focus:bg-primary w-full rounded-none ${inputValue.length === 0 ? 'bg-zinc-300 dark:bg-zinc-700' : 'bg-primary'} pb-2 pl-4 pt-3 text-xl outline-none clip-4`}
          type={props.type || 'text'}
          name={props.name}
          id={props.name}
          value={inputValue}
          onFocus={() => {
            setFocus(true);
            handleBorder();
          }}
          onBlur={() => {
            if (inputValue.length === 0) {
              setBorderColor('transparent');
            }
            setFocus(false);
          }}
          onChange={(e) => {
            if (props.type === 'number') {
              setInputValue(Number(e.target.value));
            } else {
              setInputValue(e.target.value);
            }
            handleBorder();
            if (props.onChange) {
              props.onChange(Number(e.target.value));
            }
          }}
        />
        <label
          htmlFor={props.name}
          className={` ${inputValue.length > 0 ? 'text-error' : ''} ${inputValue || focus ? 'bg-primary text-accent -translate-y-6' : ''} ${inputValue.length === 0 && !focus ? 'text-gray-400' : ''} timing pointer-events-none absolute left-5 top-3.5 z-20 transform cursor-text transition-all`}
        >
          {props.label}
        </label>
      </ThemeContainer>
      {/* {field.state.meta.errors &&
        field.state.meta.errors.map((error: string) => (
          <p
            key={error}
            className="timing text-error mt-1 text-base italic leading-5"
            role="alert"
          >
            {error}
          </p>
        ))} */}
    </div>
  );
};

export default InputFieldBasic;
