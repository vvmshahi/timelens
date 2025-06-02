
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import FileUpload from '@/components/FileUpload';
import TimeSeriesChart from '@/components/TimeSeriesChart';
import AdvancedInsightsPanel from '@/components/AdvancedInsightsPanel';
import AIInsights from '@/components/AIInsights';
import Footer from '@/components/Footer';
import { parseCSV, generateForecast } from '@/utils/csvParser';
import { generateAdvancedInsights } from '@/utils/enhancedAnalytics';
import { useAIInsights } from '@/hooks/useAIInsights';
import { supabase } from '@/integrations/supabase/client';
import { RotateCcw, Zap, TrendingUp, Brain, BarChart3, Shield, Globe } from 'lucide-react';
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

      // Generate GPT-powered insights
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <div className="text-center">
            <div className="flex justify-center items-center gap-3 mb-8">
              <div className="p-3 bg-blue-600 rounded-xl">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-6xl font-bold text-white">
                Time<span className="text-blue-400">Lens</span>
              </h1>
            </div>
            
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed mb-12">
              Transform your time series data into actionable business intelligence with 
              enterprise-grade AI analytics and forecasting capabilities
            </p>
            
            {/* Trust Indicators */}
            <div className="flex justify-center items-center gap-8 text-blue-200 text-sm">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>Enterprise Security</span>
              </div>
              <div className="flex items-center gap-2">
                <Brain className="h-4 w-4" />
                <span>AI-Powered</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <span>Global Scale</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {data.length === 0 ? (
          <div className="max-w-2xl mx-auto">
            {/* Upload Section */}
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Get Started with Your Data Analysis
              </h2>
              <p className="text-lg text-slate-600">
                Upload your CSV file to unlock powerful insights and forecasting capabilities
              </p>
            </div>
            <FileUpload onFileUpload={handleFileUpload} isLoading={isProcessing} />
            
            {/* Features Preview */}
            <div className="grid md:grid-cols-3 gap-6 mt-16">
              <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-slate-200">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Advanced Analytics</h3>
                <p className="text-slate-600 text-sm">Statistical analysis with trend detection and pattern recognition</p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-slate-200">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">TimeGPT Forecasting</h3>
                <p className="text-slate-600 text-sm">Professional-grade forecasting with confidence intervals</p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-slate-200">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Brain className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">AI Insights</h3>
                <p className="text-slate-600 text-sm">Natural language insights and actionable recommendations</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Results Header */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">Analysis Complete</h3>
                    <p className="text-slate-600">
                      Processing <span className="font-medium text-slate-900">{fileName}</span>
                    </p>
                  </div>
                  
                  <div className="flex gap-2">
                    {forecastModel === 'timegpt' && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium text-purple-700 bg-purple-100 rounded-full">
                        <Zap className="h-3 w-3" />
                        TimeGPT Enhanced
                      </span>
                    )}
                    {aiInsights && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-full">
                        <Brain className="h-3 w-3" />
                        AI Powered
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-3">
                  {forecastModel === 'simple' && (
                    <Button 
                      variant="outline" 
                      onClick={generateTimeGPTForecast}
                      disabled={isProcessing}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0 hover:from-purple-700 hover:to-blue-700"
                    >
                      <TrendingUp className="h-4 w-4 mr-2" />
                      {isProcessing ? 'Generating...' : 'Upgrade to TimeGPT'}
                    </Button>
                  )}
                  <Button 
                    variant="outline" 
                    onClick={handleReset}
                    className="border-slate-300 hover:bg-slate-50"
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
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
