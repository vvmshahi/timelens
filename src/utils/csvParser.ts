
interface TimeSeriesData {
  date: string;
  value: number;
}

export const parseCSV = (csvText: string): TimeSeriesData[] => {
  const lines = csvText.trim().split('\n');
  const data: TimeSeriesData[] = [];
  
  // Skip header row
  for (let i = 1; i < lines.length; i++) {
    const row = lines[i].split(',');
    if (row.length >= 2) {
      const dateStr = row[0].trim();
      const valueStr = row[1].trim();
      
      // Try to parse the date
      const date = new Date(dateStr);
      const value = parseFloat(valueStr);
      
      if (!isNaN(date.getTime()) && !isNaN(value)) {
        data.push({
          date: date.toISOString().split('T')[0], // Format as YYYY-MM-DD
          value: value
        });
      }
    }
  }
  
  // Sort by date
  return data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

export const generateForecast = (historicalData: TimeSeriesData[], steps: number = 7): TimeSeriesData[] => {
  if (historicalData.length === 0) return [];
  
  const lastValue = historicalData[historicalData.length - 1].value;
  const lastDate = new Date(historicalData[historicalData.length - 1].date);
  
  // Simple linear trend calculation
  const recentData = historicalData.slice(-Math.min(10, historicalData.length));
  let trend = 0;
  
  if (recentData.length > 1) {
    const firstValue = recentData[0].value;
    const lastValueRecent = recentData[recentData.length - 1].value;
    trend = (lastValueRecent - firstValue) / recentData.length;
  }
  
  const forecast: TimeSeriesData[] = [];
  
  for (let i = 1; i <= steps; i++) {
    const forecastDate = new Date(lastDate);
    forecastDate.setDate(forecastDate.getDate() + i);
    
    // Add some randomness to make it more realistic
    const randomFactor = 0.05; // 5% random variation
    const randomMultiplier = 1 + (Math.random() - 0.5) * randomFactor;
    
    const forecastValue = (lastValue + (trend * i)) * randomMultiplier;
    
    forecast.push({
      date: forecastDate.toISOString().split('T')[0],
      value: Math.max(0, forecastValue) // Ensure non-negative values
    });
  }
  
  return forecast;
};
