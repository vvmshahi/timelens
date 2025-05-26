
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DataPoint {
  date: string;
  value: number;
  forecast?: number;
}

interface TimeSeriesChartProps {
  data: DataPoint[];
  title?: string;
}

const TimeSeriesChart: React.FC<TimeSeriesChartProps> = ({ data, title = "Time Series Analysis" }) => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
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
            <Tooltip 
              labelFormatter={(label) => `Date: ${formatDate(label)}`}
              formatter={(value: number, name: string) => [
                value.toFixed(2), 
                name === 'value' ? 'Historical' : 'Forecast'
              ]}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #ccc',
                borderRadius: '6px',
                fontSize: '14px'
              }}
            />
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
              name="Forecast"
              connectNulls={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TimeSeriesChart;
