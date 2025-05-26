
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface TimeSeriesData {
  date: string;
  value: number;
}

interface AIInsightsResponse {
  summary: string;
  trend: string;
  recommendation: string;
}

export const useAIInsights = () => {
  const [insights, setInsights] = useState<AIInsightsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const generateInsights = async (
    data: TimeSeriesData[],
    statisticalSummary: any
  ) => {
    setIsLoading(true);
    try {
      const { data: result, error } = await supabase.functions.invoke('ai-insights', {
        body: {
          data,
          statisticalSummary,
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      if (!result.success) {
        throw new Error(result.error);
      }

      setInsights(result.insights);
      return result.insights;
    } catch (error) {
      console.error('Error generating AI insights:', error);
      toast({
        title: "AI Insights Error",
        description: `Failed to generate insights: ${error.message}`,
        variant: "destructive",
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    insights,
    isLoading,
    generateInsights,
  };
};
