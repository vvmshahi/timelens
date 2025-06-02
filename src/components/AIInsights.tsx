
import React from 'react';
import { Brain, TrendingUp, AlertCircle, Lightbulb, Sparkles } from 'lucide-react';

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
      <div className="card-pulse p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-r from-[#FF5F6D] to-[#FFA726] rounded-lg">
            <Brain className="h-6 w-6 text-white animate-pulse" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">AI Commentary</h3>
        </div>
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
        </div>
      </div>
    );
  }

  const safeSummary = typeof summary === 'string' ? summary : 'Analysis summary not available.';
  const safeTrend = typeof trend === 'string' ? trend : 'Trend analysis not available.';
  const safeRecommendation = typeof recommendation === 'string' ? recommendation : 'Recommendations not available.';

  return (
    <div className="card-pulse p-8 border-l-4 border-l-orange-pulse">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-gradient-to-r from-[#FF5F6D] to-[#FFA726] rounded-lg">
          <Brain className="h-6 w-6 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900">AI Commentary</h3>
        <Sparkles className="h-5 w-5 text-orange-pulse ml-auto" />
      </div>
      
      <div className="space-y-8">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
            <TrendingUp className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2 text-lg">Data Summary</h4>
            <p className="text-gray-700 leading-relaxed">{safeSummary}</p>
          </div>
        </div>
        
        <div className="flex items-start gap-4">
          <div className="p-2 bg-orange-100 rounded-lg flex-shrink-0">
            <AlertCircle className="h-5 w-5 text-orange-600" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2 text-lg">Trend Analysis</h4>
            <p className="text-gray-700 leading-relaxed">{safeTrend}</p>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-green-500 rounded-lg flex-shrink-0">
              <Lightbulb className="h-5 w-5 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-green-900 mb-2 text-lg">Actionable Insight</h4>
              <p className="text-green-800 leading-relaxed">{safeRecommendation}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIInsights;
