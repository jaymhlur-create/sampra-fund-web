/**
 * SAMPRA Funding Application Form - Types & Interfaces
 * Defines the complete data structure for the funding application
 */

export interface Quotation {
  id: string; // UUID or unique identifier
  quotation_name: string;
  quotation_amount: number | string; // Can be string during input or number for calculation
  quotation_file: File | null;
}

export interface ApplicationData {
  // Step 1 - Applicant Info
  step1: {
    name_surname: string;
    email: string; // Auto-filled from auth, read-only
    contact_number: string;
    alternate_number: string;
    applying_as: 'Individual' | 'Company' | '';
  };

  // Step 2 - Company Info (conditional)
  step2: {
    company_name: string;
    cipc_registration_number: string;
    cipc_document_upload: File | null;
    directors: string;
    company_postal_address: string;
    company_physical_address: string;
  };

  // Step 3 - Application Type
  step3: {
    application_type: 'Music Production' | 'Travel and Touring' | 'Festivals and Concerts' | 'Musicals' | 'Cultural Organizations' | '';
  };

  // Step 4 - Event Details
  step4: {
    event_name: string;
    event_date: string;
    venue: string;
    sampra_license: 'Yes' | 'No' | '';
    estimated_attendance: string;
  };

  // Step 5 - Project Information
  step5: {
    about_applicant: string;
    project_concept: string;
    previous_events_history: string;
    project_timeline: string;
    marketing_plan_roi: string;
  };

  // Step 6 - Document Uploads
  step6: {
    applicant_id_document: File | null;
    additional_documents: File[];
  };

  // Step 7 - Quotations
  step7: {
    quotations: Quotation[];
  };
}

export type ApplicationAction =
  | { type: 'UPDATE_STEP1'; payload: Partial<ApplicationData['step1']> }
  | { type: 'UPDATE_STEP2'; payload: Partial<ApplicationData['step2']> }
  | { type: 'UPDATE_STEP3'; payload: Partial<ApplicationData['step3']> }
  | { type: 'UPDATE_STEP4'; payload: Partial<ApplicationData['step4']> }
  | { type: 'UPDATE_STEP5'; payload: Partial<ApplicationData['step5']> }
  | { type: 'UPDATE_STEP6'; payload: Partial<ApplicationData['step6']> }
  | { type: 'ADD_QUOTATION'; payload: Quotation }
  | { type: 'REMOVE_QUOTATION'; payload: string }
  | { type: 'UPDATE_QUOTATION'; payload: { id: string; data: Partial<Quotation> } }
  | { type: 'RESET_FORM' };

export const initialApplicationData: ApplicationData = {
  step1: {
    name_surname: '',
    email: '',
    contact_number: '',
    alternate_number: '',
    applying_as: '',
  },
  step2: {
    company_name: '',
    cipc_registration_number: '',
    cipc_document_upload: null,
    directors: '',
    company_postal_address: '',
    company_physical_address: '',
  },
  step3: {
    application_type: '',
  },
  step4: {
    event_name: '',
    event_date: '',
    venue: '',
    sampra_license: '',
    estimated_attendance: '',
  },
  step5: {
    about_applicant: '',
    project_concept: '',
    previous_events_history: '',
    project_timeline: '',
    marketing_plan_roi: '',
  },
  step6: {
    applicant_id_document: null,
    additional_documents: [],
  },
  step7: {
    quotations: [],
  },
};

export const STEPS = [
  { number: 1, name: 'Applicant Info', description: 'Your details' },
  { number: 2, name: 'Company Info', description: 'Company details (if applicable)' },
  { number: 3, name: 'Application Type', description: 'Type of application' },
  { number: 4, name: 'Event Details', description: 'Event information' },
  { number: 5, name: 'Project Info', description: 'Project details' },
  { number: 6, name: 'Documents', description: 'Upload documents' },
  { number: 7, name: 'Quotations', description: 'Budget quotations' },
  { number: 8, name: 'Review & Submit', description: 'Review and submit' },
];

export const APPLICATION_TYPES = [
  'Music Production',
  'Travel and Touring',
  'Festivals and Concerts',
  'Musicals',
  'Cultural Organizations',
];
