
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, ComposedChart } from 'recharts';

interface DataPoint {
  date: string;
  value: number;
  forecast?: number;
  lower_80?: number;
  upper_80?: number;
  lower_95?: number;
  upper_95?: number;
}

interface TimeSeriesChartProps {
  data: DataPoint[];
  title?: string;
  showConfidenceIntervals?: boolean;
}

const TimeSeriesChart: React.FC<TimeSeriesChartProps> = ({ 
  data, 
  title = "Time Series Analysis",
  showConfidenceIntervals = false 
}) => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3">
          <p className="font-medium">{`Date: ${formatDate(label)}`}</p>
          {payload.map((entry: any, index: number) => {
            if (entry.dataKey === 'lower_80' || entry.dataKey === 'upper_80' || 
                entry.dataKey === 'lower_95' || entry.dataKey === 'upper_95') {
              return null; // Don't show confidence interval values in tooltip
            }
            return (
              <p key={index} style={{ color: entry.color }} className="text-sm">
                {entry.dataKey === 'value' ? 'Historical' : 'Forecast'}: {entry.value?.toFixed(2)}
              </p>
            );
          })}
          {showConfidenceIntervals && payload.find((p: any) => p.dataKey === 'upper_80') && (
            <div className="text-xs text-gray-500 mt-1">
              <p>80% CI: {payload.find((p: any) => p.dataKey === 'lower_80')?.value?.toFixed(2)} - {payload.find((p: any) => p.dataKey === 'upper_80')?.value?.toFixed(2)}</p>
              <p>95% CI: {payload.find((p: any) => p.dataKey === 'lower_95')?.value?.toFixed(2)} - {payload.find((p: any) => p.dataKey === 'upper_95')?.value?.toFixed(2)}</p>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          {showConfidenceIntervals ? (
            <ComposedChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="date" 
                tickFormatter={formatDate}
                tick={{ fontSize: 12 }}
                stroke="#666"
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                stroke="#666"
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              
              {/* 95% Confidence Interval */}
              <Area
                type="monotone"
                dataKey="upper_95"
                stackId="1"
                stroke="none"
                fill="#E5E7EB"
                fillOpacity={0.3}
                connectNulls={false}
              />
              <Area
                type="monotone"
                dataKey="lower_95"
                stackId="1"
                stroke="none"
                fill="#FFFFFF"
                fillOpacity={1}
                connectNulls={false}
              />
              
              {/* 80% Confidence Interval */}
              <Area
                type="monotone"
                dataKey="upper_80"
                stackId="2"
                stroke="none"
                fill="#D1D5DB"
                fillOpacity={0.4}
                connectNulls={false}
              />
              <Area
                type="monotone"
                dataKey="lower_80"
                stackId="2"
                stroke="none"
                fill="#FFFFFF"
                fillOpacity={1}
                connectNulls={false}
              />
              
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#3B82F6" 
                strokeWidth={2}
                dot={{ fill: '#3B82F6', strokeWidth: 0, r: 3 }}
                name="Historical Data"
                connectNulls={false}
              />
              <Line 
                type="monotone" 
                dataKey="forecast" 
                stroke="#10B981" 
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: '#10B981', strokeWidth: 0, r: 3 }}
                name="TimeGPT Forecast"
                connectNulls={false}
              />
            </ComposedChart>
          ) : (
            <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="date" 
                tickFormatter={formatDate}
                tick={{ fontSize: 12 }}
                stroke="#666"
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                stroke="#666"
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#3B82F6" 
                strokeWidth={2}
                dot={{ fill: '#3B82F6', strokeWidth: 0, r: 3 }}
                name="Historical Data"
                connectNulls={false}
              />
              <Line 
                type="monotone" 
                dataKey="forecast" 
                stroke="#10B981" 
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: '#10B981', strokeWidth: 0, r: 3 }}
                name="Basic Forecast"
                connectNulls={false}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TimeSeriesChart;
