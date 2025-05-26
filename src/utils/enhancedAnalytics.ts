
interface TimeSeriesData {
  date: string;
  value: number;
}

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

export const generateAdvancedInsights = (data: TimeSeriesData[]): AdvancedInsights => {
  if (data.length === 0) {
    return {
      summary: "No data available for analysis.",
      statisticalAnalysis: {
        mean: 0, median: 0, standardDeviation: 0, variance: 0,
        skewness: 0, kurtosis: 0, trend: "unknown", seasonality: "unknown", stationarity: "unknown"
      },
      dataQuality: { completeness: 0, outliers: 0, missingValues: 0, consistency: "poor" },
      patterns: { trendDirection: "unknown", trendStrength: 0, volatility: "unknown", cyclicalPatterns: "none" },
      recommendations: ["Please upload valid time series data."]
    };
  }

  const values = data.map(d => d.value);
  const n = values.length;

  // Statistical calculations
  const mean = values.reduce((sum, val) => sum + val, 0) / n;
  const sortedValues = [...values].sort((a, b) => a - b);
  const median = n % 2 === 0 
    ? (sortedValues[n/2 - 1] + sortedValues[n/2]) / 2 
    : sortedValues[Math.floor(n/2)];

  const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / (n - 1);
  const standardDeviation = Math.sqrt(variance);

  // Skewness calculation
  const skewness = (values.reduce((sum, val) => sum + Math.pow((val - mean) / standardDeviation, 3), 0) / n);

  // Kurtosis calculation
  const kurtosis = (values.reduce((sum, val) => sum + Math.pow((val - mean) / standardDeviation, 4), 0) / n) - 3;

  // Trend analysis
  const firstHalf = values.slice(0, Math.floor(n / 2));
  const secondHalf = values.slice(Math.floor(n / 2));
  const firstAvg = firstHalf.reduce((sum, val) => sum + val, 0) / firstHalf.length;
  const secondAvg = secondHalf.reduce((sum, val) => sum + val, 0) / secondHalf.length;
  
  const trendDirection = secondAvg > firstAvg * 1.05 ? 'upward' : 
                        secondAvg < firstAvg * 0.95 ? 'downward' : 'stable';
  const trendStrength = Math.abs(secondAvg - firstAvg) / firstAvg;

  // Volatility analysis
  const coefficientOfVariation = standardDeviation / mean;
  const volatility = coefficientOfVariation > 0.3 ? 'high' : 
                    coefficientOfVariation > 0.15 ? 'moderate' : 'low';

  // Outlier detection (using IQR method)
  const q1 = sortedValues[Math.floor(n * 0.25)];
  const q3 = sortedValues[Math.floor(n * 0.75)];
  const iqr = q3 - q1;
  const outliers = values.filter(val => val < q1 - 1.5 * iqr || val > q3 + 1.5 * iqr).length;

  // Data quality assessment
  const completeness = 100; // Assuming no missing values in parsed data
  const consistency = outliers < n * 0.1 ? 'high' : outliers < n * 0.2 ? 'moderate' : 'low';

  // Generate natural language summary
  const summary = generateNaturalLanguageSummary({
    mean, median, standardDeviation, trendDirection, trendStrength, 
    volatility, n, outliers, skewness, kurtosis
  });

  // Generate recommendations
  const recommendations = generateRecommendations({
    trendDirection, volatility, outliers, n, coefficientOfVariation, skewness
  });

  return {
    summary,
    statisticalAnalysis: {
      mean: parseFloat(mean.toFixed(2)),
      median: parseFloat(median.toFixed(2)),
      standardDeviation: parseFloat(standardDeviation.toFixed(2)),
      variance: parseFloat(variance.toFixed(2)),
      skewness: parseFloat(skewness.toFixed(2)),
      kurtosis: parseFloat(kurtosis.toFixed(2)),
      trend: trendDirection,
      seasonality: detectSeasonality(data),
      stationarity: assessStationarity(values)
    },
    dataQuality: {
      completeness,
      outliers,
      missingValues: 0,
      consistency
    },
    patterns: {
      trendDirection,
      trendStrength: parseFloat(trendStrength.toFixed(3)),
      volatility,
      cyclicalPatterns: detectCyclicalPatterns(data)
    },
    recommendations
  };
};

