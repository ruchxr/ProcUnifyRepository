import { Info } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface ConfidenceMeterProps {
  value: number; // 65 to 100 (percentage)
  onChange: (value: number) => void;
}

export function ConfidenceMeter({ value, onChange }: ConfidenceMeterProps) {
  const getConfidenceLabel = () => {
    if (value <= 70) return 'Broader Matching';
    if (value >= 95) return 'Very Strict';
    if (value >= 78 && value <= 82) return 'Recommended';
    return 'Balanced';
  };

  const getConfidenceColor = () => {
    if (value <= 70) return 'text-warning';
    if (value >= 95) return 'text-success';
    return 'text-primary';
  };

  // Convert slider value (0-100) to confidence (65-100) and vice versa
  const sliderToConfidence = (sliderValue: number) => {
    return 65 + (sliderValue / 100) * 35;
  };

  const confidenceToSlider = (confidence: number) => {
    return ((confidence - 65) / 35) * 100;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-semibold text-foreground">Matching Confidence Level</h3>
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="text-muted-foreground hover:text-foreground transition-colors">
              <Info className="h-4 w-4" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="right" className="max-w-sm p-4 bg-popover border border-border shadow-elevated z-50">
            <p className="text-sm leading-relaxed">
              Matching confidence represents how sure we want to be that records belong to the same patient.
              


              <strong> Lower confidence</strong> includes more patients and events but may introduce some uncertainty.
              


              <strong> Higher confidence</strong> ensures very accurate matches but may reduce patient coverage.
              


              We recommend <strong>80%</strong> as it balances reliability with data richness for most analytical use cases.
            </p>
          </TooltipContent>
        </Tooltip>
      </div>

      <div className="bg-secondary/50 rounded-lg p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-muted-foreground">65%</span>
          <div className="flex flex-col items-center">
            <span className={cn('text-2xl font-bold tabular-nums ml-8', getConfidenceColor())}>
                {Math.round(value)}%
            </span>
            <span className={cn('text-xs font-medium ml-7', getConfidenceColor())}>
                  {getConfidenceLabel()}
            </span>
          </div>
          <span className="text-sm font-medium text-muted-foreground">100%</span>
        </div>

        <div className="relative mt-4">
          {/* Background gradient track */}
          <div 
            className="absolute inset-0 h-2 rounded-full pointer-events-none"
            style={{
              background: `linear-gradient(to right, hsl(var(--warning)), hsl(var(--primary)), hsl(var(--success)))`,
              top: '50%',
              transform: 'translateY(-50%)',
            }}
          />
          
          <Slider
            value={[confidenceToSlider(value)]}
            onValueChange={(values) => onChange(Math.round(sliderToConfidence(values[0])))}
            max={100}
            step={1}
            className="relative z-10"
          />
        </div>

        {/* Tick marks */}
        <div className="flex justify-between mt-3 px-1">
          <div className="flex flex-col items-start">
            <span className="text-xs text-muted-foreground">Broader</span>
            <span className="text-xs text-muted-foreground">Matching</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xs font-medium text-primary">80%</span>
            <span className="text-xs text-muted-foreground">Recommended</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-xs text-muted-foreground">Very</span>
            <span className="text-xs text-muted-foreground">Strict</span>
          </div>
        </div>
      </div>
    </div>
  );
}
 