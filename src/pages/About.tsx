
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BarChart3, Brain, Zap, TrendingUp, FileText, Users } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FDFDFD]">
      <Header />
      
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-r from-[#FF5F6D] to-[#FFA726] rounded-2xl">
              <BarChart3 className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            About <span className="text-orange-pulse">TimeLens</span>
          </h1>
          <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            TimeLens is an AI-powered time series forecasting tool that allows users to upload CSV datasets and instantly generate accurate predictions. Designed for simplicity and speed, it helps uncover patterns and future trends through interactive visualizations, making data-driven decision-making more accessible to everyone.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="card-pulse p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-[#FF5F6D] to-[#FFC371] rounded-full flex items-center justify-center">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">AI-Powered Analysis</h3>
            <p className="text-gray-600">
              Advanced machine learning algorithms analyze your data to provide deep insights and accurate forecasts.
            </p>
          </div>

          <div className="card-pulse p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-[#FF5F6D] to-[#FFC371] rounded-full flex items-center justify-center">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Instant Results</h3>
            <p className="text-gray-600">
              Upload your CSV file and get comprehensive analysis and forecasts in seconds, not hours.
            </p>
          </div>

          <div className="card-pulse p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-[#FF5F6D] to-[#FFC371] rounded-full flex items-center justify-center">
              <TrendingUp className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Advanced Forecasting</h3>
            <p className="text-gray-600">
              Generate professional-grade forecasts with confidence intervals and statistical insights.
            </p>
          </div>

          <div className="card-pulse p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-[#FF5F6D] to-[#FFC371] rounded-full flex items-center justify-center">
              <FileText className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Simple CSV Upload</h3>
            <p className="text-gray-600">
              Just upload your time series data in CSV format and let TimeLens do the heavy lifting.
            </p>
          </div>

          <div className="card-pulse p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-[#FF5F6D] to-[#FFC371] rounded-full flex items-center justify-center">
              <BarChart3 className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Interactive Visualizations</h3>
            <p className="text-gray-600">
              Beautiful, interactive charts that make understanding your data trends intuitive and engaging.
            </p>
          </div>

          <div className="card-pulse p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-[#FF5F6D] to-[#FFC371] rounded-full flex items-center justify-center">
              <Users className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Accessible to Everyone</h3>
            <p className="text-gray-600">
              No technical expertise required. Designed for analysts, business users, and data enthusiasts alike.
            </p>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="card-pulse p-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We believe that powerful data analysis shouldn't require a PhD in statistics or expensive enterprise software. 
            TimeLens democratizes time series forecasting by making it accessible, fast, and intuitive for everyone who needs 
            to understand their data trends and make informed decisions about the future.
          </p>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default About;
