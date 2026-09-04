import { Check } from "lucide-react";
import { colorNames, colorPalette } from "../../config/colorPalette";

interface ColorPickerProps {
    value: string;
    onChange: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ value, onChange }) => {
    return (
        <div className="flex flex-wrap items-center gap-1.5">
            {colorNames.map((name) => (
                <button
                    key={name}
                    type="button"
                    onClick={() => onChange(name)}
                    aria-label={name}
                    aria-pressed={value === name}
                    className={`flex size-6 items-center justify-center rounded-full ${colorPalette[name].swatch} cursor-pointer transition-transform hover:scale-110 ${value === name ? "ring-2 ring-offset-2 ring-primary" : ""}`}
                >
                    {value === name && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                </button>
            ))}
        </div>
    );
};

export default ColorPicker;
