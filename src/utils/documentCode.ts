// Short column codes for the documents matrix, styled after the admissions
// spreadsheet (App, Fee, Pass, FSL, AL, EA...). The full name is always kept as
// the column's tooltip. Covers every name in `requiredDocumentsByType`.
const documentCodes: Record<string, string> = {
    "Application Form": "App",
    "Application Fee": "Fee",
    "Passport": "Pass",
    "Visa": "Visa",
    "I-94": "I-94",
    "Transfer Request Form": "TRF",
    "I-20": "I-20",
    "I-20 / DS-2019": "I-20",
    "Bank Statement": "Bank",
    "Financial Support Letter": "FSL",
    "Trascript": "Trans",
    "Transcripts": "Trans",
    "Transcript": "Trans",
    "Credentials": "Cred",
    "Essay": "Essay",
    "Test": "Test",
    "Placement Test": "Place",
    "Acceptance Letter": "AL",
    "Enrollment Agreement": "EA",
    "Approval Notice": "AN",
    "ID": "ID",
    "Foreign Address Form": "FAF",
    "High School Attestation Form": "HSAF",
    "I-539 / G-28": "I-539",
    "Explanation Letter": "Expl",
    "Tution": "Tuit",
};

// Fallback for names not in the map: initials of each word, capped at 4 chars.
const fallbackCode = (name: string) =>
    name
        .split(/[\s/]+/)
        .filter(Boolean)
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 4) || name.slice(0, 4);

export const documentCode = (name: string): string => documentCodes[name] ?? fallbackCode(name);

export default documentCode;
