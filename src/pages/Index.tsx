
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import FileUpload from '@/components/FileUpload';
import TimeSeriesChart from '@/components/TimeSeriesChart';
import AIInsights from '@/components/AIInsights';
import Footer from '@/components/Footer';
import { parseCSV, generateForecast } from '@/utils/csvParser';
import { generateAIInsights } from '@/utils/aiInsights';
import { RotateCcw } from 'lucide-react';

interface DataPoint {
  date: string;
  value: number;
  forecast?: number;
}

const Index = () => {
  const [data, setData] = useState<DataPoint[]>([]);
  const [insights, setInsights] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [fileName, setFileName] = useState<string>('');

  const handleFileUpload = async (file: File) => {
    setIsProcessing(true);
    setFileName(file.name);
    
    try {
      const text = await file.text();
      const parsedData = parseCSV(text);
      
      if (parsedData.length === 0) {
        alert('No valid data found in the CSV file. Please ensure it has date and value columns.');
        setIsProcessing(false);
        return;
      }

      // Generate forecast
      const forecastData = generateForecast(parsedData, 7);
      
      // Combine historical and forecast data
      const combinedData: DataPoint[] = [
        ...parsedData.map(d => ({ ...d, forecast: undefined })),
        ...forecastData.map(d => ({ date: d.date, value: undefined as any, forecast: d.value }))
      ];

      setData(combinedData);

      // Generate AI insights
      const aiInsights = generateAIInsights(parsedData);
      setInsights(aiInsights);
      
    } catch (error) {
      console.error('Error processing file:', error);
      alert('Error processing the file. Please check the format and try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setData([]);
    setInsights(null);
    setFileName('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4 font-inter">
            Time<span className="text-primary">Lens</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Your data, future-ready. Upload a CSV and get instant trend insights and projections.
          </p>
        </div>

        {/* Main Content */}
        {data.length === 0 ? (
          <div className="flex justify-center">
            <FileUpload onFileUpload={handleFileUpload} isLoading={isProcessing} />
          </div>
        ) : (
          <div className="space-y-8">
            {/* File Info and Reset */}
            <div className="flex items-center justify-between bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center space-x-3">
                <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">
                  File processed: <span className="font-medium">{fileName}</span>
                </span>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleReset}
                className="flex items-center gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                Upload Another Dataset
              </Button>
            </div>

            {/* Chart */}
            <TimeSeriesChart 
              data={data} 
              title="Historical Data & 7-Day Forecast"
            />

            {/* AI Insights */}
            {insights && (
              <AIInsights
                summary={insights.summary}
                trend={insights.trend}
                recommendation={insights.recommendation}
                isLoading={isProcessing}
              />
            )}
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
