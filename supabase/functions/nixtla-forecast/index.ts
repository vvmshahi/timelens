
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface TimeSeriesPoint {
  date: string;
  value: number;
}

interface ForecastRequest {
  data: TimeSeriesPoint[];
  forecastHorizon: number;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { data, forecastHorizon = 7 }: ForecastRequest = await req.json();
    
    console.log('Received forecast request:', { dataLength: data.length, forecastHorizon });

    if (!data || data.length === 0) {
      throw new Error('No data provided for forecasting');
    }

    const nixtlaApiKey = Deno.env.get('NIXTLA_API_KEY');
    if (!nixtlaApiKey) {
      throw new Error('Nixtla API key not configured');
    }

    // Format data for Nixtla TimeGPT
    const formattedData = data.map((point, index) => ({
      ds: point.date,
      y: point.value,
      unique_id: 'series_1'
    }));

    console.log('Calling Nixtla TimeGPT API...');

    // Call Nixtla TimeGPT API
    const nixtlaResponse = await fetch('https://api.nixtla.io/forecast', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${nixtlaApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'timegpt-1',
        freq: 'D', // Daily frequency
        h: forecastHorizon,
        y: formattedData,
        level: [80, 95], // Confidence intervals
      }),
    });

    if (!nixtlaResponse.ok) {
      const errorText = await nixtlaResponse.text();
      console.error('Nixtla API error:', errorText);
      throw new Error(`Nixtla API error: ${nixtlaResponse.status} - ${errorText}`);
    }

    const forecast = await nixtlaResponse.json();
    console.log('Received forecast from Nixtla:', forecast);

    // Transform the response to match our format
    const forecastData = forecast.data.map((point: any) => ({
      date: point.ds,
      value: undefined,
      forecast: point.TimeGPT,
      lower_80: point['TimeGPT-lo-80'],
      upper_80: point['TimeGPT-hi-80'],
      lower_95: point['TimeGPT-lo-95'],
      upper_95: point['TimeGPT-hi-95'],
    }));

    return new Response(
      JSON.stringify({
        success: true,
        forecast: forecastData,
        metadata: {
          model: 'TimeGPT',
          horizon: forecastHorizon,
          confidence_intervals: [80, 95],
        },
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in forecast function:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
