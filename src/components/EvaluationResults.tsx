import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AttributeCoverageTable } from './AttributeCoverageTable';
import { PatientJourneyTable } from './PatientJourneyTable';
import { SelectedSource } from '@/types/dataSource';

const JOURNEY_CAPABILITY_DATA = [
  { component: 'Patient Journey Mapping', supported: 'Overall progression of patients across diagnosis, treatment, and follow-up stages' as const, source: 'Claims + Lab + SP' },
  { component: 'Treatment Eligibility & Initiation', supported: 'Identify eligible patients and track start of therapy' as const, source: 'Claims + Lab + SP' },
  { component: 'Lab-Driven Switching Signals', supported: 'Associate lab changes with subsequent treatment switches' as const, source: 'Claims + Claims' }
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

      <PatientJourneyTable data={JOURNEY_CAPABILITY_DATA}/>

      <div className="flex justify-end pt-4 border-t border-border">
        <Button
          variant="proceed"
          size="xl"
          onClick={onProceed}
          className="gap-2"
        >
          Proceed to Unification
          <ArrowRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
