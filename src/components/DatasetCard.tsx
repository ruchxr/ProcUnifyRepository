import { Database, Calendar, Users, Rows3 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DatasetInfo } from '@/types/triangulation';

interface DatasetCardProps {
  dataset: DatasetInfo;
  isSelected: boolean;
  onSelect: () => void;
}

export function DatasetCard({ dataset, isSelected, onSelect }: DatasetCardProps) {
  return (
    <div
      onClick={onSelect}
      className={cn(
        'relative flex items-start gap-4 p-5 rounded-lg border-2 cursor-pointer transition-all duration-200',
        isSelected
          ? 'border-primary bg-primary/5 shadow-card'
          : 'border-border bg-card hover:border-primary/40 hover:shadow-soft'
      )}
    >
      {/* Radio Button */}
      <div className="flex items-center pt-1">
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

      {/* Dataset Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-3">
          <Database className="h-5 w-5 text-primary shrink-0" />
          <h4 className="font-semibold text-foreground truncate">{dataset.name}</h4>
          {isSelected && (
            <span className="ml-auto px-2.5 py-0.5 text-xs font-medium bg-primary text-primary-foreground rounded-full shrink-0">
              Base Dataset
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Source Type</p>
            <p className="text-sm font-medium text-foreground">{dataset.sourceType}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Vendor</p>
            <p className="text-sm font-medium text-foreground">{dataset.vendor}</p>
          </div>
          <div className="space-y-1 flex items-start gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-muted-foreground mt-0.5 shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Time Coverage</p>
              <p className="text-sm font-medium text-foreground">{dataset.timeCoverage}</p>
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <div className="flex items-start gap-1.5">
                <Users className="h-3.5 w-3.5 text-muted-foreground mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Patients</p>
                  <p className="text-sm font-medium text-foreground">{dataset.patientCount}</p>
                </div>
              </div>
              <div className="flex items-start gap-1.5">
                <Rows3 className="h-3.5 w-3.5 text-muted-foreground mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Rows</p>
                  <p className="text-sm font-medium text-foreground">{dataset.rowCount}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
