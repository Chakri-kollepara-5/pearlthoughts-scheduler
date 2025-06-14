import React from 'react';
import { useData } from '../../contexts/DataContext';
import { Leaf, Users, TrendingUp, Heart, Globe, Recycle } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line } from 'recharts';

const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

export default function ImpactTracker() {
  const { getStatistics } = useData();
  const stats = getStatistics();

  const impactData = [
    { name: 'CO₂ Saved', value: 1247, unit: 'kg', icon: Leaf, color: 'text-green-600' },
    { name: 'People Fed', value: 2834, unit: 'people', icon: Users, color: 'text-blue-600' },
    { name: 'Meals Provided', value: 8502, unit: 'meals', icon: Heart, color: 'text-red-600' },
    { name: 'Water Saved', value: 15600, unit: 'liters', icon: Globe, color: 'text-cyan-600' },
  ];

  const monthlyImpact = [
    { month: 'Jan', foodSaved: 245, co2Reduced: 98, peopleFed: 612 },
    { month: 'Feb', foodSaved: 312, co2Reduced: 125, peopleFed: 780 },
    { month: 'Mar', foodSaved: 289, co2Reduced: 116, peopleFed: 722 },
    { month: 'Apr', foodSaved: 356, co2Reduced: 142, peopleFed: 890 },
    { month: 'May', foodSaved: 423, co2Reduced: 169, peopleFed: 1058 },
    { month: 'Jun', foodSaved: 398, co2Reduced: 159, peopleFed: 995 },
  ];

  const foodTypeImpact = [
    { name: 'Fresh Produce', value: 35, color: '#10B981' },
    { name: 'Cooked Meals', value: 28, color: '#3B82F6' },
    { name: 'Packaged Food', value: 22, color: '#F59E0B' },
    { name: 'Beverages', value: 15, color: '#EF4444' },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Recycle className="h-8 w-8 text-green-600" />
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Impact Tracker</h2>
        </div>
        <p className="text-gray-600 dark:text-gray-300">
          Measuring our collective environmental and social impact
        </p>
      </div>

      {/* Impact Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {impactData.map((metric, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-full bg-gray-100 dark:bg-gray-700 ${metric.color}`}>
                <metric.icon className="h-6 w-6" />
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-800 dark:text-white">
                  {metric.value.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">{metric.unit}</p>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{metric.name}</h3>
            <div className="mt-2 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className={`h-2 rounded-full bg-gradient-to-r ${
                  metric.color.includes('green') ? 'from-green-400 to-green-600' :
                  metric.color.includes('blue') ? 'from-blue-400 to-blue-600' :
                  metric.color.includes('red') ? 'from-red-400 to-red-600' :
                  'from-cyan-400 to-cyan-600'
                }`}
                style={{ width: `${Math.min((metric.value / 20000) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Monthly Impact Trends */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Monthly Impact Trends</h3>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={monthlyImpact}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="month" stroke="#6B7280" />
            <YAxis stroke="#6B7280" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1F2937', 
                border: 'none', 
                borderRadius: '8px',
                color: '#F9FAFB'
              }} 
            />
            <Line type="monotone" dataKey="foodSaved" stroke="#10B981" strokeWidth={3} name="Food Saved (kg)" />
            <Line type="monotone" dataKey="co2Reduced" stroke="#3B82F6" strokeWidth={3} name="CO₂ Reduced (kg)" />
            <Line type="monotone" dataKey="peopleFed" stroke="#F59E0B" strokeWidth={3} name="People Fed" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Food Type Impact */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Food Type Impact</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={foodTypeImpact}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {foodTypeImpact.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Environmental Benefits */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Environmental Benefits</h3>
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
                <Leaf className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-800 dark:text-white">Carbon Footprint Reduction</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Equivalent to planting 156 trees</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                <Globe className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-800 dark:text-white">Water Conservation</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Enough water for 52 households per day</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full">
                <Recycle className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-800 dark:text-white">Waste Diverted</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">2.8 tons prevented from landfills</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Community Impact */}
      <div className="bg-gradient-to-br from-green-600 to-blue-600 rounded-2xl shadow-xl p-8 text-white">
        <h3 className="text-2xl font-bold mb-6">Community Impact</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">47</div>
            <p className="text-green-100">Active NGOs</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">1,234</div>
            <p className="text-green-100">Volunteers</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">89%</div>
            <p className="text-green-100">Success Rate</p>
          </div>
        </div>
      </div>
    </div>
  );
}