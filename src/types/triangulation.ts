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
  // Source-type specific fields
  claimsCount?: string; // Only for Claims type
  labRecords?: string; // Only for Lab type
  shipments?: string; // Only for SP type
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
  const claimsCounts = ['68M', '42M', '96M', '30M']; // Less than total rows
  const labRecordsCounts = ['85M', '52M', '120M', '38M']; // Equal to total rows
  const shipmentsCounts = ['12.8M', '7.8M', '18M', '5.7M']; // ~15% of total rows

  return sources
    .filter((s) => s.type && s.vendor)
    .map((source, index) => {
      const baseDataset = {
        id: `dataset-${index}`,
        name: `${source.vendor} ${source.type} Dataset`,
        sourceType: source.type!,
        vendor: source.vendor!,
        timeCoverage: timeRanges[index % timeRanges.length],
        patientCount: patientCounts[index % patientCounts.length],
        hcpCount: hcpCounts[index % hcpCounts.length],
        rowCount: rowCounts[index % rowCounts.length],
      };

      // Add source-type specific fields
      if (source.type === 'Claims') {
        return {
          ...baseDataset,
          claimsCount: claimsCounts[index % claimsCounts.length],
        };
      } else if (source.type === 'Lab') {
        return {
          ...baseDataset,
          labRecords: labRecordsCounts[index % labRecordsCounts.length],
        };
      } else if (source.type === 'SP') {
        return {
          ...baseDataset,
          shipments: shipmentsCounts[index % shipmentsCounts.length],
        };
      }
      
      return baseDataset;
    });
}
 