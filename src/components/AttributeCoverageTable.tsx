import { Check, X } from 'lucide-react';
import { AttributeCoverage, SelectedSource } from '@/types/dataSource';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface AttributeCoverageTableProps {
  data: AttributeCoverage[];
  selectedSources: SelectedSource[];
}

export function AttributeCoverageTable({ data, selectedSources }: AttributeCoverageTableProps) {
  const hasSourceType = (type: string) => {
    return selectedSources.some((s) => {
      if (type === 'emr') return s.type === 'EPR / EMR';
      return s.type?.toLowerCase() === type.toLowerCase();
    });
  };

  const hasClaims = hasSourceType('claims');
  const hasEmr = hasSourceType('emr');
  const hasLabs = hasSourceType('labs');
  const hasSp = hasSourceType('sp');

  const getWeightBadgeVariant = (weight: string) => {
    switch (weight) {
      case 'High':
        return 'default';
      case 'Medium':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const renderIndicator = (value: boolean, isActive: boolean) => {
    if (!isActive) {
      return <span className="text-muted-foreground/30">—</span>;
    }
    return value ? (
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

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center gap-3">
        <div className="h-8 w-1 bg-primary rounded-full" />
        <h3 className="text-lg font-semibold text-foreground">
          Patient Attribute Coverage Across Selected Sources
        </h3>
      </div>

      <div className="rounded-lg border border-border overflow-hidden shadow-card bg-card">
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary/50 hover:bg-secondary/50">
              <TableHead className="font-semibold text-foreground">Attribute Category</TableHead>
              <TableHead className={`text-center font-semibold ${hasClaims ? 'text-foreground' : 'text-muted-foreground/50'}`}>
                Claims
              </TableHead>
              <TableHead className={`text-center font-semibold ${hasEmr ? 'text-foreground' : 'text-muted-foreground/50'}`}>
                EMR/EHR
              </TableHead>
              <TableHead className={`text-center font-semibold ${hasLabs ? 'text-foreground' : 'text-muted-foreground/50'}`}>
                Labs
              </TableHead>
              <TableHead className={`text-center font-semibold ${hasSp ? 'text-foreground' : 'text-muted-foreground/50'}`}>
                SP
              </TableHead>
              <TableHead className="text-center font-semibold text-foreground">Weight in Matching</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, index) => (
              <TableRow 
                key={row.attribute}
                className="hover:bg-muted/30 transition-colors"
                style={{ animationDelay: `${index * 30}ms` }}
              >
                <TableCell className="font-medium text-foreground">{row.attribute}</TableCell>
                <TableCell className="text-center">{renderIndicator(row.claims, hasClaims)}</TableCell>
                <TableCell className="text-center">{renderIndicator(row.emr, hasEmr)}</TableCell>
                <TableCell className="text-center">{renderIndicator(row.labs, hasLabs)}</TableCell>
                <TableCell className="text-center">{renderIndicator(row.sp, hasSp)}</TableCell>
                <TableCell className="text-center">
                  <Badge variant={getWeightBadgeVariant(row.weight)} className="font-medium">
                    {row.weight}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
