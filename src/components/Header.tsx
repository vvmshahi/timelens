
import React from 'react';
import { BarChart3, Github, Linkedin } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 header-pulse">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-[#FF5F6D] to-[#FFA726] rounded-lg">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold">
              Time<span className="text-orange-pulse">Lens</span>
            </h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a 
              href="#" 
              className="text-gray-700 hover:text-orange-pulse transition-colors duration-200 font-medium"
            >
              Home
            </a>
            <a 
              href="#" 
              className="text-gray-700 hover:text-orange-pulse transition-colors duration-200 font-medium"
            >
              About
            </a>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-700 hover:text-orange-pulse transition-colors duration-200 font-medium"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-700 hover:text-orange-pulse transition-colors duration-200 font-medium"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="p-2 text-gray-700 hover:text-orange-pulse">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
