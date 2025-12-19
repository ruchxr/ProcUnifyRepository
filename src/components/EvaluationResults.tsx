import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AttributeCoverageTable } from './AttributeCoverageTable';
import { PatientJourneyTable } from './PatientJourneyTable';
import {
  ATTRIBUTE_COVERAGE_DATA,
  JOURNEY_CAPABILITY_DATA,
  SelectedSource,
} from '@/types/dataSource';

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

      <AttributeCoverageTable data={ATTRIBUTE_COVERAGE_DATA} selectedSources={selectedSources} />

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
