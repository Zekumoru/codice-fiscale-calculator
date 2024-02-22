interface TextInputProps {
  id?: string;
  name?: string;
  label?: string;
  placeholder?: string;
  value?: string;
  minLength?: number;
  maxLength?: number;
  required?: boolean;
  disabled?: boolean;
  errMessage?: string;
  onChange?: (value: string) => void;
}

const TextInput = ({
  id,
  name,
  label,
  value,
  placeholder,
  minLength,
  maxLength,
  required,
  disabled,
  errMessage,
  onChange,
}: TextInputProps) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor="surname">{label}</label>
      <input
        type="text"
        id={id}
        name={name}
        value={value}
        placeholder={placeholder}
        className="border-2 border-gray-500 rounded p-2"
        minLength={minLength}
        maxLength={maxLength}
        onChange={(event) => onChange?.(event.target.value.trimStart())}
        required={required}
        disabled={disabled}
      />
      {errMessage && (
        <p className="text-red-600 font-semibold">Error: {errMessage}</p>
      )}
    </div>
  );
};

export default TextInput;
