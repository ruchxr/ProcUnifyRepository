import { Plus, Trash2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { DATA_SOURCE_OPTIONS, DataSourceType, SelectedSource } from '@/types/dataSource';

interface SourceSelectorProps {
  sources: SelectedSource[];
  onAddSource: () => void;
  onRemoveSource: (id: string) => void;
  onUpdateSource: (id: string, field: 'type' | 'vendor', value: string) => void;
}

export function SourceSelector({
  sources,
  onAddSource,
  onRemoveSource,
  onUpdateSource,
}: SourceSelectorProps) {
  const getVendorsForType = (type: DataSourceType | null) => {
    if (!type) return [];
    const option = DATA_SOURCE_OPTIONS.find((opt) => opt.type === type);
    return option?.vendors || [];
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Select Data Sources</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={onAddSource}
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Source
        </Button>
      </div>

      <div className="space-y-3">
        {sources.map((source, index) => (
          <div
            key={source.id}
            className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border shadow-soft animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Data Source Type
                </label>
                <Select
                  value={source.type || ''}
                  onValueChange={(value) => onUpdateSource(source.id, 'type', value)}
                >
                  <SelectTrigger className="w-full bg-background">
                    <SelectValue placeholder="Select source type" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border border-border shadow-elevated z-50">
                    {DATA_SOURCE_OPTIONS.map((option) => (
                      <SelectItem key={option.type} value={option.type}>
                        {option.type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Vendor
                </label>
                <Select
                  value={source.vendor || ''}
                  onValueChange={(value) => onUpdateSource(source.id, 'vendor', value)}
                  disabled={!source.type}
                >
                  <SelectTrigger className="w-full bg-background disabled:opacity-50">
                    <SelectValue placeholder={source.type ? "Select vendor" : "Select source type first"} />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border border-border shadow-elevated z-50">
                    {getVendorsForType(source.type).map((vendor) => (
                      <SelectItem key={vendor} value={vendor}>
                        {vendor}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {sources.length > 1 && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onRemoveSource(source.id)}
                className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 shrink-0"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
