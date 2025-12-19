import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Play, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/PageHeader';
import { DatasetCard } from '@/components/DatasetCard';
import { ConfidenceMeter } from '@/components/ConfidenceMeter';
import { AdvancedAttributeControls } from '@/components/AdvancedAttributeControls';
import {
  DatasetInfo,
  AttributeConfig,
  DEFAULT_ATTRIBUTE_CONFIGS,
  generateMockDatasets,
} from '@/types/triangulation';
import { toast } from '@/hooks/use-toast';

interface LocationState {
  sources?: { type: string | null; vendor: string | null }[];
}

const Triangulation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;

  const [datasets, setDatasets] = useState<DatasetInfo[]>([]);
  const [baseDatasetId, setBaseDatasetId] = useState<string | null>(null);
  const [confidenceLevel, setConfidenceLevel] = useState(80);
  const [attributeConfigs, setAttributeConfigs] = useState<AttributeConfig[]>(
    DEFAULT_ATTRIBUTE_CONFIGS
  );

  useEffect(() => {
    if (state?.sources) {
      const mockDatasets = generateMockDatasets(state.sources);
      setDatasets(mockDatasets);
    } else {
      // If no sources passed, redirect back
      navigate('/');
    }
  }, [state, navigate]);

  const handleAttributeChange = (id: string, updates: Partial<AttributeConfig>) => {
    setAttributeConfigs((prev) =>
      prev.map((attr) => (attr.id === id ? { ...attr, ...updates } : attr))
    );
  };

  const handleConfidenceChange = (value: number) => {
    setConfidenceLevel(value);
  };

  const handleStartTriangulation = () => {
    if (!baseDatasetId) {
      toast({
        title: 'Base Dataset Required',
        description: 'Please select a base dataset before proceeding.',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Triangulation Started',
      description: 'Patient matching process has been initiated.',
    });

    // Navigate to results page with confidence level
    navigate('/results', { state: { confidence: confidenceLevel } });
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      <PageHeader />

      <main className="container mx-auto px-6 py-8">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Page Title */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={handleBack}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h2 className="text-2xl font-bold text-foreground">Dataset Review & Matching Configuration</h2>
              <p className="text-muted-foreground mt-1">
                Configure matching parameters and select your base dataset
              </p>
            </div>
          </div>

          {/* Section 1: Selected Datasets Overview */}
          <section className="bg-card rounded-xl border border-border shadow-card p-6">
            <div className="flex items-center gap-2 mb-6">
              <Database className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Selected Datasets</h3>
              <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-secondary text-secondary-foreground rounded-full">
                {datasets.length} dataset{datasets.length !== 1 ? 's' : ''}
              </span>
            </div>

            <p className="text-sm text-muted-foreground mb-4">
              Select one dataset as the <strong>Base Dataset</strong> for patient matching. The base dataset will serve as the primary reference for unification.
            </p>

            <div className="space-y-3">
              {datasets.map((dataset, index) => (
                <div
                  key={dataset.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <DatasetCard
                    dataset={dataset}
                    isSelected={baseDatasetId === dataset.id}
                    onSelect={() => setBaseDatasetId(dataset.id)}
                  />
                </div>
              ))}
            </div>

            {!baseDatasetId && datasets.length > 0 && (
              <p className="mt-4 text-sm text-warning flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-warning animate-pulse" />
                Please select a base dataset to continue
              </p>
            )}
          </section>

          {/* Section 2: Matching Confidence Meter */}
          <section className="bg-card rounded-xl border border-border shadow-card p-6">
            <ConfidenceMeter
              value={confidenceLevel}
              onChange={handleConfidenceChange}
            />
          </section>

          {/* Section 3: Advanced Attribute-Level Controls */}
          <section className="bg-card rounded-xl border border-border shadow-card p-6">
            <AdvancedAttributeControls
              attributes={attributeConfigs}
              onAttributeChange={handleAttributeChange}
            />
          </section>

          {/* Action Section */}
          <div className="flex items-center justify-between pt-4">
            <Button variant="outline" onClick={handleBack} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Source Selection
            </Button>

            <Button
              variant="proceed"
              size="lg"
              onClick={handleStartTriangulation}
              disabled={!baseDatasetId}
              className="gap-2"
            >
              <Play className="h-4 w-4" />
              Start Patient Unification
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Triangulation;

 