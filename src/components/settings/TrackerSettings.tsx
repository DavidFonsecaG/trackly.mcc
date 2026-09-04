import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import type { ApplicationType, TrackerConfig } from "../../types";
import { useTrackerConfig } from "../../context/TrackerConfigContext";
import Card from "../ui/Card";
import CardBody from "../ui/CardBody";
import CardTitle from "../ui/CardTitle";
import ApplicationTypeBadge from "../ui/ApplicationTypeBadge";
import EditableStringList from "./EditableStringList";
import ColorPicker from "./ColorPicker";

interface TrackerSettingsTypes {
    setNotification?: (message: string | null) => void;
}

const TrackerSettings: React.FC<TrackerSettingsTypes> = ({ setNotification }) => {
    const { config, saveConfig } = useTrackerConfig();

    const [draft, setDraft] = useState<TrackerConfig>(config);
    const [dirty, setDirty] = useState(false);

    // Keep the draft in sync when the config (re)loads from the server.
    useEffect(() => {
        setDraft(config);
        setDirty(false);
    }, [config]);

    // All mutations go through functional updates so rapid successive edits
    // (e.g. adding a document then changing the color) never clobber each other
    // via a stale `draft` closure.
    const update = (partial: Partial<TrackerConfig>) => {
        setDraft((prev) => ({ ...prev, ...partial }));
        setDirty(true);
    };

    const updateType = (id: string, partial: Partial<ApplicationType>) => {
        setDraft((prev) => ({
            ...prev,
            applicationTypes: prev.applicationTypes.map((t) => (t.id === id ? { ...t, ...partial } : t)),
        }));
        setDirty(true);
    };

    const addType = () => {
        setDraft((prev) => ({
            ...prev,
            applicationTypes: [
                ...prev.applicationTypes,
                { id: `type-${Date.now()}`, name: "New type", color: "gray", documents: [] },
            ],
        }));
        setDirty(true);
    };

    const removeType = (id: string) => {
        setDraft((prev) => ({
            ...prev,
            applicationTypes: prev.applicationTypes.filter((t) => t.id !== id),
        }));
        setDirty(true);
    };

    const handleSave = () => {
        saveConfig(draft);
        setDirty(false);
        setNotification?.("Tracker settings saved");
    };

    const handleReset = () => {
        setDraft(config);
        setDirty(false);
    };

    return (
        <Card>
            <CardTitle title="Your Tracker" />
            <CardBody>
                {/* Application types */}
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-sm text-primary font-semibold">Application types</div>
                            <div className="text-[0.7rem] text-primary/50">Each type has its own color and checklist of documents.</div>
                        </div>
                        <button
                            type="button"
                            onClick={addType}
                            className="flex items-center gap-1 rounded-full bg-primary px-3 py-1.5 text-xs text-white hover:shadow-sm cursor-pointer"
                        >
                            <Plus className="w-3.5 h-3.5" /> Add type
                        </button>
                    </div>

                    <div className="flex flex-col gap-3">
                        {draft.applicationTypes.map((type) => (
                            <div key={type.id} className="flex flex-col gap-3 rounded-2xl border-[1.5px] border-neutral-200/60 p-4">
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex flex-1 flex-col gap-2">
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="text"
                                                value={type.name}
                                                onChange={(e) => updateType(type.id, { name: e.target.value })}
                                                placeholder="Type name"
                                                autoComplete="off"
                                                className="w-full max-w-xs px-3 h-8 rounded-full text-sm text-primary bg-card border-[1.5px] border-neutral-200/60 hover:border-neutral-300 focus:border-neutral-300 outline-none"
                                            />
                                            <ApplicationTypeBadge type={type.id} />
                                        </div>
                                        <ColorPicker value={type.color} onChange={(color) => updateType(type.id, { color })} />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => removeType(type.id)}
                                        aria-label={`Remove ${type.name}`}
                                        className="flex size-8 items-center justify-center rounded-full text-primary/40 hover:text-red-500 hover:bg-red-50 cursor-pointer"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                                <div>
                                    <div className="mb-2 text-[0.7rem] font-medium text-primary/50 uppercase tracking-wide">Documents</div>
                                    <EditableStringList
                                        items={type.documents}
                                        onChange={(documents) => updateType(type.id, { documents })}
                                        placeholder="Add document…"
                                    />
                                </div>
                            </div>
                        ))}
                        {draft.applicationTypes.length === 0 && (
                            <div className="rounded-2xl border-[1.5px] border-dashed border-neutral-200/60 p-6 text-center text-xs text-primary/40">
                                No application types yet. Add one to start tracking.
                            </div>
                        )}
                    </div>
                </div>

                {/* Simple lists */}
                <div className="flex flex-col gap-2">
                    <div className="text-sm text-primary font-semibold">Terms</div>
                    <EditableStringList items={draft.terms} onChange={(terms) => update({ terms })} placeholder="Add term…" />
                </div>

                <div className="flex flex-col gap-2">
                    <div className="text-sm text-primary font-semibold">Programs</div>
                    <EditableStringList items={draft.programs} onChange={(programs) => update({ programs })} placeholder="Add program…" />
                </div>

                <div className="flex flex-col gap-2">
                    <div className="text-sm text-primary font-semibold">Schedules</div>
                    <EditableStringList items={draft.schedules} onChange={(schedules) => update({ schedules })} placeholder="Add schedule…" />
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-2">
                    <button
                        type="button"
                        onClick={handleReset}
                        disabled={!dirty}
                        className={`rounded-full border-[1.5px] px-4 py-1.5 text-xs leading-6 ${dirty ? "border-neutral-200/60 text-primary/70 hover:text-primary cursor-pointer" : "border-neutral-200/40 text-primary/30 cursor-default"}`}
                    >
                        Discard
                    </button>
                    <button
                        type="button"
                        onClick={handleSave}
                        disabled={!dirty}
                        className={`rounded-full px-5 py-1.5 text-xs leading-6 text-white ${dirty ? "bg-primary hover:shadow-sm cursor-pointer" : "bg-primary/40 cursor-default"}`}
                    >
                        Save changes
                    </button>
                </div>
            </CardBody>
        </Card>
    );
};

export default TrackerSettings;
