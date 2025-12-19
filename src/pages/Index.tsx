import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/PageHeader';
import { SourceSelector } from '@/components/SourceSelector';
import { EvaluationResults } from '@/components/EvaluationResults';
import { SelectedSource, DataSourceType } from '@/types/dataSource';
import { toast } from '@/hooks/use-toast';

const generateId = () => Math.random().toString(36).substring(2, 9);

const Index = () => {
  const navigate = useNavigate();
  const [sources, setSources] = useState<SelectedSource[]>([
    { id: generateId(), type: null, vendor: null },
  ]);
  const [isEvaluated, setIsEvaluated] = useState(false);

  const handleAddSource = useCallback(() => {
    setSources((prev) => [...prev, { id: generateId(), type: null, vendor: null }]);
    setIsEvaluated(false);
  }, []);

  const handleRemoveSource = useCallback((id: string) => {
    setSources((prev) => prev.filter((s) => s.id !== id));
    setIsEvaluated(false);
  }, []);

  const handleUpdateSource = useCallback(
    (id: string, field: 'type' | 'vendor', value: string) => {
      setSources((prev) =>
        prev.map((s) => {
          if (s.id !== id) return s;
          if (field === 'type') {
            return { ...s, type: value as DataSourceType, vendor: null };
          }
          return { ...s, vendor: value };
        })
      );
      setIsEvaluated(false);
    },
    []
  );

  const hasValidSource = sources.some((s) => s.type && s.vendor);

  const handleEvaluate = () => {
    if (!hasValidSource) {
      toast({
        title: 'Selection Required',
        description: 'Please select at least one data source and vendor.',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Evaluation Complete',
      description: 'Data source analysis has been completed successfully.',
    });
    setIsEvaluated(true);
  };

  const handleProceed = () => {
    // Navigate to triangulation page with sources data
    navigate('/triangulation', { state: { sources } });
  };

  return (
    <div className="min-h-screen bg-background">
      <PageHeader />

      <main className="container mx-auto px-6 py-8">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Source Selection Section */}
          <section className="bg-card rounded-xl border border-border shadow-card p-6">
            <SourceSelector
              sources={sources}
              onAddSource={handleAddSource}
              onRemoveSource={handleRemoveSource}
              onUpdateSource={handleUpdateSource}
            />

            <div className="mt-6 pt-6 border-t border-border flex justify-end">
              <Button
                variant="evaluate"
                size="lg"
                onClick={handleEvaluate}
                disabled={!hasValidSource}
                className="gap-2"
              >
                <Search className="h-4 w-4" />
                Evaluate Selected Sources
              </Button>
            </div>
          </section>

          {/* Evaluation Results Section */}
          {isEvaluated && (
            <section className="bg-card rounded-xl border border-border shadow-card p-6">
              <EvaluationResults
                selectedSources={sources}
                onProceed={handleProceed}
              />
            </section>
          )}

          {/* Empty State Hint */}
          {!isEvaluated && hasValidSource && (
            <div className="text-center py-8 animate-fade-in">
              <div className="inline-flex items-center gap-2 text-muted-foreground">
                <span>Click</span>
                <span className="font-semibold text-primary">"Evaluate Selected Sources"</span>
                <span>to analyze attribute coverage</span>
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
