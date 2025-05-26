
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface TimeSeriesPoint {
  date: string;
  value: number;
}

interface AnalysisRequest {
  data: TimeSeriesPoint[];
  statisticalSummary: {
    mean: number;
    median: number;
    standardDeviation: number;
    variance: number;
    trend: string;
    volatility: string;
    outliers: number;
  };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { data, statisticalSummary }: AnalysisRequest = await req.json();
    
    console.log('Received AI insights request:', { dataLength: data.length });

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // Prepare context for GPT
    const dataContext = `
Time series dataset with ${data.length} data points:
- Mean: ${statisticalSummary.mean}
- Median: ${statisticalSummary.median}
- Standard Deviation: ${statisticalSummary.standardDeviation}
- Trend: ${statisticalSummary.trend}
- Volatility: ${statisticalSummary.volatility}
- Outliers detected: ${statisticalSummary.outliers}
- Date range: ${data[0]?.date} to ${data[data.length - 1]?.date}
- Value range: ${Math.min(...data.map(d => d.value))} to ${Math.max(...data.map(d => d.value))}
`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are an expert data analyst specializing in time series analysis. Provide clear, actionable insights in JSON format with three sections: "summary" (2-3 sentences explaining what the data shows), "trend" (detailed trend analysis), and "recommendation" (specific actionable advice). Be concise but insightful. IMPORTANT: Each field must be a simple string, not an object or array.`
          },
          {
            role: 'user',
            content: `Analyze this time series data and provide insights: ${dataContext}`
          }
        ],
        temperature: 0.3,
        response_format: { type: "json_object" }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', errorText);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const result = await response.json();
    let insights;
    
    try {
      insights = JSON.parse(result.choices[0].message.content);
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      insights = {
        summary: "Analysis completed successfully.",
        trend: "Trend analysis available.",
        recommendation: "Recommendations generated."
      };
    }

    // Ensure all values are strings and not objects
    const safeInsights = {
      summary: typeof insights.summary === 'string' ? insights.summary : 
               typeof insights.summary === 'object' ? JSON.stringify(insights.summary) : 
               "Analysis completed successfully.",
      trend: typeof insights.trend === 'string' ? insights.trend : 
             typeof insights.trend === 'object' ? JSON.stringify(insights.trend) : 
             "Trend analysis available.",
      recommendation: typeof insights.recommendation === 'string' ? insights.recommendation : 
                     typeof insights.recommendation === 'object' ? JSON.stringify(insights.recommendation) : 
                     "Recommendations generated."
    };

    console.log('Generated AI insights:', safeInsights);

    return new Response(
      JSON.stringify({
        success: true,
        insights: safeInsights
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in ai-insights function:', error);
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
