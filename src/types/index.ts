export interface User {
    id: string;
    email: string;
    name?: string;
};

export interface Student {
    id: string;
    name: string;
    email: string;
    applicationType: "abroad" | "COS" | "transfer-in" | "domestic" | "reinstatement" | "abroad-approved" | "COS-approved" | "COEL";
    term: string;
    program: "English as a Second Language" | "Professional English" | "English for Academic Purposes" | "English for Healthcare" | "AAS in Business" | "AAS in Marketing" | "AAS in Accounting" | "AAS in Information Technology",
    schedule: "4 Day - Morning" | "2 Day - Morning" | "3 Day - Evening",
    status: "incomplete" | "complete" | "pending";
    lastUpdated: string;
}

export interface Document {
    id: string;
    name: string;
    required: boolean;
    submitted: boolean | null;
    submissionDate?: string;
    notes?: string; 
}

export interface StudentDocument {
    studentId: string;
    documents: Document[];
}

export const requiredDocumentsByType = {
    'transfer-in': [
        'Application Form',
        'Application Fee',
        'Passport',
        'Visa',
        'I-94',
        'Transfer Request Form',
        'I-20',
        'Bank Statement',
        'Financial Support Letter',
        'Trascript',
        'Credentials',
        'Essay',
        'Test',
        'Acceptance Letter',
        'Enrollment Agreement',
    ],
    'abroad-approved': [
        'Visa',
        'I-94',
        'Enrollment Agreement',
    ],
    'COS-approved': [
        'Approval Notice',
        'Enrollment Agreement',
    ],
    'COEL': [
        'Application Form',
        'Passport',
        'Bank Statement',
        'Financial Support Letter',
        'Essay',
        'Test',
        'Acceptance Letter',
        'Enrollment Agreement',
    ],
    domestic: [
        'Application Form',
        'Application Fee',
        'ID',
        'Credentials',
        'Essay',
        'Test',
        'Acceptance Letter',
        'Enrollment Agreement',
    ],
    reinstatement: [
        'Application Form',
        'Application Fee',
        'Passport',
        'Visa',
        'I-94',
        'Transfer Request Form',
        'I-20',
        'Bank Statement',
        'Financial Support Letter',
        'Transcripts',
        'Credentials',
        'Foreign Address Form',
        'High School Attestation Form',
        'I-539 / G-28',
        'Explanation Letter',
        'Essay',
        'Test',
        'Tution',
        'Acceptance Letter',
        'Enrollment Agreement',
    ],
    abroad: [
        'Application Form',
        'Application Fee',
        'Passport',
        'Bank Statement',
        'Financial Support Letter',
        'Credentials',
        'Foreign Address Form',
        'High School Attestation Form',
        'Essay',
        'Placement Test',
        'Acceptance Letter',
    ],
    COS: [
        'Application Form',
        'Application Fee',
        'Passport',
        'Visa',
        'I-94',
        'I-20 / DS-2019',
        'Bank Statement',
        'Financial Support Letter',
        'Credentials',
        'Foreign Address Form',
        'High School Attestation Form',
        'I-539 / G-28',
        'Explanation Letter',
        'Essay',
        'Test',
        'Acceptance Letter',
    ],
} as const;