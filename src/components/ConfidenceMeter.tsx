import { Info } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface ConfidenceMeterProps {
  value: number;
  onChange: (value: number) => void;
}

export function ConfidenceMeter({ value, onChange }: ConfidenceMeterProps) {
  const getConfidenceLabel = () => {
    if (value < 33) return 'Broad';
    if (value > 66) return 'Strict';
    return 'Balanced';
  };

  const getConfidenceColor = () => {
    if (value < 33) return 'text-warning';
    if (value > 66) return 'text-success';
    return 'text-primary';
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-semibold text-foreground">Overall Matching Confidence</h3>
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="text-muted-foreground hover:text-foreground transition-colors">
              <Info className="h-4 w-4" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="right" className="max-w-sm p-4 bg-popover border border-border shadow-elevated z-50">
            <p className="text-sm leading-relaxed">
              Matching confidence determines how strictly patient attributes must align across datasets.
              <br /><br />
              <strong>Broad matching</strong> increases recall but may include false positives.
              <br /><br />
              <strong>Strict matching</strong> prioritizes precision and stronger deterministic overlaps.
            </p>
          </TooltipContent>
        </Tooltip>
      </div>

      <div className="bg-secondary/50 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-muted-foreground">Broad</span>
          <span className={cn('text-sm font-semibold', getConfidenceColor())}>
            {getConfidenceLabel()}
          </span>
          <span className="text-sm font-medium text-muted-foreground">Strict</span>
        </div>

        <div className="relative">
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
            value={[value]}
            onValueChange={(values) => onChange(values[0])}
            max={100}
            step={1}
            className="relative z-10"
          />
        </div>

        <div className="flex justify-between mt-2">
          <span className="text-xs text-muted-foreground">Higher recall</span>
          <span className="text-xs text-muted-foreground">Higher precision</span>
        </div>
      </div>
    </div>
  );
}
