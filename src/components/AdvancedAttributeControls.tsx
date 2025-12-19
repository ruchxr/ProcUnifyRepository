import { ChevronDown, Settings2 } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { AttributeConfig } from '@/types/triangulation';
import { useState } from 'react';

interface AdvancedAttributeControlsProps {
  attributes: AttributeConfig[];
  onAttributeChange: (id: string, updates: Partial<AttributeConfig>) => void;
}

const AGE_RANGES = [0, 2, 5, 10];

export function AdvancedAttributeControls({
  attributes,
  onAttributeChange,
}: AdvancedAttributeControlsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const getAgeRangeIndex = (range: number) => {
    const idx = AGE_RANGES.indexOf(range);
    return idx >= 0 ? idx : 1;
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="flex items-center gap-3 w-full p-4 rounded-lg bg-secondary/50 hover:bg-secondary/70 transition-colors group">
        <Settings2 className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
        <span className="text-sm font-semibold text-foreground">Advanced Matching Controls</span>
        <ChevronDown
          className={cn(
            'ml-auto h-4 w-4 text-muted-foreground transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
        />
      </CollapsibleTrigger>

      <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
        <div className="mt-4 space-y-3">
          {attributes.map((attr) => (
            <div
              key={attr.id}
              className={cn(
                'p-4 rounded-lg border transition-all duration-200',
                attr.enabled
                  ? 'bg-card border-border'
                  : 'bg-muted/30 border-transparent'
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Switch
                    checked={attr.enabled}
                    onCheckedChange={(checked) =>
                      onAttributeChange(attr.id, { enabled: checked })
                    }
                  />
                  <span
                    className={cn(
                      'font-medium transition-colors',
                      attr.enabled ? 'text-foreground' : 'text-muted-foreground'
                    )}
                  >
                    {attr.name}
                  </span>
                </div>

                {attr.enabled && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      {attr.strictness === 'strict' ? attr.options.strict : attr.options.broad}
                    </span>
                  </div>
                )}
              </div>

              {/* Attribute-specific controls */}
              {attr.enabled && (
                <div className="mt-4 pl-11">
                  {attr.id === 'age' ? (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>±0 years</span>
                        <span>±10 years</span>
                      </div>
                      <Slider
                        value={[getAgeRangeIndex(attr.ageRange || 2)]}
                        onValueChange={(values) => {
                          const range = AGE_RANGES[values[0]];
                          onAttributeChange(attr.id, {
                            ageRange: range,
                            strictness: range <= 2 ? 'strict' : 'broad',
                          });
                        }}
                        max={AGE_RANGES.length - 1}
                        step={1}
                      />
                      <div className="flex justify-center">
                        <span className="text-sm font-medium text-foreground">
                          ±{attr.ageRange || 2} years tolerance
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          onAttributeChange(attr.id, { strictness: 'strict' })
                        }
                        className={cn(
                          'flex-1 px-3 py-2 text-xs font-medium rounded-md transition-all',
                          attr.strictness === 'strict'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                        )}
                      >
                        {attr.options.strict}
                      </button>
                      <button
                        onClick={() =>
                          onAttributeChange(attr.id, { strictness: 'broad' })
                        }
                        className={cn(
                          'flex-1 px-3 py-2 text-xs font-medium rounded-md transition-all',
                          attr.strictness === 'broad'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                        )}
                      >
                        {attr.options.broad}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
