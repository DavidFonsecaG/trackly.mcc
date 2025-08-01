import SearchBar from "./SearchBar";
import DropdownButton from "./DropdownButton";
import { Plus } from "lucide-react";

interface ListHeaderTypes {
    searchTerm: string;
    terms: string[];
    updateSearchTerm: (term: string) => void;
    setAddStudent: (arg0: boolean) => void;
};

const ListHeader: React.FC<ListHeaderTypes> = ({
    searchTerm,
    terms,
    updateSearchTerm,
    setAddStudent,
}) => {

    return(
        <div className="p-3 flex items-center justify-between rounded-t-3xl">
            <div className="flex flex-col gap-1">
                <h2 className="md:text-xl font-semibold">Applications</h2>
            </div>
            <div className="flex gap-2">
                <SearchBar />                        
                <DropdownButton
                    activeOption={searchTerm}
                    options={terms}
                    action={updateSearchTerm}
                    saveLocalStorage={true}
                    nameLocalStorage="Filter"
                />
                <div className="text-left text-xs">
                    <button 
                        type="button" 
                        className="inline-flex size-9 items-center justify-center rounded-full bg-primary text-white text-lg cursor-pointer hover:bg-primary/90 hover:shadow-sm"
                        onClick={() => setAddStudent(true)}
                    >
                        <Plus className="w-4 h-4"/>
                    </button>
                </div>
            </div>
        </div>
    )
};

export default ListHeader;