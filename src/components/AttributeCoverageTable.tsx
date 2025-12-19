import { Check, X } from 'lucide-react';
import { SelectedSource, VENDOR_ATTRIBUTE_COVERAGE, ATTRIBUTE_DEFINITIONS } from '@/types/dataSource';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

interface AttributeCoverageTableProps {
  selectedSources: SelectedSource[];
}

export function AttributeCoverageTable({ selectedSources }: AttributeCoverageTableProps) {
  // Filter to only valid source-vendor pairs
  const validSources = selectedSources.filter((s) => s.type && s.vendor);

  const getWeightBadgeVariant = (weight: string) => {
    return weight === 'High' ? 'default' : 'secondary';
  };

  const renderIndicator = (available: boolean) => {
    return available ? (
      <div className="flex justify-center">
        <div className="w-6 h-6 rounded-full bg-success/10 flex items-center justify-center">
          <Check className="h-4 w-4 text-success" />
        </div>
      </div>
    ) : (
      <div className="flex justify-center">
        <div className="w-6 h-6 rounded-full bg-destructive/10 flex items-center justify-center">
          <X className="h-4 w-4 text-destructive" />
        </div>
      </div>
    );
  };

  const getVendorCoverage = (vendor: string, attribute: string): boolean => {
    const vendorData = VENDOR_ATTRIBUTE_COVERAGE[vendor];
    if (!vendorData) return false;
    return vendorData[attribute] ?? false;
  };

  if (validSources.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center gap-3">
        <div className="h-8 w-1 bg-primary rounded-full" />
        <h3 className="text-lg font-semibold text-foreground">
          Patient Attribute Coverage Across Selected Sources
        </h3>
      </div>

      <ScrollArea className="w-full whitespace-nowrap rounded-lg border border-border">
        <div className="rounded-lg overflow-hidden shadow-card bg-card">
          <Table>
            <TableHeader>
              <TableRow className="bg-secondary/50 hover:bg-secondary/50">
                <TableHead className="font-semibold text-foreground sticky left-0 bg-secondary/50 z-10 min-w-[180px]">
                  Attribute
                </TableHead>
                {validSources.map((source) => (
                  <TableHead 
                    key={source.id} 
                    className="text-center font-semibold text-foreground min-w-[140px]"
                  >
                    <div className="flex flex-col items-center gap-0.5">
                      <span>{source.vendor}</span>
                      <span className="text-xs font-normal text-muted-foreground">({source.type})</span>
                    </div>
                  </TableHead>
                ))}
                <TableHead className="text-center font-semibold text-foreground min-w-[140px]">
                  Role in Matching
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ATTRIBUTE_DEFINITIONS.map((attr, index) => (
                <TableRow 
                  key={attr.attribute}
                  className="hover:bg-muted/30 transition-colors"
                  style={{ animationDelay: `${index * 30}ms` }}
                >
                  <TableCell className="font-medium text-foreground sticky left-0 bg-card z-10">
                    {attr.attribute}
                  </TableCell>
                  {validSources.map((source) => (
                    <TableCell key={source.id} className="text-center">
                      {renderIndicator(getVendorCoverage(source.vendor!, attr.attribute))}
                    </TableCell>
                  ))}
                  <TableCell className="text-center">
                    <Badge variant={getWeightBadgeVariant(attr.roleInMatching)} className="font-medium">
                      {attr.roleInMatching}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
