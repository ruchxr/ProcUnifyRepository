export interface DatasetInfo {
  id: string;
  name: string;
  sourceType: string;
  vendor: string;
  timeCoverage: string;
  rowCount: string;
  // Additional stats for expanded view
  patientCount: string;
  hcpCount: string;
  claimsCount?: string; // Only shown for Claims type
}

export type AgeMatchingOption = 'exact' | 'plus_minus_1' | 'plus_minus_2';
export type GeographyOption = 'zip3' | 'state';
export type HcpOption = 'exact_npi' | 'specialty' | 'hco';
export type DrugOption = 'exact_ndc' | 'brand' | 'molecule';
export type GenderOption = 'exact' | 'allow_unknown';

export interface AttributeConfig {
  id: string;
  name: string;
  enabled: boolean;
  // Specific option types per attribute
  ageOption?: AgeMatchingOption;
  geographyOption?: GeographyOption;
  hcpOption?: HcpOption;
  drugOption?: DrugOption;
  genderOption?: GenderOption;
}

export const DEFAULT_ATTRIBUTE_CONFIGS: AttributeConfig[] = [
  {
    id: 'age',
    name: 'Age Matching',
    enabled: true,
    ageOption: 'exact',
  },
  {
    id: 'geography',
    name: 'Geography Matching',
    enabled: true,
    geographyOption: 'zip3',
  },
  {
    id: 'hcp',
    name: 'HCP Matching',
    enabled: true,
    hcpOption: 'exact_npi',
  },
  {
    id: 'drug',
    name: 'Drug Matching',
    enabled: true,
    drugOption: 'exact_ndc',
  },
  {
    id: 'gender',
    name: 'Gender',
    enabled: true,
    genderOption: 'exact',
  },
];

// Mock data generator for datasets
export function generateMockDatasets(sources: { type: string | null; vendor: string | null }[]): DatasetInfo[] {
  const timeRanges = [
    '2019 – 2024',
    '2020 – 2024',
    '2018 – 2024',
    '2021 – 2024',
  ];
  
  const patientCounts = ['12.4M', '8.7M', '15.2M', '5.3M'];
  const hcpCounts = ['1.2M', '890K', '1.5M', '420K'];
  const rowCounts = ['85M', '52M', '120M', '38M'];
  const claimsCounts = ['245M', '180M', '320M', '95M'];

  return sources
    .filter((s) => s.type && s.vendor)
    .map((source, index) => ({
      id: `dataset-${index}`,
      name: `${source.vendor} ${source.type} Dataset`,
      sourceType: source.type!,
      vendor: source.vendor!,
      timeCoverage: timeRanges[index % timeRanges.length],
      patientCount: patientCounts[index % patientCounts.length],
      hcpCount: hcpCounts[index % hcpCounts.length],
      rowCount: rowCounts[index % rowCounts.length],
      claimsCount: source.type === 'Claims' ? claimsCounts[index % claimsCounts.length] : undefined,
    }));
}
