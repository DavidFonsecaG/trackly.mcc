import { requiredDocumentsByType, type TrackerConfig } from "../types";

// Default tracker config used for new users and demo mode. Document lists are
// reused from the original hardcoded `requiredDocumentsByType`.
export const defaultTrackerConfig: TrackerConfig = {
    applicationTypes: [
        { id: "transfer-in", name: "Transfer In", color: "teal", documents: [...requiredDocumentsByType["transfer-in"]] },
        { id: "abroad-approved", name: "Abroad Approved", color: "lime", documents: [...requiredDocumentsByType["abroad-approved"]] },
        { id: "COS-approved", name: "COS Approved", color: "amber", documents: [...requiredDocumentsByType["COS-approved"]] },
        { id: "COEL", name: "COEL", color: "cyan", documents: [...requiredDocumentsByType["COEL"]] },
        { id: "domestic", name: "Domestic", color: "orange", documents: [...requiredDocumentsByType["domestic"]] },
        { id: "reinstatement", name: "Reinstatement", color: "pink", documents: [...requiredDocumentsByType["reinstatement"]] },
        { id: "abroad", name: "Abroad", color: "indigo", documents: [...requiredDocumentsByType["abroad"]] },
        { id: "COS", name: "COS", color: "blue", documents: [...requiredDocumentsByType["COS"]] },
    ],
    terms: ["Fall 2025", "Winter 2026", "Spring 2026"],
    programs: [
        "English as a Second Language",
        "Professional English",
        "English for Academic Purposes",
        "English for Healthcare",
        "AAS in Business",
        "AAS in Marketing",
        "AAS in Accounting",
        "AAS in Information Technology",
    ],
    schedules: ["4 Day - Morning", "2 Day - Morning", "3 Day - Evening"],
};
