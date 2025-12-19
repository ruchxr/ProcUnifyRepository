import { Info } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface ConfidenceMeterProps {
  value: number; // 0.65 to 1.00
  onChange: (value: number) => void;
}

export function ConfidenceMeter({ value, onChange }: ConfidenceMeterProps) {
  const getConfidenceLabel = () => {
    if (value <= 0.70) return 'Broader Matching';
    if (value >= 0.95) return 'Very Strict';
    if (value >= 0.78 && value <= 0.82) return 'Recommended';
    return 'Balanced';
  };

  const getConfidenceColor = () => {
    if (value <= 0.70) return 'text-warning';
    if (value >= 0.95) return 'text-success';
    return 'text-primary';
  };

  // Convert slider value (0-100) to confidence (0.65-1.00) and vice versa
  const sliderToConfidence = (sliderValue: number) => {
    return 0.65 + (sliderValue / 100) * 0.35;
  };

  const confidenceToSlider = (confidence: number) => {
    return ((confidence - 0.65) / 0.35) * 100;
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
              Matching confidence controls how sure we want to be that records belong to the same patient.
              <br /><br />
              <strong>Lower values</strong> include more patients but may have some uncertainty.
              <br /><br />
              <strong>Higher values</strong> are very accurate but may exclude usable data.
              <br /><br />
              We recommend <strong>0.80</strong> as it balances accuracy with data richness and works well for most analytical use cases.
            </p>
          </TooltipContent>
        </Tooltip>
      </div>

      <div className="bg-secondary/50 rounded-lg p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-muted-foreground">0.65</span>
          <div className="flex flex-col items-center">
            <span className={cn('text-2xl font-bold tabular-nums', getConfidenceColor())}>
              {value.toFixed(2)}
            </span>
            <span className={cn('text-xs font-medium', getConfidenceColor())}>
              {getConfidenceLabel()}
            </span>
          </div>
          <span className="text-sm font-medium text-muted-foreground">1.00</span>
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
            onValueChange={(values) => onChange(sliderToConfidence(values[0]))}
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
            <span className="text-xs font-medium text-primary">0.80</span>
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
