import { useEffect, useRef, useState } from "react";

interface FilterButtonTypes{
    searchTerm: string,
    terms: string[],
    updateSearchTerm: (term: string) => void
}

const FilterButton: React.FC<FilterButtonTypes> = ({searchTerm, terms, updateSearchTerm}) => {
    const [open, setOpen] = useState(false);

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
        <div className="relative inline-block text-left text-xs">
            <div ref={filterRef}>
                <button type="button" className="inline-flex w-full items-center justify-center gap-x-1.5 rounded-full bg-primary px-4 py-2 text-white hover:bg-primary/90 cursor-pointer" id="menu-button" aria-expanded="true" aria-haspopup="true" onClick={() => (setOpen(!open))}>
                    <span className="w-19">{searchTerm}</span>
                    <svg className="-mr-1 size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                        <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                    </svg>
                </button>

                {open && 
                    <div className="absolute right-0 mt-2 w-56 p-1.5 origin-top-right rounded-xl bg-card border shadow-lg focus:outline-hidden" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" aria-hidden={!open}>
                    {terms.map((term, index) => (
                        <div 
                            key={index} 
                            className={`block px-4 py-2 cursor-pointer rounded-lg ${searchTerm === term ? "bg-background" : "hover:bg-background "}`} role="menuitem" 
                            id="menu-item-0"
                            onClick={() => {updateSearchTerm(term); setOpen(false)}}
                        >{term}</div>
                    ))}
                    </div>
                }
            </div>
        </div>
    );
};

export default FilterButton;