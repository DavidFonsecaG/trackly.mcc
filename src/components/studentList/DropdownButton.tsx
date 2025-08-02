import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

interface DropdownButtonTypes {
    activeOption: string;
    options: string[];
    action: (option: string) => void;
    saveLocalStorage?: boolean;
    nameLocalStorage?: string;
}

const DropdownButton: React.FC<DropdownButtonTypes> = ({
    activeOption,
    options,
    action,
    saveLocalStorage =  false,
    nameLocalStorage = null
}) => {

    const [open, setOpen] = useState(false);
    let dropdownRef = useRef<HTMLDivElement>(null);

    const handleClick = (option: string) => {
        action(option);
        setOpen(false);
        if (saveLocalStorage && nameLocalStorage) {
            localStorage.setItem(nameLocalStorage, option);
        };
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
                    className="inline-flex h-9 w-full items-center justify-center gap-x-1.5 rounded-full bg-card border-[1.5px] px-4 cursor-pointer hover:shadow-sm"
                    id="menu-button"
                    aria-expanded={open}
                    aria-haspopup="true"
                    aria-controls="dropdown-options"
                    onClick={() => setOpen(!open)}
                    >
                        <span className="w-19">{activeOption}</span>
                        <ChevronDown className="w-4 h-4" />
                </button>

                {open && (
                    <div
                        id="dropdown-options"
                        className="absolute right-0 mt-2 w-56 p-1.5 origin-top-right rounded-xl bg-card border shadow-lg transition-all duration-150 ease-out scale-100 opacity-100 focus:outline-hidden"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="menu-button"
                    >
                        {options.map((option, index) => (
                            <div
                                key={index}
                                id={`menu-item-${option}`}
                                role="menuitem"
                                onClick={() => handleClick(option)}
                                className={`flex px-4 py-2 cursor-pointer rounded-lg ${
                                    activeOption === option
                                        ? "bg-background items-center justify-between"
                                        : "text-primary/50 hover:text-primary"
                                    }`}
                            >
                                {option}
                                {activeOption === option && <div className="rounded-full bg-blue-500 h-2 w-2"></div>}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DropdownButton;
