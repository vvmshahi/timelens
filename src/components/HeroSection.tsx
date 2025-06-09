
import React from 'react';
import { Button } from '@/components/ui/button';
import { TrendingUp, Zap, Brain } from 'lucide-react';

interface HeroSectionProps {
  onGetStarted: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onGetStarted }) => {
  const backgroundPattern = "data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23F97316' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E";

  return (
    <section className="relative py-24 lg:py-32 bg-gradient-to-br from-[#FDFDFD] to-[#F9FAFB] overflow-hidden">
      {/* Background Elements */}
      <div 
        className="absolute inset-0 opacity-40" 
        style={{ backgroundImage: `url("${backgroundPattern}")` }}
      ></div>
      
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center">
          {/* Main Heading */}
          <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
            Transform Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5F6D] to-[#FFC371]">
              Time Series Data
            </span>
            <br />
            Into AI-Powered Insights
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl lg:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
            Enterprise-grade analytics platform that transforms CSV files into professional forecasts, 
            statistical insights, and actionable recommendations in seconds.
          </p>
          
          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100">
              <TrendingUp className="h-4 w-4 text-orange-pulse" />
              <span className="text-sm font-medium text-gray-700">Advanced Forecasting</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100">
              <Brain className="h-4 w-4 text-orange-pulse" />
              <span className="text-sm font-medium text-gray-700">AI-Powered Analysis</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100">
              <Zap className="h-4 w-4 text-orange-pulse" />
              <span className="text-sm font-medium text-gray-700">Instant Results</span>
            </div>
          </div>
          
          {/* CTA Button */}
          <Button
            onClick={onGetStarted}
            className="hero-cta text-lg px-8 py-4 h-auto"
          >
            Get Started - Upload Your Data
          </Button>
          
          {/* Trust Indicators */}
          <div className="mt-16 text-center">
            <p className="text-sm text-gray-500 mb-6">Trusted by data teams worldwide</p>
            <div className="flex justify-center items-center gap-8 opacity-60">
              <div className="text-2xl font-bold text-gray-400">TimeGPT</div>
              <div className="w-px h-6 bg-gray-300"></div>
              <div className="text-2xl font-bold text-gray-400">OpenAI</div>
              <div className="w-px h-6 bg-gray-300"></div>
              <div className="text-2xl font-bold text-gray-400">Supabase</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
