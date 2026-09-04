import { useState } from "react";
import { Plus, X } from "lucide-react";

interface EditableStringListProps {
    items: string[];
    onChange: (items: string[]) => void;
    placeholder?: string;
}

const EditableStringList: React.FC<EditableStringListProps> = ({
    items,
    onChange,
    placeholder = "Add…",
}) => {
    const [draft, setDraft] = useState("");

    const add = () => {
        const value = draft.trim();
        if (!value || items.includes(value)) {
            setDraft("");
            return;
        }
        onChange([...items, value]);
        setDraft("");
    };

    const remove = (index: number) => {
        onChange(items.filter((_, i) => i !== index));
    };

    return (
        <div className="flex flex-wrap items-center gap-1.5">
            {items.map((item, index) => (
                <span
                    key={`${item}-${index}`}
                    className="flex items-center gap-1 pl-3 pr-1 py-1 rounded-full bg-background border-[1.5px] border-neutral-200/60 text-xs text-primary"
                >
                    {item}
                    <button
                        type="button"
                        onClick={() => remove(index)}
                        aria-label={`Remove ${item}`}
                        className="flex size-4 items-center justify-center rounded-full text-primary/40 hover:text-primary hover:bg-gray-200 cursor-pointer"
                    >
                        <X className="w-3 h-3" />
                    </button>
                </span>
            ))}
            <div className="flex items-center gap-1">
                <input
                    type="text"
                    value={draft}
                    placeholder={placeholder}
                    onChange={(e) => setDraft(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            add();
                        }
                    }}
                    autoComplete="off"
                    className="w-32 px-3 h-8 rounded-full text-xs bg-card border-[1.5px] border-dashed border-neutral-200/60 hover:border-neutral-300 focus:border-neutral-300 outline-none placeholder:text-primary/40"
                />
                <button
                    type="button"
                    onClick={add}
                    aria-label="Add"
                    className="flex size-8 items-center justify-center rounded-full bg-background text-primary/50 hover:text-primary hover:bg-gray-100 cursor-pointer"
                >
                    <Plus className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default EditableStringList;
