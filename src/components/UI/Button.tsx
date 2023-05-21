import React from 'react';

interface ButtonProps {
  label: string;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  disabled?: boolean;
  onClick?: () => void;
  small?: boolean;
  pagination?: boolean;
  customStyle?: string | boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  type,
  disabled,
  onClick,
  small,
  pagination,
  customStyle,
}) => {
  return (
    <button
      type={type}
      className={`border border-gray-400 rounded-full hover:bg-gray-200 transition disabled:bg-slate-300 disabled:cursor-not-allowed disabled:hover:bg-slate-300 
      ${!small ? 'px-3 py-2' : 'px-2 py-1'}
      ${!small ? 'text-md' : 'text-xs'}
      ${pagination ? 'w-[40px] h-[40px] leading-none' : ''}
      ${customStyle && customStyle}`}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
