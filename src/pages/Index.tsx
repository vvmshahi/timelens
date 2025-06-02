import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FileUpload from '@/components/FileUpload';
import TimeSeriesChart from '@/components/TimeSeriesChart';
import AdvancedInsightsPanel from '@/components/AdvancedInsightsPanel';
import AIInsights from '@/components/AIInsights';
import Footer from '@/components/Footer';
import { parseCSV, generateForecast } from '@/utils/csvParser';
import { generateAdvancedInsights } from '@/utils/enhancedAnalytics';
import { useAIInsights } from '@/hooks/useAIInsights';
import { supabase } from '@/integrations/supabase/client';
import { RotateCcw, Brain, Sparkles } from 'lucide-react';
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
  const { insights: aiInsights, isLoading: aiLoading, generateInsights } = useAIInsights();
  const uploadRef = useRef<HTMLDivElement>(null);

  const scrollToUpload = () => {
    uploadRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

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

      const forecastData = generateForecast(parsedData, 7);
      
      const combinedData: DataPoint[] = [
        ...parsedData.map(d => ({ ...d, forecast: undefined })),
        ...forecastData.map(d => ({ date: d.date, value: undefined as any, forecast: d.value }))
      ];

      setData(combinedData);

      const enhancedInsights = generateAdvancedInsights(parsedData);
      setInsights(enhancedInsights);

      await generateInsights(parsedData, {
        mean: enhancedInsights.statisticalAnalysis.mean,
        median: enhancedInsights.statisticalAnalysis.median,
        standardDeviation: enhancedInsights.statisticalAnalysis.standardDeviation,
        variance: enhancedInsights.statisticalAnalysis.variance,
        trend: enhancedInsights.patterns.trendDirection,
        volatility: enhancedInsights.patterns.volatility,
        outliers: enhancedInsights.dataQuality.outliers,
      });

      toast({
        title: "Analysis Complete",
        description: `Successfully analyzed ${parsedData.length} data points with AI-powered insights.`,
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
    <div className="min-h-screen bg-[#FDFDFD]">
      <Header />
      
      {data.length === 0 ? (
        <>
          <HeroSection onGetStarted={scrollToUpload} />
          
          <section ref={uploadRef} className="py-20 bg-[#F9FAFB]">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Upload Your Data to Get Started
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Transform your time series data into actionable insights with our AI-powered analytics platform
                </p>
              </div>
              <FileUpload onFileUpload={handleFileUpload} isLoading={isProcessing} />
            </div>
          </section>
        </>
      ) : (
        <div className="max-w-7xl mx-auto px-6 py-12 space-y-8">
          {/* Results Header */}
          <div className="card-pulse p-8">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Analysis Complete</h3>
                  <p className="text-gray-600 text-lg">
                    Processing <span className="font-semibold text-orange-pulse">{fileName}</span>
                  </p>
                </div>
                
                <div className="flex gap-2">
                  {forecastModel === 'timegpt' && (
                    <span className="inline-flex items-center gap-1 px-4 py-2 text-sm font-medium text-purple-700 bg-purple-100 rounded-full">
                      <Sparkles className="h-4 w-4" />
                      TimeGPT Enhanced
                    </span>
                  )}
                  {aiInsights && (
                    <span className="inline-flex items-center gap-1 px-4 py-2 text-sm font-medium text-orange-700 bg-orange-100 rounded-full">
                      <Brain className="h-4 w-4" />
                      AI Powered
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  onClick={handleReset}
                  className="border-gray-300 hover:border-orange-pulse hover:text-orange-pulse h-12 px-6"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  New Analysis
                </Button>
              </div>
            </div>
          </div>

          {/* Chart Section */}
          <TimeSeriesChart 
            data={data} 
            title={`Time Series Analysis & Forecast ${forecastModel === 'timegpt' ? '(TimeGPT Enhanced)' : ''}`}
            showConfidenceIntervals={forecastModel === 'timegpt'}
          />

          {/* AI Insights */}
          {aiInsights && (
            <AIInsights
              summary={aiInsights.summary}
              trend={aiInsights.trend}
              recommendation={aiInsights.recommendation}
              isLoading={aiLoading}
            />
          )}

          {/* Advanced Analytics */}
          {insights && (
            <AdvancedInsightsPanel insights={insights} />
          )}
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default Index;
