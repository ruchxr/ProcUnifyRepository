export type DataSourceType = 'Claims' | 'SP' | 'Labs' | 'EPR / EMR';

export interface DataSourceOption {
  type: DataSourceType;
  vendors: string[];
}

export interface SelectedSource {
  id: string;
  type: DataSourceType | null;
  vendor: string | null;
}

export interface AttributeCoverage {
  attribute: string;
  claims: boolean;
  emr: boolean;
  labs: boolean;
  sp: boolean;
  weight: 'High' | 'Medium' | 'Optional Boost';
}

export interface JourneyCapability {
  component: string;
  supported: 'Yes' | 'Partial' | 'No';
  source: string;
}

export const DATA_SOURCE_OPTIONS: DataSourceOption[] = [
  {
    type: 'Claims',
    vendors: ['Optum', 'IQVIA', 'Symphony', 'Merative', 'Komodo'],
  },
  {
    type: 'SP',
    vendors: ['Symphony', 'Komodo', 'IntegriChain', 'Veeva'],
  },
  {
    type: 'Labs',
    vendors: ['LabCorp', 'Quest', 'BioReference', 'Exact Sciences'],
  },
  {
    type: 'EPR / EMR',
    vendors: ['Epic', 'Cerner', 'Veradigm', 'Meditech', 'Athenahealth'],
  },
];

export const ATTRIBUTE_COVERAGE_DATA: AttributeCoverage[] = [
  { attribute: 'Patient Age', claims: true, emr: true, labs: true, sp: true, weight: 'Medium' },
  { attribute: 'Patient Gender', claims: true, emr: true, labs: true, sp: true, weight: 'Medium' },
  { attribute: 'ZIP / Geography', claims: true, emr: true, labs: false, sp: true, weight: 'High' },
  { attribute: 'HCP Identifier', claims: true, emr: true, labs: true, sp: true, weight: 'High' },
  { attribute: 'Diagnosis Codes', claims: true, emr: true, labs: false, sp: false, weight: 'Medium' },
  { attribute: 'Drug Exposure', claims: true, emr: true, labs: false, sp: true, weight: 'Optional Boost' },
  { attribute: 'Lab Results', claims: false, emr: true, labs: true, sp: false, weight: 'High' },
  { attribute: 'Dates / Timeline', claims: true, emr: true, labs: true, sp: true, weight: 'High' },
];

export const JOURNEY_CAPABILITY_DATA: JourneyCapability[] = [
  { component: 'Diagnosis → Treatment Start', supported: 'Yes', source: 'Claims + EMR' },
  { component: 'Switching Events', supported: 'Yes', source: 'Claims' },
  { component: 'Persistence / Gaps', supported: 'Yes', source: 'Claims' },
  { component: 'Lab-driven Milestones', supported: 'Partial', source: 'Labs + EMR' },
  { component: 'Specialty Referral Flow', supported: 'Yes', source: 'Claims + EMR' },
  { component: 'Adherence Proxy', supported: 'Yes', source: 'Claims' },
];
