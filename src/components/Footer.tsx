
import React from 'react';
import { Github, Linkedin, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center">
          <p className="text-gray-600 text-lg leading-relaxed">
            Part of the <span className="text-pulse-gradient font-semibold">AI Intelligence Suite</span> · 
            Built with AI <Heart className="inline h-4 w-4 text-red-500 mx-1" /> by{' '}
            <a 
              href="https://www.shahin.studio/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-orange-pulse font-semibold hover:text-[#FF5F6D] transition-colors duration-200"
            >
              Shahin
            </a>
          </p>
          
          <div className="flex justify-center items-center gap-4 mt-6">
            <a 
              href="https://github.com/vvmshahi" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 bg-gray-100 hover:bg-orange-100 rounded-lg flex items-center justify-center transition-colors duration-200 group"
            >
              <Github className="h-5 w-5 text-gray-600 group-hover:text-orange-pulse" />
            </a>
            <a 
              href="https://www.linkedin.com/in/vvmshahin" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 bg-gray-100 hover:bg-orange-100 rounded-lg flex items-center justify-center transition-colors duration-200 group"
            >
              <Linkedin className="h-5 w-5 text-gray-600 group-hover:text-orange-pulse" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
