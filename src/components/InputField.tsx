import { useContext, useEffect, useState } from 'react';
import ThemeContainer from './ThemeContainer';
import { ThemeContext } from '../contexts/ThemeContext';

const InputField = ({ field, ...props }) => {
  const [borderColor, setBorderColor] = useState('transparent');
  const [focus, setFocus] = useState(false);
  const { accentPrimary, errorPrimary } = useContext(ThemeContext);

  const handleBorder = () => {
    if (
      (field.state.value?.length === 0 || field.state.value === null) &&
      field.state.meta.errors.length === 0 &&
      !focus
    ) {
      setBorderColor('transparent');
    } else if (focus && field.state.meta.errors.length === 0) {
      setBorderColor(accentPrimary);
    } else if (field.state.meta.errors.length > 0) {
      setBorderColor(errorPrimary);
    } else if (field.state.value) {
      setBorderColor(accentPrimary);
    }
  };

  useEffect(() => {
    handleBorder();
  }, [focus, field.state]);

  return (
    <div className={`${props.className}`}>
      <ThemeContainer
        className={`${props.className} ml-auto`}
        chamfer="16"
        borderColor={borderColor}
      >
        <input
          className={`${props.className} text-secondary timing focus:bg-primary w-full rounded-none ${field.state.value?.length === 0 || !field.state.value ? 'bg-zinc-300 dark:bg-zinc-700' : 'bg-primary'} pb-2 pl-4 pt-3 outline-none clip-4`}
          type={props.type || 'text'}
          name={field.name}
          id={field.name}
          value={field.state.value}
          onFocus={() => {
            setFocus(true);
          }}
          onBlur={() => {
            setFocus(false);
          }}
          onChange={(e) => {
            if (props.type === 'number') {
              field.handleChange(Number(e.target.value));
            } else {
              field.handleChange(e.target.value);
            }
            handleBorder();
            if (props.onChange) {
              props.onChange();
            }
          }}
        />
        <label
          htmlFor={field.name}
          className={` ${field.state.meta.errors.length > 0 ? 'text-error' : ''} ${field.state.value || focus ? 'text-accent -translate-y-6' : 'text-gray-400'} timing absolute left-5 top-3.5 z-20 transform cursor-text transition-all`}
        >
          {props.label}
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

export default InputField;
