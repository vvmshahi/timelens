
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  ComposedChart,
} from 'recharts';
import { TrendingUp } from 'lucide-react';

interface DataPoint {
  date: string;
  value?: number;
  forecast?: number;
  lower_80?: number;
  upper_80?: number;
  lower_95?: number;
  upper_95?: number;
}

interface TimeSeriesChartProps {
  data: DataPoint[];
  title: string;
  showConfidenceIntervals?: boolean;
}

const TimeSeriesChart: React.FC<TimeSeriesChartProps> = ({ 
  data, 
  title, 
  showConfidenceIntervals = false 
}) => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900 mb-2">{formatDate(label)}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value?.toFixed(2)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card-pulse p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-[#FF5F6D] to-[#FFC371] rounded-lg">
          <TrendingUp className="h-5 w-5 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      </div>

      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          {showConfidenceIntervals ? (
            <ComposedChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="date" 
                tickFormatter={formatDate}
                stroke="#6b7280"
                fontSize={12}
              />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              
              {/* Confidence intervals */}
              <Area
                type="monotone"
                dataKey="upper_95"
                stroke="none"
                fill="#e0e7ff"
                fillOpacity={0.3}
              />
              <Area
                type="monotone"
                dataKey="lower_95"
                stroke="none"
                fill="#ffffff"
                fillOpacity={1}
              />
              <Area
                type="monotone"
                dataKey="upper_80"
                stroke="none"
                fill="#c7d2fe"
                fillOpacity={0.5}
              />
              <Area
                type="monotone"
                dataKey="lower_80"
                stroke="none"
                fill="#ffffff"
                fillOpacity={1}
              />
              
              {/* Actual data line */}
              <Line
                type="monotone"
                dataKey="value"
                stroke="#60a5fa"
                strokeWidth={2}
                dot={false}
                name="Historical Data"
              />
              
              {/* Forecast line */}
              <Line
                type="monotone"
                dataKey="forecast"
                stroke="#a855f7"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
                name="Forecast"
              />
            </ComposedChart>
          ) : (
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="date" 
                tickFormatter={formatDate}
                stroke="#6b7280"
                fontSize={12}
              />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              
              <Line
                type="monotone"
                dataKey="value"
                stroke="#60a5fa"
                strokeWidth={2.5}
                dot={false}
                name="Historical Data"
              />
              
              <Line
                type="monotone"
                dataKey="forecast"
                stroke="#a855f7"
                strokeWidth={2.5}
                strokeDasharray="5 5"
                dot={false}
                name="Forecast"
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 flex items-center gap-6 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <div className="w-3 h-0.5 bg-blue-400"></div>
          <span>Historical Data</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-0.5 bg-purple-500 border-dashed"></div>
          <span>Forecast</span>
        </div>
        {showConfidenceIntervals && (
          <>
            <div className="flex items-center gap-2">
              <div className="w-3 h-2 bg-indigo-200 opacity-50"></div>
              <span>80% Confidence</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-2 bg-indigo-100 opacity-30"></div>
              <span>95% Confidence</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TimeSeriesChart;
