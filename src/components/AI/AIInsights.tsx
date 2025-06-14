import React from 'react';
import { useData } from '../../contexts/DataContext';
import { Brain, TrendingUp, MapPin, AlertCircle, Target, Clock } from 'lucide-react';

export default function AIInsights() {
  const { predictions, getStatistics } = useData();
  const stats = getStatistics();

  // Simulated AI insights based on data
  const insights = {
    surplusForecasting: [
      {
        area: 'Manhattan Financial District',
        predictedSurplus: 85,
        confidence: 0.89,
        timeframe: 'Next 24 hours',
        recommendation: 'Deploy additional NGO volunteers to this area',
      },
      {
        area: 'Brooklyn Heights',
        predictedSurplus: 62,
        confidence: 0.76,
        timeframe: 'Next 48 hours',
        recommendation: 'Coordinate with local community kitchens',
      },
    ],
    trends: [
      {
        title: 'Peak Donation Hours',
        insight: 'Most donations occur between 6-8 PM, suggesting restaurant closing times',
        recommendation: 'Schedule NGO volunteers during peak hours for faster pickup',
      },
      {
        title: 'Food Type Patterns',
        insight: 'Fresh produce donations spike on weekends, cooked meals on weekdays',
        recommendation: 'Adjust NGO capacity planning based on food type cycles',
      },
    ],
    optimization: [
      {
        metric: 'Pickup Efficiency',
        current: '78%',
        target: '90%',
        suggestion: 'Implement route optimization for NGO pickups',
      },
      {
        metric: 'Food Waste Reduction',
        current: '2.8 tons/month',
        target: '4.0 tons/month',
        suggestion: 'Expand donor network in underserved areas',
      },
    ],
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Brain className="h-8 w-8 text-purple-600" />
          <h2 className="text-2xl font-bold text-gray-800">AI-Powered Insights</h2>
        </div>
        <p className="text-gray-600">
          Machine learning analysis of food donation patterns and optimization recommendations
        </p>
      </div>

      {/* Surplus Forecasting */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center space-x-2 mb-6">
          <TrendingUp className="h-6 w-6 text-green-600" />
          <h3 className="text-xl font-semibold text-gray-800">Surplus Forecasting</h3>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {insights.surplusForecasting.map((forecast, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-800">{forecast.area}</h4>
                <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded-full">
                  {Math.round(forecast.confidence * 100)}% confidence
                </span>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Predicted Surplus:</span>
                  <span className="font-medium">{forecast.predictedSurplus} kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Timeframe:</span>
                  <span className="font-medium">{forecast.timeframe}</span>
                </div>
              </div>
              
              <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700">
                  <strong>Recommendation:</strong> {forecast.recommendation}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pattern Analysis */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Brain className="h-6 w-6 text-purple-600" />
          <h3 className="text-xl font-semibold text-gray-800">Pattern Analysis</h3>
        </div>
        
        <div className="space-y-4">
          {insights.trends.map((trend, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-2">{trend.title}</h4>
              <p className="text-gray-600 mb-3">{trend.insight}</p>
              <div className="bg-yellow-50 p-3 rounded-lg">
                <p className="text-sm text-yellow-700">
                  <strong>Recommendation:</strong> {trend.recommendation}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Optimization Metrics */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Target className="h-6 w-6 text-red-600" />
          <h3 className="text-xl font-semibold text-gray-800">Optimization Opportunities</h3>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {insights.optimization.map((metric, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-3">{metric.metric}</h4>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Current:</span>
                  <span className="font-medium text-blue-600">{metric.current}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Target:</span>
                  <span className="font-medium text-green-600">{metric.target}</span>
                </div>
              </div>
              
              <div className="bg-orange-50 p-3 rounded-lg">
                <p className="text-sm text-orange-700">
                  <strong>Suggestion:</strong> {metric.suggestion}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Real-time Alerts */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center space-x-2 mb-6">
          <AlertCircle className="h-6 w-6 text-orange-600" />
          <h3 className="text-xl font-semibold text-gray-800">Real-time Alerts</h3>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-red-50 border border-red-200 rounded-lg">
            <Clock className="h-5 w-5 text-red-600" />
            <div>
              <p className="text-sm font-medium text-red-800">Expiry Alert</p>
              <p className="text-sm text-red-600">3 donations expiring in the next 2 hours</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <MapPin className="h-5 w-5 text-yellow-600" />
            <div>
              <p className="text-sm font-medium text-yellow-800">High Demand Area</p>
              <p className="text-sm text-yellow-600">Brooklyn needs 2 more active NGOs</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-green-50 border border-green-200 rounded-lg">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-sm font-medium text-green-800">Efficiency Improvement</p>
              <p className="text-sm text-green-600">Pickup time reduced by 15% this week</p>
            </div>
          </div>
        </div>
      </div>

      {/* Model Performance */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">AI Model Performance</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">89.2%</p>
            <p className="text-sm text-gray-600">Prediction Accuracy</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">1,247</p>
            <p className="text-sm text-gray-600">Data Points</p>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <p className="text-2xl font-bold text-yellow-600">12ms</p>
            <p className="text-sm text-gray-600">Response Time</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <p className="text-2xl font-bold text-purple-600">95.4%</p>
            <p className="text-sm text-gray-600">Model Reliability</p>
          </div>
        </div>
      </div>
    </div>
  );
}