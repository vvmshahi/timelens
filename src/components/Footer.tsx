
import React from 'react';
import { Github, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-8 mt-16">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <div className="flex items-center justify-center space-x-6 mb-4">
          <span className="text-gray-600">Built by Shahin</span>
          <span className="text-gray-400">•</span>
          <span className="text-gray-600">Powered by AI</span>
          <span className="text-gray-400">•</span>
          <div className="flex items-center space-x-3">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
        <p className="text-sm text-gray-500">
          © 2025 TimeLens. Transforming data into actionable insights.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
