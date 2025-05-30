import { FieldApi } from '@tanstack/react-form';

const InputFieldCheckbox = ({
  field,
  className,
  label,
  value,
  checked,
  onChange,
}: {
  field: FieldApi;
  className?: string;
  label: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
}) => {
  return (
    <div className={`${className} flex items-center justify-between gap-8`}>
      <label
        htmlFor={field.name}
        className={` ${field.state.meta.errors.length > 0 ? 'text-error' : 'text-secondary'} w-full grow cursor-text text-xl`}
      >
        {label}
      </label>
      <input
        className={`text-secondary timing focus:bg-primary size-8 rounded-none ${field.state.value?.length === 0 || !field.state.value ? 'bg-zinc-300 dark:bg-zinc-700' : 'bg-primary'} outline-none`}
        type="checkbox"
        name={field.name}
        id={field.name}
        value={value}
        checked={checked}
        onChange={(e) => {
          if (onChange) {
            onChange(e.target.value);
          } else {
            field.handleChange(e.target.value);
          }
        }}
      />
    </div>
  );
};

export default InputFieldCheckbox;
