import { requiredDocumentsByType, type Student, type StudentDocument } from "../types";

// const createDocuments = (type: keyof typeof requiredDocumentsByType) => {

//     const requiredDocs = requiredDocumentsByType[type].map((name, index) => ({
//         id: `d${index + 1}`,
//         name,
//         required: true,
//         submitted: false,
//     }));

//     const optionalDocs = [
//         {
//             id: 'opt1',
//             name: 'Financial Support Letter',
//             required: false,
//             submitted: false,
//         }
//     ];

//     return [...requiredDocs, ...optionalDocs];
// };

export const students: Student[] = [
    {
        id: "1",
        name: "Emma Thompson",
        email: "emma.thompson@example.com",
        applicationId: "FALL25-ABRESL-001",
        applicationType: "abroad",
        term: "Fall 2025",
        program: "English as a Second Language",
        schedule: "4 Day - Morning",
        status: "incomplete",
        lastUpdated: "2025-01-15T10:30:00Z",
    },
    {
        id: "2",
        name: "Liam Johnson",
        email: "liam.johnson@example.com",
        applicationId: "FALL25-DOMESL-002",
        applicationType: "domestic",
        term: "Fall 2025",
        program: "English as a Second Language",
        schedule: "4 Day - Morning",
        status: "complete",
        lastUpdated: "2025-01-18T14:45:00Z",
    },
    {
        id: "3",
        name: "Olivia Davis",
        email: "olivia.davis@example.com",
        applicationId: "FALL25-TRNESL-003",
        applicationType: "transfer-in",
        term: "Fall 2025",
        program: "English as a Second Language",
        schedule: "4 Day - Morning",
        status: "incomplete",
        lastUpdated: "2025-01-20T09:15:00Z",
    },
    {
        id: "4",
        name: "Noah Wilson",
        email: "noah.wilson@example.com",
        applicationId: "FALL25-CSEESL-004",
        applicationType: "COS",
        term: "Fall 2025",
        program: "English as a Second Language",
        schedule: "4 Day - Morning",
        status: "incomplete",
        lastUpdated: "2025-01-14T11:20:00Z",
    },
    {
        id: "5",
        name: "Sophia Martinez",
        email: "sophia.martinez@example.com",
        applicationId: "FALL25-RSTESL-005",
        applicationType: "reinstatement",
        term: "Fall 2025",
        program: "English as a Second Language",
        schedule: "4 Day - Morning",
        status: "complete",
        lastUpdated: "2025-01-19T16:30:00Z",
    },
    {
        id: "6",
        name: "James Anderson",
        email: "james.anderson@example.com",
        applicationId: "FALL25-ABRESL-006",
        applicationType: "abroad",
        term: "Fall 2025",
        program: "English as a Second Language",
        schedule: "4 Day - Morning",
        status: "incomplete",
        lastUpdated: "2025-01-17T13:45:00Z",
    },
    {
        id: "7",
        name: "Charlotte Thomas",
        email: "charlotte.thomas@example.com",
        applicationId: "FALL25-TRNESL-007",
        applicationType: "transfer-in",
        term: "Fall 2025",
        program: "English as a Second Language",
        schedule: "4 Day - Morning",
        status: "incomplete",
        lastUpdated: "2025-01-16T10:10:00Z",
    },
    {
        id: "8",
        name: "Benjamin Taylor",
        email: "benjamin.taylor@example.com",
        applicationId: "FALL25-DOMESL-008",
        applicationType: "domestic",
        term: "Fall 2025",
        program: "English as a Second Language",
        schedule: "4 Day - Morning",
        status: "incomplete",
        lastUpdated: "2025-01-21T15:20:00Z",
    },
    {
      id: "100",
      name: "John Snow",
      email: "john.snow@example.com",
      applicationId: "SPR25-DOMESL-008",
      applicationType: "domestic",
      term: "Spring 2025",
      program: "English as a Second Language",
      schedule: "4 Day - Morning",
      status: "incomplete",
      lastUpdated: "2025-01-21T15:20:00Z",
  },
];

// export const studentDocuments: StudentDocument[] = students.map(student => ({
//     studentId: student.id,
//     documents: createDocuments(student.applicationType),
// }));

