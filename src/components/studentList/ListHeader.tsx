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
        <div className="flex items-center p-3 justify-between">
            <div>
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
                <button 
                    type="button" 
                    className="inline-flex size-9 items-center justify-center rounded-full bg-primary text-white text-lg cursor-pointer hover:bg-primary/90 hover:shadow-sm"
                    onClick={() => setAddStudent(true)}
                >
                    <Plus className="w-4 h-4"/>
                </button>
            </div>
        </div>
    )
};

export default ListHeader;