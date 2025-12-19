import { ChevronDown, Settings2 } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { AttributeConfig, AgeMatchingOption, GeographyOption, HcpOption, DrugOption, GenderOption } from '@/types/triangulation';
import { useState } from 'react';

interface AdvancedAttributeControlsProps {
  attributes: AttributeConfig[];
  onAttributeChange: (id: string, updates: Partial<AttributeConfig>) => void;
}

const AGE_OPTIONS: { value: AgeMatchingOption; label: string }[] = [
  { value: 'exact', label: 'Exact' },
  { value: 'plus_minus_1', label: '±1 year' },
  { value: 'plus_minus_2', label: '±2 years' },
];

const GEOGRAPHY_OPTIONS: { value: GeographyOption; label: string }[] = [
  { value: 'zip3', label: 'ZIP3' },
  { value: 'state', label: 'State / Region' },
];

const HCP_OPTIONS: { value: HcpOption; label: string }[] = [
  { value: 'exact_npi', label: 'Exact NPI Match' },
  { value: 'specialty', label: 'Specialty + Practice Match' },
  { value: 'hco', label: 'HCO Match' },
];

const DRUG_OPTIONS: { value: DrugOption; label: string }[] = [
  { value: 'exact_ndc', label: 'Exact NDC' },
  { value: 'brand', label: 'Brand' },
  { value: 'molecule', label: 'Molecule' },
];

const GENDER_OPTIONS: { value: GenderOption; label: string }[] = [
  { value: 'exact', label: 'Exact match only' },
  { value: 'allow_unknown', label: 'Allow unknown / missing' },
];

interface AttributeOption {
  value: string;
  label: string;
}

export function AdvancedAttributeControls({
  attributes,
  onAttributeChange,
}: AdvancedAttributeControlsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const getOptionsForAttribute = (attr: AttributeConfig): AttributeOption[] => {
    switch (attr.id) {
      case 'age':
        return AGE_OPTIONS;
      case 'geography':
        return GEOGRAPHY_OPTIONS;
      case 'hcp':
        return HCP_OPTIONS;
      case 'drug':
        return DRUG_OPTIONS;
      case 'gender':
        return GENDER_OPTIONS;
      default:
        return [];
    }
  };

  const getCurrentValue = (attr: AttributeConfig): string => {
    switch (attr.id) {
      case 'age':
        return attr.ageOption || 'exact';
      case 'geography':
        return attr.geographyOption || 'zip3';
      case 'hcp':
        return attr.hcpOption || 'exact_npi';
      case 'drug':
        return attr.drugOption || 'exact_ndc';
      case 'gender':
        return attr.genderOption || 'exact';
      default:
        return '';
    }
  };

  const getSelectedLabel = (attr: AttributeConfig): string => {
    const options = getOptionsForAttribute(attr);
    const currentValue = getCurrentValue(attr);
    return options.find(o => o.value === currentValue)?.label || '';
  };

  const handleOptionSelect = (attr: AttributeConfig, value: string) => {
    switch (attr.id) {
      case 'age':
        onAttributeChange(attr.id, { ageOption: value as AgeMatchingOption });
        break;
      case 'geography':
        onAttributeChange(attr.id, { geographyOption: value as GeographyOption });
        break;
      case 'hcp':
        onAttributeChange(attr.id, { hcpOption: value as HcpOption });
        break;
      case 'drug':
        onAttributeChange(attr.id, { drugOption: value as DrugOption });
        break;
      case 'gender':
        onAttributeChange(attr.id, { genderOption: value as GenderOption });
        break;
    }
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
        <div className="mt-4 space-y-4">
          {attributes.map((attr) => {
            const options = getOptionsForAttribute(attr);
            const currentValue = getCurrentValue(attr);

            return (
              <div
                key={attr.id}
                className={cn(
                  'p-4 rounded-lg border transition-all duration-200',
                  attr.enabled
                    ? 'bg-card border-border'
                    : 'bg-muted/30 border-transparent opacity-60'
                )}
              >
                {/* Header row with toggle, label, and selected value */}
                <div className="flex items-center justify-between mb-3">
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
                    <span className="text-sm text-muted-foreground">
                      {getSelectedLabel(attr)}
                    </span>
                  )}
                </div>

                {/* Button options row */}
                {attr.enabled && (
                  <div className="flex gap-2 flex-wrap">
                    {options.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleOptionSelect(attr, option.value)}
                        className={cn(
                          'px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 border',
                          currentValue === option.value
                            ? 'bg-primary text-primary-foreground border-primary'
                            : 'bg-secondary/50 text-foreground border-border hover:bg-secondary hover:border-primary/50'
                        )}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
 