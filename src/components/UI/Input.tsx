import React from 'react';
import { UseFormRegister, FieldValues, FieldErrors } from 'react-hook-form';

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  onChange?: any;
}

const Input: React.FC<InputProps> = ({
  disabled,
  type,
  id,
  label,
  required,
  register,
  errors,
  placeholder,
  onChange,
}) => {
  return (
    <>
      <label className="text-sm font-medium">{label}</label>
      <hr className="h-[5px]" />
      <input
        type={type}
        className={`border rounded-xl px-3 py-2 disabled:opacity-70 disabled:cursor-not-allowed 
        ${errors[id] ? 'border-rose-500' : 'border-neutral-400'} 
        ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}`}
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder={placeholder}
        onChange={onChange}
      />
    </>
  );
};

export default Input;
