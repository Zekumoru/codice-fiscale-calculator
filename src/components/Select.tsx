import { ReactNode } from "react";

interface SelectProps {
  id?: string;
  name?: string;
  label?: string;
  children?: ReactNode;
  value?: string | number;
  onChange?: (value: string) => void;
}

const Select = ({
  id,
  label,
  name,
  value,
  onChange,
  children,
}: SelectProps) => {
  return (
    <select
      className="border-2 border-gray-500 rounded p-2 flex-1"
      id={id}
      name={name}
      value={value}
      onChange={(event) => onChange?.(event.target.value)}
    >
      <option disabled>{label}</option>
      {children}
    </select>
  );
};

export default Select;
