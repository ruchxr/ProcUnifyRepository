import { useState } from 'react';
import { ChevronDown, Calendar, Users, Rows3, Stethoscope, FileText, TestTube, Package } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DatasetInfo } from '@/types/triangulation';

interface DatasetCardProps {
  dataset: DatasetInfo;
  isSelected: boolean;
  onSelect: () => void;
}

export function DatasetCard({ dataset, isSelected, onSelect }: DatasetCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCardClick = (e: React.MouseEvent) => {
    // Only toggle expand if clicking the chevron area
    if ((e.target as HTMLElement).closest('.expand-trigger')) {
      e.stopPropagation();
      setIsExpanded(!isExpanded);
    } else {
      onSelect();
    }
  };

  // Get source-specific metric label and value
  const getSourceSpecificMetric = () => {
    if (dataset.sourceType === 'Claims' && dataset.claimsCount) {
      return {
        icon: FileText,
        label: 'Claims Count',
        value: dataset.claimsCount,
      };
    }
    if (dataset.sourceType === 'Lab' && dataset.labRecords) {
      return {
        icon: TestTube,
        label: 'Lab Records',
        value: dataset.labRecords,
      };
    }
    if (dataset.sourceType === 'SP' && dataset.shipments) {
      return {
        icon: Package,
        label: 'Shipments',
        value: dataset.shipments,
      };
    }
    return null;
  };

  const sourceMetric = getSourceSpecificMetric();

  return (
    <div
      onClick={handleCardClick}
      className={cn(
        'relative rounded-lg border-2 cursor-pointer transition-all duration-200',
        isSelected
          ? 'border-primary bg-primary/5 shadow-card'
          : 'border-border bg-card hover:border-primary/40 hover:shadow-soft'
      )}
    >
      {/* Collapsed View (Always Visible) */}
      <div className="flex items-center gap-4 p-5">
        {/* Radio Button */}
        <div className="flex items-center">
          <div
            className={cn(
              'w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors',
              isSelected ? 'border-primary bg-primary' : 'border-muted-foreground/40'
            )}
          >
            {isSelected && (
              <div className="w-2 h-2 rounded-full bg-primary-foreground" />
            )}
          </div>
        </div>

        {/* Main Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="px-2.5 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-md">
              {dataset.sourceType}
            </span>
            <span className="font-semibold text-foreground">{dataset.vendor}</span>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              <span>{dataset.timeCoverage}</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Rows3 className="h-3.5 w-3.5" />
              <span>{dataset.rowCount} rows</span>
            </div>
            {isSelected && (
              <span className="ml-auto px-2.5 py-0.5 text-xs font-medium bg-primary text-primary-foreground rounded-full shrink-0">
                Base Dataset
              </span>
            )}
          </div>
        </div>

        {/* Expand/Collapse Button */}
        <button
          className="expand-trigger p-2 rounded-md hover:bg-secondary/80 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(!isExpanded);
          }}
        >
          <ChevronDown
            className={cn(
              'h-5 w-5 text-muted-foreground transition-transform duration-200',
              isExpanded && 'rotate-180'
            )}
          />
        </button>
      </div>

      {/* Expanded View */}
      {isExpanded && (
        <div className="px-5 pb-5 pt-0 border-t border-border/50 animate-fade-in">
          <div className="pt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground uppercase tracking-wide">
                <Users className="h-3.5 w-3.5" />
                Patient Count
              </div>
              <p className="text-lg font-semibold text-foreground">{dataset.patientCount}</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground uppercase tracking-wide">
                <Stethoscope className="h-3.5 w-3.5" />
                HCP Count
              </div>
              <p className="text-lg font-semibold text-foreground">{dataset.hcpCount}</p>
            </div>
            {sourceMetric && (
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground uppercase tracking-wide">
                  <sourceMetric.icon className="h-3.5 w-3.5" />
                  {sourceMetric.label}
                </div>
                <p className="text-lg font-semibold text-foreground">{sourceMetric.value}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
 