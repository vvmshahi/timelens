
import React from 'react';
import { Button } from '@/components/ui/button';
import { TrendingUp, Brain, Zap } from 'lucide-react';

interface HeroSectionProps {
  onGetStarted: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onGetStarted }) => {
  return (
    <section className="relative overflow-hidden hero-pulse-pattern">
      <div className="max-w-7xl mx-auto px-6 py-24 lg:py-32">
        <div className="text-center">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
            Transform Data Into
            <br />
            <span className="text-pulse-gradient">Intelligent Insights</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12">
            Enterprise-grade time series analytics powered by AI. 
            Upload your data and get professional forecasts with actionable insights in seconds.
          </p>
          
          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button 
              onClick={onGetStarted}
              className="btn-pulse text-lg h-14 px-10 animate-glow"
            >
              <TrendingUp className="h-5 w-5 mr-3" />
              Get Started
            </Button>
            <Button 
              variant="outline" 
              className="h-14 px-10 text-lg border-gray-300 hover:border-orange-pulse hover:text-orange-pulse"
            >
              View Demo
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 text-gray-600">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Brain className="h-5 w-5 text-orange-pulse" />
              </div>
              <span className="font-medium">AI-Powered Analytics</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-gray-600">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Zap className="h-5 w-5 text-orange-pulse" />
              </div>
              <span className="font-medium">Enterprise Security</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-gray-600">
              <div className="p-2 bg-orange-100 rounded-lg">
                <TrendingUp className="h-5 w-5 text-orange-pulse" />
              </div>
              <span className="font-medium">Real-time Insights</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
