
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
        <div className="card-pulse p-4 min-w-[200px]">
          <p className="font-semibold text-gray-900 mb-2">{`Date: ${formatDate(label)}`}</p>
          {payload.map((entry: any, index: number) => {
            if (entry.dataKey === 'lower_80' || entry.dataKey === 'upper_80' || 
                entry.dataKey === 'lower_95' || entry.dataKey === 'upper_95') {
              return null;
            }
            return (
              <p key={index} style={{ color: entry.color }} className="text-sm font-medium">
                {entry.dataKey === 'value' ? 'Historical' : 'Forecast'}: {entry.value?.toFixed(2)}
              </p>
            );
          })}
          {showConfidenceIntervals && payload.find((p: any) => p.dataKey === 'upper_80') && (
            <div className="text-xs text-gray-500 mt-2 space-y-1">
              <p className="font-medium">Confidence Intervals:</p>
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
    <div className="card-pulse p-8 w-full">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">{title}</h3>
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          {showConfidenceIntervals ? (
            <ComposedChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis 
                dataKey="date" 
                tickFormatter={formatDate}
                tick={{ fontSize: 12, fill: '#64748b' }}
                axisLine={{ stroke: '#e2e8f0' }}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: '#64748b' }}
                axisLine={{ stroke: '#e2e8f0' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              
              {/* 95% Confidence Interval */}
              <Area
                type="monotone"
                dataKey="upper_95"
                stackId="1"
                stroke="none"
                fill="#FED7D7"
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
                fill="#FEB2B2"
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
                stroke="#93C5FD" 
                strokeWidth={3}
                dot={{ fill: '#93C5FD', strokeWidth: 0, r: 4 }}
                name="Historical Data"
                connectNulls={false}
              />
              <Line 
                type="monotone" 
                dataKey="forecast" 
                stroke="#A78BFA" 
                strokeWidth={3}
                strokeDasharray="8 8"
                dot={{ fill: '#A78BFA', strokeWidth: 0, r: 4 }}
                name="TimeGPT Forecast"
                connectNulls={false}
              />
            </ComposedChart>
          ) : (
            <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis 
                dataKey="date" 
                tickFormatter={formatDate}
                tick={{ fontSize: 12, fill: '#64748b' }}
                axisLine={{ stroke: '#e2e8f0' }}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: '#64748b' }}
                axisLine={{ stroke: '#e2e8f0' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#93C5FD" 
                strokeWidth={3}
                dot={{ fill: '#93C5FD', strokeWidth: 0, r: 4 }}
                name="Historical Data"
                connectNulls={false}
              />
              <Line 
                type="monotone" 
                dataKey="forecast" 
                stroke="#A78BFA" 
                strokeWidth={3}
                strokeDasharray="8 8"
                dot={{ fill: '#A78BFA', strokeWidth: 0, r: 4 }}
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
