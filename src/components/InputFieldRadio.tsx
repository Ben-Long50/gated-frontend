import { FieldApi } from '@tanstack/react-form';
import { ReactNode, useState } from 'react';

const InputFieldRadio = ({
  field,
  className,
  label,
  value,
  checked,
  children,
}: {
  field: FieldApi;
  className?: string;
  label: string;
  value: string;
  checked: boolean;
  children?: ReactNode;
}) => {
  return (
    <div className={`${className} flex items-center justify-between gap-8`}>
      <label
        htmlFor={field.name}
        className={` ${field.state.meta.errors?.length > 0 ? 'text-error' : 'text-secondary'} w-full grow cursor-text text-xl`}
      >
        {label}
      </label>
      {children}
      <input
        className={`text-secondary timing focus:bg-primary size-6 shrink-0 rounded-none ${field.state.value?.length === 0 || !field.state.value ? 'bg-zinc-300 dark:bg-zinc-700' : 'bg-primary'} outline-none`}
        type="radio"
        name={field.name}
        id={field.name}
        value={value}
        checked={checked}
        onChange={(e) => {
          field.handleChange(e.target.value);
        }}
      />
    </div>
  );
};

export default InputFieldRadio;
