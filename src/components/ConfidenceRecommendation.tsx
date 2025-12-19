import { Lightbulb, AlertCircle, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ConfidenceRecommendationProps {
  confidence: number;
}

export function ConfidenceRecommendation({ confidence }: ConfidenceRecommendationProps) {
  const getRecommendation = () => {
    if (confidence >= 0.90) {
      return {
        icon: AlertCircle,
        title: 'Very Strict Threshold Selected',
        message: 'You selected a very strict confidence threshold. Reducing confidence to 0.80 may significantly increase patient coverage and longitudinal depth while maintaining strong reliability.',
        variant: 'warning' as const,
      };
    }
    if (confidence >= 0.75 && confidence <= 0.85) {
      return {
        icon: CheckCircle,
        title: 'Optimal Configuration',
        message: 'Your selected confidence level provides a strong balance between accuracy and data enrichment and is suitable for most analyses.',
        variant: 'success' as const,
      };
    }
    if (confidence <= 0.70) {
      return {
        icon: Lightbulb,
        title: 'Broader Threshold Selected',
        message: 'You selected a broader confidence threshold. Increasing confidence toward 0.80 can improve match reliability and reduce ambiguity in downstream analyses.',
        variant: 'info' as const,
      };
    }
    // Default for in-between values
    return {
      icon: CheckCircle,
      title: 'Good Configuration',
      message: 'Your selected confidence level is within an acceptable range for most use cases.',
      variant: 'neutral' as const,
    };
  };

  const recommendation = getRecommendation();
  const Icon = recommendation.icon;

  const variantStyles = {
    warning: 'bg-warning/10 border-warning/30 text-warning',
    success: 'bg-success/10 border-success/30 text-success',
    info: 'bg-primary/10 border-primary/30 text-primary',
    neutral: 'bg-secondary border-border text-muted-foreground',
  };

  const iconStyles = {
    warning: 'text-warning',
    success: 'text-success',
    info: 'text-primary',
    neutral: 'text-muted-foreground',
  };

  return (
    <div
      className={cn(
        'flex items-start gap-4 p-5 rounded-lg border transition-all',
        variantStyles[recommendation.variant]
      )}
    >
      <div className={cn('p-2 rounded-full bg-background/50', iconStyles[recommendation.variant])}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-foreground mb-1">{recommendation.title}</h4>
        <p className="text-sm text-muted-foreground leading-relaxed">{recommendation.message}</p>
      </div>
    </div>
  );
}
