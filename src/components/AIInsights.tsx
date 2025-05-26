
import React from 'react';
import { Brain, TrendingUp, AlertCircle, Lightbulb } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AIInsightsProps {
  summary: string;
  trend: string;
  recommendation: string;
  isLoading?: boolean;
}

const AIInsights: React.FC<AIInsightsProps> = ({ 
  summary, 
  trend, 
  recommendation, 
  isLoading 
}) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary animate-pulse" />
              AI Commentary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Safety checks to ensure all props are strings
  const safeSummary = typeof summary === 'string' ? summary : 'Analysis summary not available.';
  const safeTrend = typeof trend === 'string' ? trend : 'Trend analysis not available.';
  const safeRecommendation = typeof recommendation === 'string' ? recommendation : 'Recommendations not available.';

  return (
    <div className="space-y-4">
      <Card className="shadow-lg border-l-4 border-l-primary">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <Brain className="h-5 w-5" />
            AI Commentary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <TrendingUp className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Data Summary</h4>
                <p className="text-gray-700 text-sm leading-relaxed">{safeSummary}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Trend Analysis</h4>
                <p className="text-gray-700 text-sm leading-relaxed">{safeTrend}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 bg-green-50 p-3 rounded-lg">
              <Lightbulb className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-green-900 mb-1">Actionable Insight</h4>
                <p className="text-green-800 text-sm leading-relaxed">{safeRecommendation}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIInsights;
