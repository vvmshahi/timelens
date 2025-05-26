
interface TimeSeriesData {
  date: string;
  value: number;
}

interface AIInsight {
  summary: string;
  trend: string;
  recommendation: string;
}

export const generateAIInsights = (data: TimeSeriesData[]): AIInsight => {
  if (data.length === 0) {
    return {
      summary: "No data available for analysis.",
      trend: "Unable to determine trend without data.",
      recommendation: "Please upload a valid CSV file with time series data."
    };
  }

  // Calculate basic statistics
  const values = data.map(d => d.value);
  const avgValue = values.reduce((sum, val) => sum + val, 0) / values.length;
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  
  // Calculate trend
  const firstHalf = values.slice(0, Math.floor(values.length / 2));
  const secondHalf = values.slice(Math.floor(values.length / 2));
  const firstAvg = firstHalf.reduce((sum, val) => sum + val, 0) / firstHalf.length;
  const secondAvg = secondHalf.reduce((sum, val) => sum + val, 0) / secondHalf.length;
  
  const trendDirection = secondAvg > firstAvg ? 'upward' : secondAvg < firstAvg ? 'downward' : 'stable';
  const trendStrength = Math.abs(secondAvg - firstAvg) / firstAvg;
  
  // Calculate volatility
  const variance = values.reduce((sum, val) => sum + Math.pow(val - avgValue, 2), 0) / values.length;
  const volatility = Math.sqrt(variance) / avgValue;
  
  // Generate insights based on analysis
  const summary = generateSummary(avgValue, minValue, maxValue, trendDirection, trendStrength);
  const trend = generateTrendAnalysis(trendDirection, trendStrength, volatility);
  const recommendation = generateRecommendation(trendDirection, volatility, avgValue);
  
  return { summary, trend, recommendation };
};

const generateSummary = (avg: number, min: number, max: number, direction: string, strength: number): string => {
  const range = max - min;
  const strengthDesc = strength > 0.2 ? 'strong' : strength > 0.1 ? 'moderate' : 'mild';
  
  return `The dataset shows an average value of ${avg.toFixed(2)} with a range from ${min.toFixed(2)} to ${max.toFixed(2)}. The overall trend is ${direction} with ${strengthDesc} momentum, indicating ${direction === 'upward' ? 'growth' : direction === 'downward' ? 'decline' : 'stability'} over the analyzed period.`;
};

const generateTrendAnalysis = (direction: string, strength: number, volatility: number): string => {
  const volatilityDesc = volatility > 0.3 ? 'high' : volatility > 0.15 ? 'moderate' : 'low';
  const strengthDesc = strength > 0.2 ? 'strong' : strength > 0.1 ? 'moderate' : 'weak';
  
  if (direction === 'upward') {
    return `The data exhibits a ${strengthDesc} upward trend with ${volatilityDesc} volatility. This suggests ${volatility > 0.3 ? 'rapid but unstable growth' : 'consistent positive momentum'} that could continue if current conditions persist.`;
  } else if (direction === 'downward') {
    return `A ${strengthDesc} downward trend is observed with ${volatilityDesc} volatility. This indicates ${volatility > 0.3 ? 'sharp decline with fluctuations' : 'steady declining pattern'} that may require intervention.`;
  } else {
    return `The trend remains relatively stable with ${volatilityDesc} volatility. This suggests ${volatility > 0.3 ? 'fluctuating equilibrium' : 'consistent performance'} around the mean value.`;
  }
};

const generateRecommendation = (direction: string, volatility: number, avgValue: number): string => {
  if (direction === 'upward' && volatility < 0.2) {
    return "Consider scaling operations to capitalize on the positive growth trend while monitoring for potential market saturation.";
  } else if (direction === 'upward' && volatility > 0.3) {
    return "While growth is present, high volatility suggests implementing risk management strategies to protect against sudden reversals.";
  } else if (direction === 'downward' && volatility < 0.2) {
    return "The consistent decline indicates systematic issues that require strategic intervention and operational adjustments.";
  } else if (direction === 'downward' && volatility > 0.3) {
    return "High volatility during decline suggests market instability - focus on stabilization measures before growth initiatives.";
  } else if (volatility > 0.3) {
    return "High volatility in stable trends suggests implementing monitoring systems and contingency plans for rapid response to changes.";
  } else {
    return "Stable performance provides an opportunity to optimize current operations and explore strategic expansion initiatives.";
  }
};
