import SearchBar from "./SearchBar";
import DropdownButton from "./DropdownButton";
import { Plus, List, Table } from "lucide-react";

export type TrackerView = "list" | "documents";

interface ListHeaderTypes {
    searchTerm: string;
    terms: string[];
    updateSearchTerm: (term: string) => void;
    setAddStudent: (arg0: boolean) => void;
    view: TrackerView;
    setView: (view: TrackerView) => void;
};

const ListHeader: React.FC<ListHeaderTypes> = ({
    searchTerm,
    terms,
    updateSearchTerm,
    setAddStudent,
    view,
    setView,
}) => {

    return(
        <div className="flex items-center p-3 justify-between">
            <div>
                <h2 className="md:text-xl font-semibold">Applications</h2>
            </div>
            <div className="flex gap-2">
                <div className="flex items-center rounded-full border-[1.5px] border-neutral-200/60 p-0.5">
                    <button
                        type="button"
                        aria-label="List view"
                        aria-pressed={view === "list"}
                        onClick={() => setView("list")}
                        className={`inline-flex size-8 items-center justify-center rounded-full cursor-pointer transition-colors ${view === "list" ? "bg-primary text-white" : "text-primary/50 hover:text-primary"}`}
                    >
                        <List className="w-4 h-4" />
                    </button>
                    <button
                        type="button"
                        aria-label="Documents view"
                        aria-pressed={view === "documents"}
                        onClick={() => setView("documents")}
                        className={`inline-flex size-8 items-center justify-center rounded-full cursor-pointer transition-colors ${view === "documents" ? "bg-primary text-white" : "text-primary/50 hover:text-primary"}`}
                    >
                        <Table className="w-4 h-4" />
                    </button>
                </div>
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