
import React from 'react';
import { TrendingUp, TrendingDown, Activity, AlertTriangle, CheckCircle, BarChart3 } from 'lucide-react';

interface AdvancedInsights {
  summary: string;
  statisticalAnalysis: {
    mean: number;
    median: number;
    standardDeviation: number;
    variance: number;
    skewness: number;
    kurtosis: number;
    trend: string;
    seasonality: string;
    stationarity: string;
  };
  dataQuality: {
    completeness: number;
    outliers: number;
    missingValues: number;
    consistency: string;
  };
  patterns: {
    trendDirection: string;
    trendStrength: number;
    volatility: string;
    cyclicalPatterns: string;
  };
  recommendations: string[];
}

interface AdvancedInsightsPanelProps {
  insights: AdvancedInsights;
}

const AdvancedInsightsPanel: React.FC<AdvancedInsightsPanelProps> = ({ insights }) => {
  const getTrendIcon = (direction: string) => {
    switch (direction) {
      case 'upward':
        return <TrendingUp className="h-5 w-5 text-green-500" />;
      case 'downward':
        return <TrendingDown className="h-5 w-5 text-red-500" />;
      default:
        return <Activity className="h-5 w-5 text-blue-500" />;
    }
  };

  const getQualityColor = (consistency: string) => {
    switch (consistency) {
      case 'high':
        return 'text-green-600 bg-green-50';
      case 'moderate':
        return 'text-yellow-600 bg-yellow-50';
      default:
        return 'text-red-600 bg-red-50';
    }
  };

  const getVolatilityColor = (volatility: string) => {
    switch (volatility) {
      case 'low':
        return 'text-green-600 bg-green-50';
      case 'moderate':
        return 'text-yellow-600 bg-yellow-50';
      default:
        return 'text-red-600 bg-red-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <BarChart3 className="h-6 w-6 text-primary" />
          <h3 className="text-xl font-semibold text-gray-900">Data Analysis Summary</h3>
        </div>
        <p className="text-gray-700 leading-relaxed">{insights.summary}</p>
      </div>

      {/* Statistical Analysis */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Statistical Analysis</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{insights.statisticalAnalysis.mean}</div>
            <div className="text-sm text-gray-600">Mean</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{insights.statisticalAnalysis.median}</div>
            <div className="text-sm text-gray-600">Median</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{insights.statisticalAnalysis.standardDeviation}</div>
            <div className="text-sm text-gray-600">Std Dev</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{insights.statisticalAnalysis.variance}</div>
            <div className="text-sm text-gray-600">Variance</div>
          </div>
        </div>
        
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            {getTrendIcon(insights.patterns.trendDirection)}
            <div>
              <div className="font-medium capitalize">{insights.patterns.trendDirection} Trend</div>
              <div className="text-sm text-gray-600">Strength: {(insights.patterns.trendStrength * 100).toFixed(1)}%</div>
            </div>
          </div>
          
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className={`inline-block px-2 py-1 rounded text-sm font-medium ${getVolatilityColor(insights.patterns.volatility)}`}>
              {insights.patterns.volatility.toUpperCase()} VOLATILITY
            </div>
            <div className="text-sm text-gray-600 mt-1">Market stability indicator</div>
          </div>
          
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className={`inline-block px-2 py-1 rounded text-sm font-medium ${getQualityColor(insights.dataQuality.consistency)}`}>
              {insights.dataQuality.consistency.toUpperCase()} QUALITY
            </div>
            <div className="text-sm text-gray-600 mt-1">{insights.dataQuality.outliers} outliers detected</div>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-500" />
          Recommendations
        </h4>
        <div className="space-y-3">
          {insights.recommendations.map((recommendation, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <div className="h-2 w-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
              <p className="text-gray-700">{recommendation}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdvancedInsightsPanel;
