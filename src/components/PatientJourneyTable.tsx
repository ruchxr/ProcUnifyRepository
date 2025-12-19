import { Check, AlertCircle, X } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export interface JourneyCapability {
  component: string;
  supported: 'Yes' | 'Partial' | 'No';
  source: string;
}

interface PatientJourneyTableProps {
  data: JourneyCapability[];
}

export function PatientJourneyTable({ data }: PatientJourneyTableProps) {
  const renderSupportedIndicator = (supported: string) => {
    switch (supported) {
      case 'Yes':
        return (
          <div className="flex items-center justify-center gap-2">
            <div className="w-6 h-6 rounded-full bg-success/10 flex items-center justify-center">
              <Check className="h-4 w-4 text-success" />
            </div>
            <span className="text-success font-medium">Description</span>
          </div>
        );
      case 'Partial':
        return (
          <div className="flex items-center justify-center gap-2">
            <div className="w-6 h-6 rounded-full bg-warning/10 flex items-center justify-center">
              <AlertCircle className="h-4 w-4 text-warning" />
            </div>
            <span className="text-warning font-medium">Partial</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center gap-2">
            <div className="w-6 h-6 rounded-full bg-destructive/10 flex items-center justify-center">
              <X className="h-4 w-4 text-destructive" />
            </div>
            <span className="text-destructive font-medium">Not Supported</span>
          </div>
        );
    }
  };

  return (
    <div className="space-y-4 animate-fade-in" style={{ animationDelay: '100ms' }}>
      <div className="flex items-center gap-3">
        <div className="h-8 w-1 bg-accent rounded-full" />
        <h3 className="text-lg font-semibold text-foreground">
          Cross-Source Analytics Use Cases
        </h3>
      </div>

      <div className="rounded-lg border border-border overflow-hidden shadow-card bg-card">
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary/50 hover:bg-secondary/50">
              <TableHead className="font-semibold text-foreground text-center">Use Case</TableHead>
              <TableHead className="font-semibold text-center text-foreground">Description</TableHead>
              <TableHead className="font-semibold text-foreground text-center">Source</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, index) => (
              <TableRow 
                key={row.component}
                className="hover:bg-muted/30 transition-colors"
                style={{ animationDelay: `${index * 30}ms` }}
              >
                <TableCell className="font-medium text-foreground text-center">{row.component}</TableCell>
                <TableCell className="font-medium text-center text-foreground">{row.supported}</TableCell>
                <TableCell className="text-muted-foreground">{row.source}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
