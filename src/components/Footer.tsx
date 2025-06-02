
import React from 'react';
import { Github, Linkedin, Mail, Shield, Zap, Brain } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold">TimeLens</h3>
            </div>
            <p className="text-slate-300 text-lg leading-relaxed mb-6 max-w-md">
              Enterprise-grade time series analytics platform powered by artificial intelligence. 
              Transform your data into strategic business insights.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center justify-center transition-colors duration-200"
              >
                <Github className="h-5 w-5" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center justify-center transition-colors duration-200"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="mailto:contact@timelens.ai" 
                className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center justify-center transition-colors duration-200"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Platform Features</h4>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-blue-400" />
                <span>TimeGPT Forecasting</span>
              </li>
              <li className="flex items-center gap-2">
                <Brain className="h-4 w-4 text-blue-400" />
                <span>AI-Powered Insights</span>
              </li>
              <li className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-blue-400" />
                <span>Enterprise Security</span>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Company</h4>
            <ul className="space-y-3 text-slate-300">
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200">About Us</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200">Careers</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200">Terms of Service</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-slate-400 text-sm mb-4 md:mb-0">
            © 2025 TimeLens Technologies. All rights reserved. Built by Shahin with AI.
          </div>
          <div className="flex items-center gap-6 text-sm text-slate-400">
            <span>Powered by OpenAI & Nixtla</span>
            <span>•</span>
            <span>Enterprise Ready</span>
            <span>•</span>
            <span>Global Scale</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
