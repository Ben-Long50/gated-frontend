import { useContext, useRef, useState } from 'react';
import ThemeContainer from './ThemeContainer';
import { ThemeContext } from '../contexts/ThemeContext';

const TextAreaField = (props) => {
  const [borderColor, setBorderColor] = useState('transparent');
  const [focus, setFocus] = useState(false);
  const [error, setError] = useState(null);
  const { accentPrimary, errorPrimary } = useContext(ThemeContext);
  const inputRef = useRef(null);

  return (
    <div className="relative">
      <ThemeContainer chamfer="16" className="clip-4" borderColor={borderColor}>
        <textarea
          ref={inputRef}
          className={`${props.className} text-secondary timing focus:bg-primary w-full resize-none bg-zinc-300 p-3 pl-4 text-xl outline-none dark:bg-zinc-700`}
          name={props.name}
          id={props.name}
          value={props.value}
          onChange={(e) => {
            props.onChange && props.onChange(e);
          }}
          minLength={props.minLength}
          onFocus={() => {
            setBorderColor(accentPrimary);
            setFocus(true);
          }}
          onBlur={() => {
            if (!error) {
              setBorderColor('transparent');
            }
            setFocus(false);
          }}
        />
      </ThemeContainer>
      <label
        className={` ${focus && error ? 'text-error' : ''} ${focus ? 'bg-primary text-accent -translate-y-6' : ''} ${inputRef.current?.value && !focus ? 'text-transparent' : ''} ${!inputRef.current?.value && !focus ? 'text-gray-400' : ''} timing absolute left-5 top-3.5 z-20 transform cursor-text transition-all`}
      >
        {props.label}
      </label>
      {error && <p className="text-error mt-2 text-sm">{error}</p>}
    </div>
  );
};

export default TextAreaField;
