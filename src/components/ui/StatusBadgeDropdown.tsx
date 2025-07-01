import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

interface StatusBadgeDropdownTypes {
  activeOption: string;
  options: string[];
  action: (option: string) => void;
}

const StatusBadgeDropdown: React.FC<StatusBadgeDropdownTypes> = ({
  activeOption,
  options,
  action,
}) => {
  const [open, setOpen] = useState(false);
  let dropdownRef = useRef<HTMLDivElement>(null);

  const colors = {
    incomplete: "bg-amber-400/5 text-amber-400 border-amber-400/15",
    complete: "bg-green-600/5 text-green-600 border-green-600/15",
    submitted: "bg-green-600/5 text-green-600 border-green-600/15",
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>, option: string) => {
    e.preventDefault();
    e.stopPropagation();
    action(option);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative text-left text-xs">
      <div ref={dropdownRef}>
        <button
          type="button"
          className={`inline-flex z-50 w-full items-center px-2 py-1 rounded-md justify-center gap-x-1.5 border-[1.5px] cursor-pointer hover:shadow-sm ${colors[activeOption as keyof typeof colors]}`}
          id="menu-button"
          aria-expanded={open}
          aria-haspopup="true"
          aria-controls="dropdown-options"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setOpen(!open);
          }}
        >
          <span className="w-19">{activeOption}</span>
          <ChevronDown className="w-4 h-4" />
        </button>

        {open && (
          <div
            id="dropdown-options"
            className="absolute right-0 mt-2 p-1.5 z-60 origin-top-right rounded-xl bg-card border shadow-lg transition-all duration-150 ease-out scale-100 opacity-100"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
          >
            {options.map((option, index) => (
              <div
                key={index}
                id={`menu-item-${option}`}
                className={`flex px-4 py-2 cursor-pointer rounded-lg gap-2 ${
                  activeOption === option
                    ? "bg-background items-center justify-between"
                    : "text-primary/50 hover:text-primary"
                }`}
                role="menuitem"
                onClick={(e) => handleClick(e, option)}
              >
                {option}
                {activeOption === option && (
                  <div className="rounded-full bg-blue-500 h-2 w-2"></div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatusBadgeDropdown;
