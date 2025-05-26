
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import FileUpload from '@/components/FileUpload';
import TimeSeriesChart from '@/components/TimeSeriesChart';
import AdvancedInsightsPanel from '@/components/AdvancedInsightsPanel';
import Footer from '@/components/Footer';
import { parseCSV, generateForecast } from '@/utils/csvParser';
import { generateAdvancedInsights } from '@/utils/enhancedAnalytics';
import { supabase } from '@/integrations/supabase/client';
import { RotateCcw, Zap, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DataPoint {
  date: string;
  value: number;
  forecast?: number;
  lower_80?: number;
  upper_80?: number;
  lower_95?: number;
  upper_95?: number;
}

const Index = () => {
  const [data, setData] = useState<DataPoint[]>([]);
  const [insights, setInsights] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [fileName, setFileName] = useState<string>('');
  const [forecastModel, setForecastModel] = useState<'simple' | 'timegpt'>('simple');
  const { toast } = useToast();

  const handleFileUpload = async (file: File) => {
    setIsProcessing(true);
    setFileName(file.name);
    
    try {
      const text = await file.text();
      const parsedData = parseCSV(text);
      
      if (parsedData.length === 0) {
        toast({
          title: "Invalid Data",
          description: "No valid data found in the CSV file. Please ensure it has date and value columns.",
          variant: "destructive",
        });
        setIsProcessing(false);
        return;
      }

      // Generate simple forecast first
      const forecastData = generateForecast(parsedData, 7);
      
      // Combine historical and forecast data
      const combinedData: DataPoint[] = [
        ...parsedData.map(d => ({ ...d, forecast: undefined })),
        ...forecastData.map(d => ({ date: d.date, value: undefined as any, forecast: d.value }))
      ];

      setData(combinedData);

      // Generate enhanced AI insights
      const enhancedInsights = generateAdvancedInsights(parsedData);
      setInsights(enhancedInsights);

      toast({
        title: "Analysis Complete",
        description: `Successfully analyzed ${parsedData.length} data points with enhanced insights.`,
      });
      
    } catch (error) {
      console.error('Error processing file:', error);
      toast({
        title: "Processing Error",
        description: "Error processing the file. Please check the format and try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const generateTimeGPTForecast = async () => {
    if (data.length === 0) return;

    setIsProcessing(true);
    try {
      const historicalData = data.filter(d => d.value !== undefined);
      
      const { data: forecastResult, error } = await supabase.functions.invoke('nixtla-forecast', {
        body: {
          data: historicalData,
          forecastHorizon: 7,
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      if (!forecastResult.success) {
        throw new Error(forecastResult.error);
      }

      // Combine historical data with TimeGPT forecast
      const historicalOnly = data.filter(d => d.value !== undefined);
      const combinedData: DataPoint[] = [
        ...historicalOnly,
        ...forecastResult.forecast
      ];

      setData(combinedData);
      setForecastModel('timegpt');

      toast({
        title: "TimeGPT Forecast Generated",
        description: "Professional-grade forecast with confidence intervals has been generated.",
      });

    } catch (error) {
      console.error('Error generating TimeGPT forecast:', error);
      toast({
        title: "Forecast Error",
        description: `Failed to generate TimeGPT forecast: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setData([]);
    setInsights(null);
    setFileName('');
    setForecastModel('simple');
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
            Professional time series analysis with AI-powered insights and advanced forecasting.
          </p>
        </div>

        {/* Main Content */}
        {data.length === 0 ? (
          <div className="flex justify-center">
            <FileUpload onFileUpload={handleFileUpload} isLoading={isProcessing} />
          </div>
        ) : (
          <div className="space-y-8">
            {/* File Info and Controls */}
            <div className="flex items-center justify-between bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center space-x-3">
                <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">
                  File processed: <span className="font-medium">{fileName}</span>
                </span>
                {forecastModel === 'timegpt' && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-purple-700 bg-purple-100 rounded-full">
                    <Zap className="h-3 w-3" />
                    TimeGPT Enhanced
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                {forecastModel === 'simple' && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={generateTimeGPTForecast}
                    disabled={isProcessing}
                    className="flex items-center gap-2"
                  >
                    <TrendingUp className="h-4 w-4" />
                    {isProcessing ? 'Generating...' : 'Upgrade to TimeGPT'}
                  </Button>
                )}
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
            </div>

            {/* Chart */}
            <TimeSeriesChart 
              data={data} 
              title={`Historical Data & 7-Day Forecast ${forecastModel === 'timegpt' ? '(TimeGPT Enhanced)' : ''}`}
              showConfidenceIntervals={forecastModel === 'timegpt'}
            />

            {/* Enhanced AI Insights */}
            {insights && (
              <AdvancedInsightsPanel insights={insights} />
            )}
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
