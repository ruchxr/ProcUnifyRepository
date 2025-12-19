import { ChevronDown, Settings2 } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
  { value: 'state', label: 'State' },
];

const HCP_OPTIONS: { value: HcpOption; label: string }[] = [
  { value: 'exact_npi', label: 'Exact NPI' },
  { value: 'specialty', label: 'Specialty' },
  { value: 'hco', label: 'HCO (Health Care Organization)' },
];

const DRUG_OPTIONS: { value: DrugOption; label: string }[] = [
  { value: 'exact_ndc', label: 'Exact NDC' },
  { value: 'brand', label: 'Brand' },
  { value: 'molecule', label: 'Molecule' },
];

const GENDER_OPTIONS: { value: GenderOption; label: string }[] = [
  { value: 'exact', label: 'Exact match' },
  { value: 'allow_unknown', label: 'Allow unknown' },
];

export function AdvancedAttributeControls({
  attributes,
  onAttributeChange,
}: AdvancedAttributeControlsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const getOptionLabel = (attr: AttributeConfig): string => {
    switch (attr.id) {
      case 'age':
        return AGE_OPTIONS.find(o => o.value === attr.ageOption)?.label || 'Exact';
      case 'geography':
        return GEOGRAPHY_OPTIONS.find(o => o.value === attr.geographyOption)?.label || 'ZIP3';
      case 'hcp':
        return HCP_OPTIONS.find(o => o.value === attr.hcpOption)?.label || 'Exact NPI';
      case 'drug':
        return DRUG_OPTIONS.find(o => o.value === attr.drugOption)?.label || 'Exact NDC';
      case 'gender':
        return GENDER_OPTIONS.find(o => o.value === attr.genderOption)?.label || 'Exact match';
      default:
        return '';
    }
  };

  const renderAttributeControl = (attr: AttributeConfig) => {
    switch (attr.id) {
      case 'age':
        return (
          <Select
            value={attr.ageOption}
            onValueChange={(value) => onAttributeChange(attr.id, { ageOption: value as AgeMatchingOption })}
          >
            <SelectTrigger className="w-full bg-background">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-popover border border-border shadow-elevated z-50">
              {AGE_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case 'geography':
        return (
          <Select
            value={attr.geographyOption}
            onValueChange={(value) => onAttributeChange(attr.id, { geographyOption: value as GeographyOption })}
          >
            <SelectTrigger className="w-full bg-background">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-popover border border-border shadow-elevated z-50">
              {GEOGRAPHY_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case 'hcp':
        return (
          <Select
            value={attr.hcpOption}
            onValueChange={(value) => onAttributeChange(attr.id, { hcpOption: value as HcpOption })}
          >
            <SelectTrigger className="w-full bg-background">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-popover border border-border shadow-elevated z-50">
              {HCP_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case 'drug':
        return (
          <Select
            value={attr.drugOption}
            onValueChange={(value) => onAttributeChange(attr.id, { drugOption: value as DrugOption })}
          >
            <SelectTrigger className="w-full bg-background">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-popover border border-border shadow-elevated z-50">
              {DRUG_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case 'gender':
        return (
          <Select
            value={attr.genderOption}
            onValueChange={(value) => onAttributeChange(attr.id, { genderOption: value as GenderOption })}
          >
            <SelectTrigger className="w-full bg-background">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-popover border border-border shadow-elevated z-50">
              {GENDER_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      default:
        return null;
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
              <div className="flex items-center justify-between gap-4">
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
                  <span className="text-xs text-muted-foreground">
                    {getOptionLabel(attr)}
                  </span>
                )}
              </div>

              {/* Attribute-specific controls */}
              {attr.enabled && (
                <div className="mt-4 pl-11 max-w-xs">
                  {renderAttributeControl(attr)}
                </div>
              )}
            </div>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
