
import React from 'react';
import { Brain, TrendingUp, Lightbulb } from 'lucide-react';

interface AIInsightsProps {
  summary: string;
  trend: string;
  recommendation: string;
  isLoading: boolean;
}

const AIInsights: React.FC<AIInsightsProps> = ({ 
  summary, 
  trend, 
  recommendation, 
  isLoading 
}) => {
  if (isLoading) {
    return (
      <div className="card-pulse p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-r from-[#FF5F6D] to-[#FFC371] rounded-lg">
            <Brain className="h-5 w-5 text-white animate-pulse" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">AI-Powered Insights</h3>
        </div>
        
        <div className="space-y-4">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {/* Summary */}
      <div className="card-pulse p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gradient-to-r from-[#FF5F6D] to-[#FFC371] rounded-lg">
            <Brain className="h-5 w-5 text-white" />
          </div>
          <h4 className="font-semibold text-gray-900">AI Summary</h4>
        </div>
        <p className="text-gray-700 leading-relaxed">{summary}</p>
      </div>

      {/* Trend Analysis */}
      <div className="card-pulse p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gradient-to-r from-[#FF5F6D] to-[#FFC371] rounded-lg">
            <TrendingUp className="h-5 w-5 text-white" />
          </div>
          <h4 className="font-semibold text-gray-900">Trend Analysis</h4>
        </div>
        <p className="text-gray-700 leading-relaxed">{trend}</p>
      </div>

      {/* Recommendations */}
      <div className="card-pulse p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gradient-to-r from-[#FF5F6D] to-[#FFC371] rounded-lg">
            <Lightbulb className="h-5 w-5 text-white" />
          </div>
          <h4 className="font-semibold text-gray-900">Recommendations</h4>
        </div>
        <p className="text-gray-700 leading-relaxed">{recommendation}</p>
      </div>
    </div>
  );
};

export default AIInsights;
