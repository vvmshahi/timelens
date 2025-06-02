
import React, { useRef } from 'react';
import { Upload, FileText, CheckCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  isLoading?: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload, isLoading }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'text/csv') {
      onFileUpload(file);
    } else {
      alert('Please select a valid CSV file');
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type === 'text/csv') {
      onFileUpload(file);
    } else {
      alert('Please drop a valid CSV file');
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div
        className="relative upload-pulse p-12 text-center cursor-pointer group"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={handleClick}
      >
        {/* Upload Icon */}
        <div className="w-20 h-20 bg-gradient-to-r from-[#FF5F6D] to-[#FFA726] rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300">
          <Upload className="h-10 w-10 text-white" />
        </div>
        
        {/* Title */}
        <h3 className="text-3xl font-bold text-gray-900 mb-4">
          Upload Your Time Series Data
        </h3>
        
        {/* Description */}
        <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
          Drag and drop your CSV file here, or click to browse.<br />
          <span className="text-orange-pulse font-medium">Supported format: CSV with date/time and value columns</span>
        </p>
        
        {/* Upload Button */}
        <Button 
          disabled={isLoading} 
          className="btn-pulse text-lg h-14 px-10 mb-8"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
              Processing...
            </>
          ) : (
            <>
              <FileText className="h-5 w-5 mr-3" />
              Choose File
            </>
          )}
        </Button>
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="flex items-center justify-center gap-3 text-gray-600">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span className="font-medium">Secure Processing</span>
          </div>
          <div className="flex items-center justify-center gap-3 text-gray-600">
            <Sparkles className="h-5 w-5 text-orange-pulse" />
            <span className="font-medium">AI-Powered Analysis</span>
          </div>
          <div className="flex items-center justify-center gap-3 text-gray-600">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span className="font-medium">Instant Results</span>
          </div>
        </div>
        
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default FileUpload;
