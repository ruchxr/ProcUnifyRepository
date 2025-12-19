import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AttributeCoverageTable } from './AttributeCoverageTable';
import { PatientJourneyTable } from './PatientJourneyTable';
import { SelectedSource } from '@/types/dataSource';

// Journey capability data - defines what journey components are supported
const JOURNEY_CAPABILITY_DATA = [
  { component: 'Diagnosis → Treatment Start', supported: 'Yes' as const, source: 'Claims + Labs' },
  { component: 'Switching Events', supported: 'Yes' as const, source: 'Claims' },
  { component: 'Persistence / Gaps', supported: 'Yes' as const, source: 'Claims' },
  { component: 'Lab-driven Milestones', supported: 'Partial' as const, source: 'Labs' },
  { component: 'Specialty Referral Flow', supported: 'Yes' as const, source: 'Claims' },
  { component: 'Adherence Proxy', supported: 'Yes' as const, source: 'Claims + SP' },
];

interface EvaluationResultsProps {
  selectedSources: SelectedSource[];
  onProceed: () => void;
}

export function EvaluationResults({ selectedSources, onProceed }: EvaluationResultsProps) {
  const validSources = selectedSources.filter((s) => s.type && s.vendor);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center gap-4 p-4 bg-secondary/50 rounded-lg border border-border">
        <div className="flex-1">
          <h3 className="font-semibold text-foreground">Evaluation Complete</h3>
          <p className="text-sm text-muted-foreground">
            Analyzed {validSources.length} data source{validSources.length !== 1 ? 's' : ''}:{' '}
            {validSources.map((s) => `${s.type} (${s.vendor})`).join(', ')}
          </p>
        </div>
      </div>

      <AttributeCoverageTable selectedSources={selectedSources} />

      <PatientJourneyTable data={JOURNEY_CAPABILITY_DATA} />

      <div className="flex justify-end pt-4 border-t border-border">
        <Button
          variant="proceed"
          size="xl"
          onClick={onProceed}
          className="gap-2"
        >
          Proceed to Patient Triangulation
          <ArrowRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
