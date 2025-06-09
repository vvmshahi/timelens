
import React from 'react';
import { BarChart3, AlertTriangle, Activity } from 'lucide-react';

interface StatisticalAnalysis {
  mean: number;
  median: number;
  standardDeviation: number;
  variance: number;
  skewness: number;
  kurtosis: number;
}

interface Patterns {
  trendDirection: string;
  volatility: string;
  seasonality: string;
}

interface DataQuality {
  outliers: number[];
  missingValues: number;
  dataPoints: number;
}

interface AdvancedInsights {
  statisticalAnalysis: StatisticalAnalysis;
  patterns: Patterns;
  dataQuality: DataQuality;
}

interface AdvancedInsightsPanelProps {
  insights: AdvancedInsights;
}

const AdvancedInsightsPanel: React.FC<AdvancedInsightsPanelProps> = ({ insights }) => {
  const { statisticalAnalysis, patterns, dataQuality } = insights;

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {/* Statistical Analysis */}
      <div className="card-pulse p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-r from-[#FF5F6D] to-[#FFC371] rounded-lg">
            <BarChart3 className="h-5 w-5 text-white" />
          </div>
          <h4 className="font-semibold text-gray-900">Statistical Analysis</h4>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Mean:</span>
            <span className="font-medium">{statisticalAnalysis.mean.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Median:</span>
            <span className="font-medium">{statisticalAnalysis.median.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Std Deviation:</span>
            <span className="font-medium">{statisticalAnalysis.standardDeviation.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Variance:</span>
            <span className="font-medium">{statisticalAnalysis.variance.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Skewness:</span>
            <span className="font-medium">{statisticalAnalysis.skewness.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Kurtosis:</span>
            <span className="font-medium">{statisticalAnalysis.kurtosis.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Pattern Recognition */}
      <div className="card-pulse p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-r from-[#FF5F6D] to-[#FFC371] rounded-lg">
            <Activity className="h-5 w-5 text-white" />
          </div>
          <h4 className="font-semibold text-gray-900">Pattern Recognition</h4>
        </div>
        
        <div className="space-y-4">
          <div>
            <span className="text-gray-600 text-sm">Trend Direction:</span>
            <p className="font-medium text-gray-900">{patterns.trendDirection}</p>
          </div>
          <div>
            <span className="text-gray-600 text-sm">Volatility:</span>
            <p className="font-medium text-gray-900">{patterns.volatility}</p>
          </div>
          <div>
            <span className="text-gray-600 text-sm">Seasonality:</span>
            <p className="font-medium text-gray-900">{patterns.seasonality}</p>
          </div>
        </div>
      </div>

      {/* Data Quality */}
      <div className="card-pulse p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-r from-[#FF5F6D] to-[#FFC371] rounded-lg">
            <AlertTriangle className="h-5 w-5 text-white" />
          </div>
          <h4 className="font-semibold text-gray-900">Data Quality</h4>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Data Points:</span>
            <span className="font-medium">{dataQuality.dataPoints}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Missing Values:</span>
            <span className="font-medium">{dataQuality.missingValues}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Outliers Detected:</span>
            <span className="font-medium">{dataQuality.outliers.length}</span>
          </div>
          
          {dataQuality.outliers.length > 0 && (
            <div className="mt-4">
              <span className="text-gray-600 text-sm">Outlier Values:</span>
              <div className="mt-1 flex flex-wrap gap-1">
                {dataQuality.outliers.slice(0, 3).map((outlier, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded"
                  >
                    {outlier.toFixed(2)}
                  </span>
                ))}
                {dataQuality.outliers.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                    +{dataQuality.outliers.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdvancedInsightsPanel;
