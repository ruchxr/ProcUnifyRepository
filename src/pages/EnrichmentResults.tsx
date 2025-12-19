import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Users, Layers, Gauge, Activity, Clock, Download, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { ConfidenceRecommendation } from '@/components/ConfidenceRecommendation';

interface LocationState {
  confidence?: number;
}

const EnrichmentResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  const confidence = state?.confidence ?? 0.80;

  const handleBack = () => {
    navigate('/triangulation');
  };

  const handleStartOver = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      <PageHeader />

      <main className="container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Page Title */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={handleBack}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h2 className="text-2xl font-bold text-foreground">Enrichment Impact Summary</h2>
              <p className="text-muted-foreground mt-1">
                Business value unlocked through patient triangulation
              </p>
            </div>
          </div>

          {/* Section 1: KPI Cards Overview */}
          <section>
            <h3 className="text-lg font-semibold text-foreground mb-4">Key Performance Indicators</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1: Patients Enriched */}
              <Card className="border-border shadow-card overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-success to-success/60" />
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2.5 rounded-lg bg-success/10">
                      <Users className="h-5 w-5 text-success" />
                    </div>
                    <span className="flex items-center gap-1 text-xs font-medium text-success bg-success/10 px-2 py-1 rounded-full">
                      ↑ High Impact
                    </span>
                  </div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Patients Enriched</p>
                  <p className="text-4xl font-bold text-foreground tracking-tight">78.4%</p>
                  <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                    Patients successfully linked to at least one additional data source
                  </p>
                </CardContent>
              </Card>

              {/* Card 2: Multi-Source Coverage */}
              <Card className="border-border shadow-card overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-primary to-primary/60" />
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2.5 rounded-lg bg-primary/10">
                      <Layers className="h-5 w-5 text-primary" />
                    </div>
                    <span className="flex items-center gap-1 text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                      Multi-Source
                    </span>
                  </div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Multi-Source Coverage</p>
                  <p className="text-4xl font-bold text-foreground tracking-tight">62.1%</p>
                  <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                    Patients with high-density, cross-source profiles from &gt;2 sources
                  </p>
                </CardContent>
              </Card>

              {/* Card 3: Average Match Confidence */}
              <Card className="border-border shadow-card overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-accent to-accent/60" />
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2.5 rounded-lg bg-accent/10">
                      <Gauge className="h-5 w-5 text-accent" />
                    </div>
                    <span className="flex items-center gap-1 text-xs font-medium text-accent bg-accent/10 px-2 py-1 rounded-full">
                      High Confidence
                    </span>
                  </div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Avg Match Confidence Score</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-4xl font-bold text-foreground tracking-tight">{confidence.toFixed(2)}</p>
                    <span className="text-sm font-medium text-success">High</span>
                  </div>
                  {/* Confidence Bar */}
                  <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-accent to-success rounded-full transition-all duration-500"
                      style={{ width: `${confidence * 100}%` }}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                    Average confidence across all enriched patient matches
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Matching Confidence Recommendation */}
          <section>
            <h3 className="text-lg font-semibold text-foreground mb-4">Matching Confidence Recommendation</h3>
            <ConfidenceRecommendation confidence={confidence} />
          </section>

          {/* Section 2: Before vs After Enrichment Cards */}
          <section>
            <h3 className="text-lg font-semibold text-foreground mb-4">Before vs After Enrichment</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Card 4: Avg Key Events per Patient */}
              <Card className="border-border shadow-card">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2.5 rounded-lg bg-muted">
                      <Activity className="h-5 w-5 text-foreground" />
                    </div>
                  </div>
                  <p className="text-sm font-medium text-muted-foreground mb-4">Avg Key Events / Patient</p>
                  
                  <div className="flex items-center justify-between gap-4">
                    {/* Before */}
                    <div className="flex-1 p-4 rounded-lg bg-destructive/5 border border-destructive/20">
                      <p className="text-xs font-medium text-destructive uppercase tracking-wide mb-1">Before</p>
                      <p className="text-3xl font-bold text-destructive">2.1</p>
                      <p className="text-xs text-muted-foreground mt-1">Single Source</p>
                    </div>

                    {/* Arrow */}
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center">
                        <span className="text-success font-bold">→</span>
                      </div>
                      <span className="text-xs font-medium text-success mt-1">+119%</span>
                    </div>

                    {/* After */}
                    <div className="flex-1 p-4 rounded-lg bg-success/5 border border-success/20">
                      <p className="text-xs font-medium text-success uppercase tracking-wide mb-1">After</p>
                      <p className="text-3xl font-bold text-success">4.6</p>
                      <p className="text-xs text-muted-foreground mt-1">Triangulated</p>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
                    Clinical and treatment events captured across sources
                  </p>
                </CardContent>
              </Card>

              {/* Card 5: Median Patient Journey Length */}
              <Card className="border-border shadow-card">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2.5 rounded-lg bg-muted">
                      <Clock className="h-5 w-5 text-foreground" />
                    </div>
                  </div>
                  <p className="text-sm font-medium text-muted-foreground mb-4">Median Journey Length</p>
                  
                  <div className="flex items-center justify-between gap-4">
                    {/* Before */}
                    <div className="flex-1 p-4 rounded-lg bg-destructive/5 border border-destructive/20">
                      <p className="text-xs font-medium text-destructive uppercase tracking-wide mb-1">Before</p>
                      <p className="text-3xl font-bold text-destructive">18</p>
                      <p className="text-xs text-muted-foreground mt-1">months</p>
                    </div>

                    {/* Arrow */}
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center">
                        <span className="text-success font-bold">→</span>
                      </div>
                      <span className="text-xs font-medium text-success mt-1">+133%</span>
                    </div>

                    {/* After */}
                    <div className="flex-1 p-4 rounded-lg bg-success/5 border border-success/20">
                      <p className="text-xs font-medium text-success uppercase tracking-wide mb-1">After</p>
                      <p className="text-3xl font-bold text-success">42</p>
                      <p className="text-xs text-muted-foreground mt-1">months</p>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
                    Median longitudinal visibility per patient
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Action Section */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <Button variant="outline" onClick={handleBack} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Configuration
            </Button>

            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={handleStartOver} className="gap-2">
                <RotateCcw className="h-4 w-4" />
                Start Over
              </Button>
              <Button variant="proceed" size="lg" className="gap-2">
                <Download className="h-4 w-4" />
                Export Results
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EnrichmentResults;