export const studentDocuments: StudentDocument[] = [
  {
    studentId: "1", // Emma — partial submission
    documents: [
      { id: "d1", name: "Application Form", required: true, submitted: true, submissionDate: "2025-01-10T09:00:00Z", notes: "Submitted via portal." },
      { id: "d2", name: "Application Fee", required: true, submitted: true, submissionDate: "2025-01-10T09:15:00Z", notes: "Paid online." },
      { id: "d3", name: "Passport", required: true, submitted: false, notes: "Student needs to renew passport." },
      { id: "d4", name: "Diploma", required: true, submitted: false, notes: "Waiting on translation." },
      { id: "d5", name: "Bank Statement", required: true, submitted: false, notes: "Will submit next week." },
      { id: "d6", name: "Financial Support Letter", required: true, submitted: false, notes: "Sponsor needs to sign." },
      { id: "d7", name: "High School Attestation Form", required: true, submitted: false, notes: "Form not yet filled out." },
      { id: "d8", name: "Foreign Address Form", required: true, submitted: false, notes: "Student requested help." },
      { id: "d9", name: "Placement Test", required: true, submitted: false, notes: "Not scheduled yet." },
    ],
  },
  {
    studentId: "2", // Liam — all submitted
    documents: [
      { id: "d1", name: "Application Form", required: true, submitted: true, submissionDate: "2025-01-05T08:00:00Z", notes: "Complete." },
      { id: "d2", name: "Application Fee", required: true, submitted: true, submissionDate: "2025-01-05T08:15:00Z", notes: "Paid in full." },
      { id: "d3", name: "Passport", required: true, submitted: true, submissionDate: "2025-01-06T10:00:00Z", notes: "Valid through 2030." },
      { id: "d4", name: "Diploma", required: true, submitted: true, submissionDate: "2025-01-06T10:30:00Z", notes: "Official copy." },
      { id: "d5", name: "Bank Statement", required: true, submitted: true, submissionDate: "2025-01-06T11:00:00Z", notes: "Verified." },
      { id: "d6", name: "Financial Support Letter", required: true, submitted: true, submissionDate: "2025-01-06T11:15:00Z", notes: "Signed and stamped." },
      { id: "d7", name: "High School Attestation Form", required: true, submitted: true, submissionDate: "2025-01-07T08:00:00Z", notes: "From principal." },
      { id: "d8", name: "Foreign Address Form", required: true, submitted: true, submissionDate: "2025-01-07T08:15:00Z", notes: "Address verified." },
      { id: "d9", name: "Placement Test", required: true, submitted: true, submissionDate: "2025-01-08T09:00:00Z", notes: "Passed level 3." },
    ],
  },
  {
    studentId: "3", // Olivia — partial submission
    documents: [
      { id: "d1", name: "Application Form", required: true, submitted: true, submissionDate: "2025-01-11T09:00:00Z", notes: "Uploaded online." },
      { id: "d2", name: "Application Fee", required: true, submitted: false, notes: "Not yet paid." },
      { id: "d3", name: "Passport", required: true, submitted: true, submissionDate: "2025-01-12T10:00:00Z", notes: "Copy scanned." },
      { id: "d4", name: "Diploma", required: true, submitted: false, notes: "Translation in progress." },
      { id: "d5", name: "Bank Statement", required: true, submitted: false, notes: "Needs updated version." },
      { id: "d6", name: "Financial Support Letter", required: true, submitted: false, notes: "Missing sponsor info." },
      { id: "d7", name: "High School Attestation Form", required: true, submitted: false, notes: "Awaiting signature." },
      { id: "d8", name: "Foreign Address Form", required: true, submitted: false, notes: "Student needs assistance." },
      { id: "d9", name: "Placement Test", required: true, submitted: false, notes: "Not scheduled yet." },
    ],
  },
  {
    studentId: "4", // Noah — none submitted
    documents: [
      { id: "d1", name: "Application Form", required: true, submitted: false, notes: "To be uploaded." },
      { id: "d2", name: "Application Fee", required: true, submitted: false, notes: "Unpaid." },
      { id: "d3", name: "Passport", required: true, submitted: false, notes: "Expired." },
      { id: "d4", name: "Diploma", required: true, submitted: false, notes: "Not received yet." },
      { id: "d5", name: "Bank Statement", required: true, submitted: false, notes: "Missing pages." },
      { id: "d6", name: "Financial Support Letter", required: true, submitted: false, notes: "Draft sent to student." },
      { id: "d7", name: "High School Attestation Form", required: true, submitted: false, notes: "Waiting for school reply." },
      { id: "d8", name: "Foreign Address Form", required: true, submitted: false, notes: "Not started." },
      { id: "d9", name: "Placement Test", required: true, submitted: false, notes: "To be scheduled." },
    ],
  },
  {
    studentId: "5", // Sophia — all submitted
    documents: [
      { id: "d1", name: "Application Form", required: true, submitted: true, submissionDate: "2025-01-05T07:00:00Z", notes: "Confirmed complete." },
      { id: "d2", name: "Application Fee", required: true, submitted: true, submissionDate: "2025-01-05T07:15:00Z", notes: "Receipt uploaded." },
      { id: "d3", name: "Passport", required: true, submitted: true, submissionDate: "2025-01-06T09:00:00Z", notes: "Clear scan." },
      { id: "d4", name: "Diploma", required: true, submitted: true, submissionDate: "2025-01-06T09:20:00Z", notes: "Original submitted." },
      { id: "d5", name: "Bank Statement", required: true, submitted: true, submissionDate: "2025-01-06T09:40:00Z", notes: "Balance sufficient." },
      { id: "d6", name: "Financial Support Letter", required: true, submitted: true, submissionDate: "2025-01-06T10:00:00Z", notes: "Signed PDF." },
      { id: "d7", name: "High School Attestation Form", required: true, submitted: true, submissionDate: "2025-01-07T08:00:00Z", notes: "Stamped by school." },
      { id: "d8", name: "Foreign Address Form", required: true, submitted: true, submissionDate: "2025-01-07T08:15:00Z", notes: "Matches passport." },
      { id: "d9", name: "Placement Test", required: true, submitted: true, submissionDate: "2025-01-08T09:00:00Z", notes: "Level 4 result." },
    ],
  },
  {
    studentId: "6", // James — partial
    documents: [
      { id: "d1", name: "Application Form", required: true, submitted: true, submissionDate: "2025-01-11T08:00:00Z", notes: "Submitted online." },
      { id: "d2", name: "Application Fee", required: true, submitted: false, notes: "Unpaid." },
      { id: "d3", name: "Passport", required: true, submitted: true, submissionDate: "2025-01-11T08:30:00Z", notes: "Clean copy." },
      { id: "d4", name: "Diploma", required: true, submitted: false, notes: "Still translating." },
      { id: "d5", name: "Bank Statement", required: true, submitted: false, notes: "Needs bank stamp." },
      { id: "d6", name: "Financial Support Letter", required: true, submitted: false, notes: "Not signed yet." },
      { id: "d7", name: "High School Attestation Form", required: true, submitted: false, notes: "Requested from school." },
      { id: "d8", name: "Foreign Address Form", required: true, submitted: false, notes: "Incomplete." },
      { id: "d9", name: "Placement Test", required: true, submitted: false, notes: "Scheduled for Friday." },
    ],
  },
  {
    studentId: "7", // Charlotte — none submitted
    documents: [
      { id: "d1", name: "Application Form", required: true, submitted: false, notes: "Missing file." },
      { id: "d2", name: "Application Fee", required: true, submitted: false, notes: "Pending payment." },
      { id: "d3", name: "Passport", required: true, submitted: false, notes: "Needs copy." },
      { id: "d4", name: "Diploma", required: true, submitted: false, notes: "Waiting for final version." },
      { id: "d5", name: "Bank Statement", required: true, submitted: false, notes: "Requested last week." },
      { id: "d6", name: "Financial Support Letter", required: true, submitted: false, notes: "Needs updated address." },
      { id: "d7", name: "High School Attestation Form", required: true, submitted: false, notes: "Still being prepared." },
      { id: "d8", name: "Foreign Address Form", required: true, submitted: false, notes: "Not uploaded." },
      { id: "d9", name: "Placement Test", required: true, submitted: false, notes: "Has not registered." },
    ],
  },
  {
    studentId: "8", // Benjamin — partial
    documents: [
      { id: "d1", name: "Application Form", required: true, submitted: true, submissionDate: "2025-01-12T10:00:00Z", notes: "Confirmed." },
      { id: "d2", name: "Application Fee", required: true, submitted: true, submissionDate: "2025-01-12T10:30:00Z", notes: "Receipt received." },
      { id: "d3", name: "Passport", required: true, submitted: false, notes: "Still pending." },
      { id: "d4", name: "Diploma", required: true, submitted: false, notes: "Will upload next week." },
      { id: "d5", name: "Bank Statement", required: true, submitted: false, notes: "Incomplete pages." },
      { id: "d6", name: "Financial Support Letter", required: true, submitted: false, notes: "Needs notarization." },
      { id: "d7", name: "High School Attestation Form", required: true, submitted: false, notes: "Awaiting confirmation." },
      { id: "d8", name: "Foreign Address Form", required: true, submitted: false, notes: "Not received." },
      { id: "d9", name: "Placement Test", required: true, submitted: false, notes: "No record yet." },
    ],
  },
];

