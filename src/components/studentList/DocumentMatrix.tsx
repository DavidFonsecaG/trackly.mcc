import { useEffect, useRef, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { useTrackerConfig } from "../../context/TrackerConfigContext";
import { type Document, type Student } from "../../types";
import ApplicationTypeBadge from "../ui/ApplicationTypeBadge";
import Tooltip from "../ui/Tooltip";
import documentCode from "../../utils/documentCode";

interface DocumentMatrixTypes {
    filteredStudents: Student[];
    handleRowClick: (student: Student) => void;
    setAddStudent: (arg: boolean) => void;
}

const DocumentMatrix: React.FC<DocumentMatrixTypes> = ({
    filteredStudents,
    handleRowClick,
    setAddStudent,
}) => {
    const {
        getStudentDocuments,
        updateDocumentStatus,
        saveStudentDocuments,
        setApplicationStatus,
    } = useAppContext();
    const { config } = useTrackerConfig();

    const [menu, setMenu] = useState<{ student: Student; x: number; y: number } | null>(null);

    // Persist edits on a short debounce, always through the latest provider
    // closure so it reads the freshest document state.
    const saveRef = useRef(saveStudentDocuments);
    saveRef.current = saveStudentDocuments;
    const dirty = useRef<Set<string>>(new Set());
    const timer = useRef<number | null>(null);

    const scheduleSave = (studentId: string) => {
        dirty.current.add(studentId);
        if (timer.current) window.clearTimeout(timer.current);
        timer.current = window.setTimeout(() => {
            dirty.current.forEach((id) => saveRef.current(id));
            dirty.current.clear();
            timer.current = null;
        }, 700);
    };

    useEffect(() => () => {
        if (timer.current) window.clearTimeout(timer.current);
    }, []);

    const handleToggle = (student: Student, doc: Document) => {
        updateDocumentStatus(student.id, doc.id, !doc.submitted, true, doc.notes);
        scheduleSave(student.id);
    };

    const handleWaive = (student: Student, doc: Document) => {
        updateDocumentStatus(student.id, doc.id, null, false, doc.notes);
        scheduleSave(student.id);
    };

    const handleCancelToggle = (student: Student) => {
        if (student.status === "cancelled") {
            const docs = getStudentDocuments(student.id) || [];
            const requiredDocs = docs.filter((d) => d.required);
            const submitted = requiredDocs.filter((d) => d.submitted);
            const status: Student["status"] =
                requiredDocs.length > 0 && submitted.length === requiredDocs.length ? "complete" : "incomplete";
            setApplicationStatus(student.id, status);
        } else {
            setApplicationStatus(student.id, "cancelled");
        }
    };

    const cellClasses = (doc: Document | undefined) => {
        if (!doc) return "bg-transparent text-primary/20 border-transparent";
        if (doc.submitted === true) return "bg-green-600/10 text-green-700 border-green-700/20 hover:bg-green-600/20";
        if (doc.submitted === false) return "bg-rose-500/10 text-rose-600 border-rose-600/20 hover:bg-rose-500/20";
        return "bg-gray-100 text-primary/40 border-gray-200 hover:bg-gray-200"; // waived / null → N/A
    };

    const cellLabel = (doc: Document | undefined) => {
        if (!doc) return "–";
        if (doc.submitted === true) return "Y";
        if (doc.submitted === false) return "N";
        return "N/A";
    };

    // One section per configured application type (in config order), keeping
    // only those with students in the current (term-filtered) list.
    const knownGroups = config.applicationTypes
        .map((type) => ({
            id: type.id,
            docNames: type.documents,
            students: filteredStudents.filter((s) => s.applicationType === type.id),
        }))
        .filter((g) => g.students.length > 0);

    // Students whose application type is no longer configured (e.g. a deleted
    // type) still get a section so they never silently disappear. Their columns
    // are the union of document names they actually carry.
    const knownIds = new Set(config.applicationTypes.map((t) => t.id));
    const leftover = filteredStudents.filter((s) => !knownIds.has(s.applicationType));
    const leftoverGroups = Object.values(
        leftover.reduce((acc, s) => {
            (acc[s.applicationType] ??= { id: s.applicationType, students: [] }).students.push(s);
            return acc;
        }, {} as Record<string, { id: string; students: Student[] }>)
    ).map((g) => {
        const names = new Set<string>();
        g.students.forEach((s) => (getStudentDocuments(s.id) || []).forEach((d) => names.add(d.name)));
        return { id: g.id, docNames: [...names], students: g.students };
    });

    const groups = [...knownGroups, ...leftoverGroups];

    if (groups.length === 0) {
        return (
            <div className="w-full">
                <div
                    onClick={() => setAddStudent(true)}
                    className="flex m-3 p-6 text-base rounded-2xl justify-center items-center ring ring-gray-100 text-primary/50 hover:bg-gray-50/70 hover:ring-gray-200 hover:text-primary cursor-pointer transition-colors"
                >
                    + Add an application
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col w-full min-w-0 gap-8 px-3">
            {groups.map(({ id, docNames, students }) => {
                return (
                    <div key={id} className="w-full">
                        <div className="flex items-center gap-2 mb-2">
                            <ApplicationTypeBadge type={id} />
                            <span className="text-xs text-primary/40">{students.length}</span>
                        </div>

                        <div className="w-full overflow-x-auto rounded-2xl border-[1.5px] border-neutral-200/60 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-primary/30">
                            <table className="text-[0.65rem] border-collapse">
                                <thead>
                                    <tr className="text-primary/50 align-bottom">
                                        <th className="sticky left-0 z-20 bg-card px-3 py-2 text-left font-normal border-b-[1.5px] border-b-neutral-200/60 min-w-44">
                                            Student
                                        </th>
                                        <th className="px-3 py-2 text-left font-normal border-b-[1.5px] border-b-neutral-200/60 whitespace-nowrap">
                                            Program
                                        </th>
                                        {docNames.map((name) => (
                                            <th
                                                key={name}
                                                className="px-1 py-2 font-normal border-b-[1.5px] border-b-neutral-200/60"
                                            >
                                                <div className="w-11 mx-auto text-center text-[0.6rem] leading-tight whitespace-nowrap" title={name}>
                                                    {documentCode(name)}
                                                </div>
                                            </th>
                                        ))}
                                        <th className="px-3 py-2 text-left font-normal border-b-[1.5px] border-b-neutral-200/60 whitespace-nowrap">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {students.map((student) => {
                                        const docs = getStudentDocuments(student.id) || [];
                                        const cancelled = student.status === "cancelled";
                                        return (
                                            <tr
                                                key={student.id}
                                                className={`border-b-[1.5px] border-b-neutral-200/60 last:border-b-0 hover:bg-gray-50/60 transition-colors ${cancelled ? "opacity-50" : ""}`}
                                            >
                                                <th
                                                    scope="row"
                                                    onClick={() => handleRowClick(student)}
                                                    className="sticky left-0 z-10 bg-card px-3 py-2 text-left font-normal cursor-pointer hover:text-primary"
                                                >
                                                    <p className={`text-xs text-primary font-semibold ${cancelled ? "line-through" : ""}`}>{student.name}</p>
                                                    <p className="font-normal text-[0.6rem] text-primary/50">{student.email}</p>
                                                </th>
                                                <td className="px-3 py-2 whitespace-nowrap">
                                                    <p className="text-primary">{student.schedule}</p>
                                                    <p className="text-primary/50">{student.program}</p>
                                                </td>
                                                {docNames.map((name) => {
                                                    const doc = docs.find((d) => d.name === name);
                                                    return (
                                                        <td key={name} className="px-1 py-1.5 text-center">
                                                            <button
                                                                type="button"
                                                                disabled={!doc}
                                                                title={doc?.notes || undefined}
                                                                onClick={() => doc && handleToggle(student, doc)}
                                                                onContextMenu={(e) => {
                                                                    e.preventDefault();
                                                                    if (doc) handleWaive(student, doc);
                                                                }}
                                                                className={`inline-flex w-11 items-center justify-center px-1 py-1 rounded-md border-[1.5px] text-[0.6rem] font-medium transition-colors ${doc ? "cursor-pointer" : "cursor-default"} ${cellClasses(doc)}`}
                                                            >
                                                                {cellLabel(doc)}
                                                            </button>
                                                        </td>
                                                    );
                                                })}
                                                <td className="px-3 py-2">
                                                    <button
                                                        type="button"
                                                        onClick={(e) => { e.stopPropagation(); setMenu({ student, x: e.clientX, y: e.clientY }); }}
                                                        className={`w-fit px-2 py-1 rounded-md text-[0.6rem] border-[1.5px] cursor-pointer whitespace-nowrap ${cancelled ? "bg-rose-500/5 text-rose-600 border-rose-600/15" : "bg-gray-100 text-primary/50 border-gray-200 hover:text-primary"}`}
                                                    >
                                                        {cancelled ? "Cancelled" : "Active"}
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );
            })}

            {menu && (
                <Tooltip
                    x={menu.x}
                    y={menu.y}
                    actions={
                        menu.student.status === "cancelled"
                            ? { Reactivate: () => handleCancelToggle(menu.student) }
                            : { "Cancel application": () => handleCancelToggle(menu.student) }
                    }
                    onClose={() => setMenu(null)}
                />
            )}
        </div>
    );
};

export default DocumentMatrix;
