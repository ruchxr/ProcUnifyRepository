export type DataSourceType = 'Claims' | 'Labs' | 'SP';

export interface DataSourceOption {
  type: DataSourceType;
  vendors: string[];
}

export interface SelectedSource {
  id: string;
  type: DataSourceType | null;
  vendor: string | null;
}

export interface AttributeCoverageByVendor {
  [vendorKey: string]: boolean;
}

export interface AttributeCoverageItem {
  attribute: string;
  coverage: AttributeCoverageByVendor;
  roleInMatching: 'High' | 'Medium';
}

export const DATA_SOURCE_OPTIONS: DataSourceOption[] = [
  {
    type: 'Claims',
    vendors: ['IQVIA', 'Optum', 'Symphony'],
  },
  {
    type: 'Labs',
    vendors: ['LabCorp', 'Quest'],
  },
  {
    type: 'SP',
    vendors: ['Symphony', 'Komodo'],
  },
];

// Attribute coverage data by vendor - defines which attributes are available for each vendor
export const VENDOR_ATTRIBUTE_COVERAGE: Record<string, Record<string, boolean>> = {
  // Claims vendors
  'IQVIA': {
    'Year of Birth': true,
    'Gender': true,
    'ZIP / State': true,
    'NPI': true,
    'ICD Diagnosis Code': true,
    'NDC (Drug Code)': true,
    'Procedure Code (CPT / HCPCS)': true,
    'Event Date (Service / Order / Fill)': true,
  },
  'Optum': {
    'Year of Birth': true,
    'Gender': true,
    'ZIP / State': true,
    'NPI': true,
    'ICD Diagnosis Code': true,
    'NDC (Drug Code)': true,
    'Procedure Code (CPT / HCPCS)': true,
    'Event Date (Service / Order / Fill)': true,
  },
  'Symphony': {
    'Year of Birth': true,
    'Gender': true,
    'ZIP / State': true,
    'NPI': true,
    'ICD Diagnosis Code': false,
    'NDC (Drug Code)': true,
    'Procedure Code (CPT / HCPCS)': false,
    'Event Date (Service / Order / Fill)': true,
  },
  // Labs vendors
  'LabCorp': {
    'Year of Birth': true,
    'Gender': true,
    'ZIP / State': false,
    'NPI': true,
    'ICD Diagnosis Code': false,
    'NDC (Drug Code)': false,
    'Procedure Code (CPT / HCPCS)': true,
    'Event Date (Service / Order / Fill)': true,
  },
  'Quest': {
    'Year of Birth': true,
    'Gender': true,
    'ZIP / State': false,
    'NPI': true,
    'ICD Diagnosis Code': false,
    'NDC (Drug Code)': false,
    'Procedure Code (CPT / HCPCS)': true,
    'Event Date (Service / Order / Fill)': true,
  },
  // SP vendors
  'Komodo': {
    'Year of Birth': true,
    'Gender': true,
    'ZIP / State': true,
    'NPI': true,
    'ICD Diagnosis Code': false,
    'NDC (Drug Code)': true,
    'Procedure Code (CPT / HCPCS)': false,
    'Event Date (Service / Order / Fill)': true,
  },
};

// Attributes with their role in matching
export const ATTRIBUTE_DEFINITIONS: { attribute: string; roleInMatching: 'High' | 'Medium' }[] = [
  { attribute: 'Year of Birth', roleInMatching: 'High' },
  { attribute: 'Gender', roleInMatching: 'High' },
  { attribute: 'ZIP / State', roleInMatching: 'Medium' },
  { attribute: 'NPI', roleInMatching: 'High' },
  { attribute: 'ICD Diagnosis Code', roleInMatching: 'Medium' },
  { attribute: 'NDC (Drug Code)', roleInMatching: 'Medium' },
  { attribute: 'Procedure Code (CPT / HCPCS)', roleInMatching: 'Medium' },
  { attribute: 'Event Date (Service / Order / Fill)', roleInMatching: 'High' },
];
