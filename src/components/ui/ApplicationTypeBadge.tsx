import { useTrackerConfig } from "../../context/TrackerConfigContext";
import { paletteColor } from "../../config/colorPalette";
import capitalizeString from "../../utils/capitalizeString";

const ApplicationTypeBadge: React.FC<{ type: string }> = ({ type }) => {
    const { getType } = useTrackerConfig();
    const appType = getType(type);

    const classes = paletteColor(appType?.color ?? "gray").badge;
    const label = appType?.name ?? capitalizeString(type);

    return (
        <span className={`w-fit px-2 py-1 rounded-md text-[0.6rem] border-[1.5px] ${classes}`}>
            {label}
        </span>
    );
};

export default ApplicationTypeBadge;
