import { useState } from "react";
import { Plus } from "lucide-react";
import AddStudentDialog from "./AddStudentDialog";

const AddButton: React.FC = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className="text-left text-xs">
            <div>
                <button 
                    type="button" 
                    className="inline-flex size-9 items-center justify-center rounded-full bg-primary text-white text-lg cursor-pointer hover:bg-primary/90 hover:shadow-sm"
                    onClick={() => setOpen(!open)}
                >
                    <Plus className="w-4 h-4"/>
                </button>

                {open && 
                    <AddStudentDialog setOpen={setOpen}/>
                }
            </div>
        </div>
    );
};

export default AddButton;
