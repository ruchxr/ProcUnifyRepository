export interface DatasetInfo {
  id: string;
  name: string;
  sourceType: string;
  vendor: string;
  timeCoverage: string;
  patientCount: string;
  rowCount: string;
}

export interface AttributeConfig {
  id: string;
  name: string;
  enabled: boolean;
  strictness: 'strict' | 'broad';
  options: {
    strict: string;
    broad: string;
  };
  // Age specific
  ageRange?: number;
}

export const DEFAULT_ATTRIBUTE_CONFIGS: AttributeConfig[] = [
  {
    id: 'age',
    name: 'Age',
    enabled: true,
    strictness: 'strict',
    ageRange: 2,
    options: {
      strict: '±0 years',
      broad: '±10 years',
    },
  },
  {
    id: 'gender',
    name: 'Gender',
    enabled: true,
    strictness: 'strict',
    options: {
      strict: 'Exact match only',
      broad: 'Allow unknown / missing',
    },
  },
  {
    id: 'geography',
    name: 'Geography (ZIP / Region)',
    enabled: true,
    strictness: 'strict',
    options: {
      strict: 'ZIP5',
      broad: 'ZIP3 / State / Region',
    },
  },
  {
    id: 'hcp',
    name: 'HCP Identifier',
    enabled: true,
    strictness: 'strict',
    options: {
      strict: 'Exact NPI Match',
      broad: 'Specialty + Practice Match',
    },
  },
  {
    id: 'diagnosis',
    name: 'Diagnosis Codes',
    enabled: true,
    strictness: 'strict',
    options: {
      strict: 'Exact Code Match',
      broad: 'Family / Hierarchical Match',
    },
  },
  {
    id: 'drug',
    name: 'Drug Exposure',
    enabled: false,
    strictness: 'broad',
    options: {
      strict: 'Exact Product',
      broad: 'Therapeutic Class',
    },
  },
];

// Mock data generator for datasets
export function generateMockDatasets(sources: { type: string | null; vendor: string | null }[]): DatasetInfo[] {
  const timeRanges = [
    'Jan 2018 – Dec 2024',
    'Mar 2019 – Nov 2024',
    'Jun 2017 – Dec 2024',
    'Jan 2020 – Dec 2024',
  ];
  
  const patientCounts = ['12.4M', '8.7M', '15.2M', '5.3M', '22.1M'];
  const rowCounts = ['85M', '52M', '120M', '38M', '180M'];

  return sources
    .filter((s) => s.type && s.vendor)
    .map((source, index) => ({
      id: `dataset-${index}`,
      name: `${source.vendor} ${source.type} Dataset`,
      sourceType: source.type!,
      vendor: source.vendor!,
      timeCoverage: timeRanges[index % timeRanges.length],
      patientCount: patientCounts[index % patientCounts.length],
      rowCount: rowCounts[index % rowCounts.length],
    }));
}
