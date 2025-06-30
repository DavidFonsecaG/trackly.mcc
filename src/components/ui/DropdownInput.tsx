import { useEffect, useRef, useState } from "react";

interface DropdownInputProps {
  label: string;
  value: string;
  options: string[];
  onSelect: (value: string) => void;
  error?: boolean;
}

const DropdownInput: React.FC<DropdownInputProps> = ({
  label,
  value,
  options,
  onSelect,
  error = false,
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <label htmlFor={label} className="block mb-2 font-medium leading-none">
        {label}
      </label>
      <input
        id={label}
        name={label}
        type="text"
        placeholder={`Select ${label.toLowerCase()}`}
        value={value}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        readOnly
        autoComplete="off"
        className={`block w-full rounded-lg px-4 h-9 bg-card border placeholder:font-normal placeholder:text-primary/50 hover:placeholder:text-primary focus:outline-none cursor-pointer ${
          error ? "border-red-300" : ""
        }`}
      />

      {open && (
        <div className="absolute top-12 w-full bg-card pb-1 rounded-b-lg border border-t-0 shadow-lg z-10">
            <div className="overflow-auto w-full max-h-22 p-1.5 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-primary/50">
            {options.map((option, index) => (
                <div
                key={index}
                className={`px-4 py-2 rounded-lg cursor-pointer ${
                    value === option 
                        ? "bg-background text-primary flex items-center justify-between" 
                        : "text-primary/50 hover:text-primary"
                }`}
                onClick={() => {
                    onSelect(option);
                    setOpen(false);
                }}
                >
                    {option}
                    {value === option && (
                    <div className="rounded-full bg-blue-500 h-2 w-2"></div>
                    )}
                </div>
            ))}
            </div>
        </div>
      )}
    </div>
  );
};

export default DropdownInput;
