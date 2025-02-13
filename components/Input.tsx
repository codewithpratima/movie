// Input.tsx (or within the same file)
import React from "react";

interface InputProps {
  label: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id: string;
  type: string;
}

const Input: React.FC<InputProps> = ({ label, value, onChange, id, type }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="text-white font-semibold mb-1">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        className="px-4 py-2 bg-gray-800 text-white rounded-md"
      />
    </div>
  );
};

export default Input;
