import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

interface FilterButtonTypes{
    searchTerm: string,
    terms: string[],
    updateSearchTerm: (term: string) => void
}

const FilterButton: React.FC<FilterButtonTypes> = ({searchTerm, terms, updateSearchTerm}) => {
    const [open, setOpen] = useState(false);

    const handleClick = (term: string) => {
        updateSearchTerm(term); 
        setOpen(false);
        localStorage.setItem("Filter", term);
    };

    let filterRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let handler = (e: MouseEvent) => {
            if(filterRef.current && !filterRef.current.contains(e.target as Node)){
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handler);
        return() => {
            document.removeEventListener("mousedown", handler);
        };
    }, []);

    return (
        <div className="relative text-left text-xs">
            <div ref={filterRef}>
                <button type="button" className="inline-flex h-9 w-full items-center justify-center gap-x-1.5 rounded-full bg-card border-[1.5px] px-4 cursor-pointer hover:shadow-sm" id="menu-button" aria-expanded="true" aria-haspopup="true" onClick={() => (setOpen(!open))}>
                    <span className="w-19">{searchTerm}</span>
                    <ChevronDown className="w-4 h-4"/>
                </button>

                {open && 
                    <div className="absolute right-0 mt-2 w-56 p-1.5 origin-top-right rounded-xl bg-card border shadow-lg focus:outline-hidden" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" aria-hidden={!open}>
                    {terms.map((term, index) => (
                        <div 
                            key={index} 
                            className={`flex px-4 py-2 cursor-pointer rounded-lg ${searchTerm === term ? "bg-background items-center justify-between" : "text-primary/50 hover:text-primary"}`} role="menuitem" 
                            id="menu-item-0"
                            onClick={() => {handleClick(term)}}
                        >{term}{searchTerm === term && <div className="rounded-full bg-blue-500 h-2 w-2"></div>}</div>
                    ))}
                    </div>
                }
            </div>
        </div>
    );
};

export default FilterButton;