const generateNaturalLanguageSummary = (stats: any): string => {
  const { mean, median, standardDeviation, trendDirection, trendStrength, volatility, n, outliers, skewness, kurtosis } = stats;
  
  let summary = `Your time series dataset contains ${n} observations with an average value of ${mean.toFixed(2)}. `;
  
  // Distribution description
  if (Math.abs(skewness) < 0.5) {
    summary += `The data follows a relatively normal distribution `;
  } else if (skewness > 0.5) {
    summary += `The data is right-skewed with occasional high values `;
  } else {
    summary += `The data is left-skewed with occasional low values `;
  }
  
  summary += `and shows ${volatility} volatility (${(standardDeviation/mean*100).toFixed(1)}% coefficient of variation). `;
  
  // Trend description
  if (trendDirection === 'upward') {
    summary += `There's a clear upward trend with ${(trendStrength*100).toFixed(1)}% growth over the period. `;
  } else if (trendDirection === 'downward') {
    summary += `The data shows a declining trend with ${(trendStrength*100).toFixed(1)}% decrease over the period. `;
  } else {
    summary += `The values remain relatively stable with no significant trend. `;
  }
  
  // Outlier description
  if (outliers > 0) {
    summary += `${outliers} outlier${outliers > 1 ? 's were' : ' was'} detected, representing ${(outliers/n*100).toFixed(1)}% of the data. `;
  } else {
    summary += `No significant outliers were detected in the dataset. `;
  }
  
  return summary;
};

const generateRecommendations = (analysis: any): string[] => {
  const { trendDirection, volatility, outliers, n, coefficientOfVariation, skewness } = analysis;
  const recommendations: string[] = [];
  
  if (n < 30) {
    recommendations.push("Consider collecting more data points for more reliable forecasting and analysis.");
  }
  
  if (volatility === 'high') {
    recommendations.push("High volatility detected. Consider implementing risk management strategies and monitoring for sudden changes.");
  }
  
  if (outliers > n * 0.1) {
    recommendations.push("Multiple outliers detected. Investigate potential data quality issues or exceptional events.");
  }
  
  if (trendDirection === 'upward' && volatility === 'low') {
    recommendations.push("Stable growth pattern detected. This is ideal for scaling operations and long-term planning.");
  }
  
  if (trendDirection === 'downward') {
    recommendations.push("Declining trend identified. Consider implementing corrective measures and investigating root causes.");
  }
  
  if (Math.abs(skewness) > 1) {
    recommendations.push("Data shows significant skewness. Consider using robust statistical methods for analysis.");
  }
  
  if (volatility === 'low' && trendDirection === 'stable') {
    recommendations.push("Stable, predictable pattern. Excellent foundation for optimization and efficiency improvements.");
  }
  
  return recommendations;
};

const detectSeasonality = (data: TimeSeriesData[]): string => {
  if (data.length < 14) return "insufficient_data";
  
  // Simple seasonality detection based on autocorrelation
  const values = data.map(d => d.value);
  const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
  
  // Check for weekly patterns (7 days)
  if (data.length >= 14) {
    let weeklyCorrelation = 0;
    const limit = Math.min(values.length - 7, 20);
    
    for (let i = 0; i < limit; i++) {
      weeklyCorrelation += (values[i] - mean) * (values[i + 7] - mean);
    }
    
    if (Math.abs(weeklyCorrelation) > 0.3 * limit) {
      return "weekly_pattern_detected";
    }
  }
  
  return "no_clear_seasonality";
};

const assessStationarity = (values: number[]): string => {
  if (values.length < 10) return "insufficient_data";
  
  // Simple stationarity test based on variance across segments
  const segmentSize = Math.floor(values.length / 3);
  const segments = [
    values.slice(0, segmentSize),
    values.slice(segmentSize, 2 * segmentSize),
    values.slice(2 * segmentSize)
  ];
  
  const variances = segments.map(segment => {
    const mean = segment.reduce((sum, val) => sum + val, 0) / segment.length;
    return segment.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / segment.length;
  });
  
  const maxVar = Math.max(...variances);
  const minVar = Math.min(...variances);
  
  if (maxVar / minVar > 2) {
    return "non_stationary";
  } else {
    return "likely_stationary";
  }
};

const detectCyclicalPatterns = (data: TimeSeriesData[]): string => {
  if (data.length < 20) return "insufficient_data";
  
  // Simple cycle detection
  const values = data.map(d => d.value);
  const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
  
  let crossings = 0;
  for (let i = 1; i < values.length; i++) {
    if ((values[i-1] - mean) * (values[i] - mean) < 0) {
      crossings++;
    }
  }
  
  const crossingRate = crossings / values.length;
  
  if (crossingRate > 0.3) {
    return "high_frequency_cycles";
  } else if (crossingRate > 0.1) {
    return "moderate_cycles";
  } else {
    return "low_cyclical_activity";
  }
};
