import { ChevronDown } from "lucide-react";
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
      <label className="block mb-2 font-medium leading-none">
        {label}
      </label>
      <div className="relative">
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
          className={`block w-full rounded-lg px-4 h-9 bg-card border-[1.5px] placeholder:font-normal placeholder:text-primary/50 focus:outline-none cursor-pointer pr-10 ${
            error 
            ? `border-red-300 ${!open && "hover:border-red-500 hover:placeholder:text-primary"}` 
            : `border-neutral-200/60 ${!open && "hover:border-neutral-300 hover:placeholder:text-primary"}`
          }`}
        />
        <ChevronDown className={`absolute size-4 inline-flex top-1/2 right-5 -translate-y-1/2 text-primary/50  transition duration-300 ${open && "rotate-180"}`} />
      </div>

      {open && (
        <div className={`absolute top-12 w-full bg-card pb-1 rounded-b-lg border-[1.5px] border-t-0 shadow-lg z-10 ${
          error 
          ? "border-red-300"
          : "border-neutral-200/60"
        }`}>
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
