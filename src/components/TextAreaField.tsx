import { useContext, useEffect, useState } from 'react';
import ThemeContainer from './ThemeContainer';
import { ThemeContext } from '../contexts/ThemeContext';
import { FieldApi } from '@tanstack/react-form';

const TextAreaField = ({
  field,
  label,
  className,
}: {
  field: FieldApi;
  label: string;
  className?: string;
}) => {
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
    <div className="h-full min-h-[250px] grow">
      <ThemeContainer
        chamfer="small"
        className={`mx-auto h-full w-full flex-col`}
        borderColor={borderColor}
      >
        <textarea
          className={`${className} text-secondary timing focus:bg-primary scrollbar-secondary-2 h-full min-h-[250px] w-full grow rounded-none ${field.state.value?.length === 0 || field.state.value === null ? 'bg-zinc-300 dark:bg-zinc-700' : 'bg-primary'} pb-2 pl-4 pt-3 text-xl outline-none clip-4`}
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
            field.handleChange(e.target.value);
            handleBorder();
          }}
        />
        <label
          htmlFor={field.name}
          className={` ${field.state.meta.errors.length > 0 ? 'text-error' : ''} ${field.state.value || focus ? 'bg-primary text-accent -translate-y-6' : 'text-gray-400'} timing absolute left-5 top-3.5 z-20 transform cursor-text transition-all`}
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

export default TextAreaField;
