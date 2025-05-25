export interface User {
    id: string;
    email: string;
    name?: string;
};

export interface Student {
    id: string;
    name: string;
    email: string;
    applicationId: string;
    applicationType: "abroad" | "COS" | "transfer-in" | "domestic" | "reinstatement";
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
        'Passport',
        'Diploma',
        'Bank Statement',
        'Financial Support Letter',
        'High School Attestation Form',
        'Foreign Address Form',
        'Placement Test',
    ],
    COS: [
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
    approvedAbroad: [
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
    approvedChange: [
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