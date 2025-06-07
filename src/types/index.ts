export interface User {
    id: string;
    email: string;
    name?: string;
};

export interface Student {
    id: string;
    name: string;
    email: string;
    applicationType: "abroad" | "COS" | "transfer-in" | "domestic" | "reinstatement" | "approved-abroad" | "approved-COS";
    term: string;
    program: "English as a Second Language",
    schedule: "4 Day - Morning",
    status: "incomplete" | "complete" | "pending";
    lastUpdated: string;
}

export interface Document {
    id: string;
    name: string;
    required: boolean;
    submitted: boolean;
    submissionDate?: string;
    notes?: string; 
}

export interface StudentDocument {
    studentId: string;
    documents: Document[];
}

export const requiredDocumentsByType = {
    abroad: [
        'Application Form',
        'Application Fee',
        'Passport',
        'Diploma',
        'Bank Statement',
        'Financial Support Letter',
        'High School Attestation Form',
        'Foreign Address Form',
        'Placement Test',
    ],
    'transfer-in': [
        'Application Form',
        'Application Fee',
        'I-20',
        'Passport',
        'Visa',
        'I-94',
        'Diploma',
        'Trascript',
        'Bank Statement',
        'Financial Support Letter',
        'Placement Test',
    ],
    COS: [
        'Application Form',
        'Application Fee',
        'Passport',
        'Visa',
        'I-94',
        'Diploma',
        'Bank Statement',
        'Financial Support Letter',
        'High School Attestation Form',
        'Foreign Address Form',
        'I-539',
        'Explanation Letter',
        'Placement Test',
    ],
    domestic: [
        'Application Form',
        'Application Fee',
        'Passport',
        'Diploma',
        'Bank Statement',
        'Financial Support Letter',
        'High School Attestation Form',
        'Foreign Address Form',
        'Placement Test',
    ],
    reinstatement: [
        'Application Form',
        'Application Fee',
        'Passport',
        'Diploma',
        'Bank Statement',
        'Financial Support Letter',
        'High School Attestation Form',
        'Foreign Address Form',
        'Placement Test',
    ],
    'approved-abroad': [
        'Application Form',
        'Application Fee',
        'Passport',
        'Diploma',
        'Bank Statement',
        'Financial Support Letter',
        'High School Attestation Form',
        'Foreign Address Form',
        'Placement Test',
    ],
    'approved-COS': [
        'Application Form',
        'Application Fee',
        'Passport',
        'Diploma',
        'Bank Statement',
        'Financial Support Letter',
        'High School Attestation Form',
        'Foreign Address Form',
        'Placement Test',
    ],
} as const;