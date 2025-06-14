import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Users, Package, TrendingUp, Award, MapPin, Clock, Trophy, Bell } from 'lucide-react';
import StatsCard from '../UI/StatsCard';
import AIInsights from '../AI/AIInsights';
import Leaderboard from '../Gamification/Leaderboard';
import ImpactTracker from '../Analytics/ImpactTracker';

const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6'];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'analytics' | 'users' | 'ai' | 'leaderboard' | 'impact'>('overview');
  const { donations, ngos, getStatistics } = useData();
  const stats = getStatistics();

  // Analytics data
  const foodTypeData = donations.reduce((acc, donation) => {
    acc[donation.foodType] = (acc[donation.foodType] || 0) + donation.quantity;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(foodTypeData).map(([type, quantity]) => ({
    name: type.charAt(0).toUpperCase() + type.slice(1),
    value: quantity,
  }));

  const statusData = [
    { name: 'Available', value: donations.filter(d => d.status === 'available').length },
    { name: 'Reserved', value: donations.filter(d => d.status === 'reserved').length },
    { name: 'Picked Up', value: donations.filter(d => d.status === 'picked_up').length },
    { name: 'Expired', value: donations.filter(d => d.status === 'expired').length },
  ];

  const monthlyData = [
    { month: 'Jan', donations: 45, pickups: 38, impact: 892 },
    { month: 'Feb', donations: 52, pickups: 45, impact: 1045 },
    { month: 'Mar', donations: 48, pickups: 41, impact: 967 },
    { month: 'Apr', donations: 61, pickups: 54, impact: 1234 },
    { month: 'May', donations: 55, pickups: 48, impact: 1156 },
    { month: 'Jun', donations: 67, pickups: 59, impact: 1389 },
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Package },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'ai', label: 'AI Insights', icon: MapPin },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    { id: 'impact', label: 'Impact', icon: Award },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors duration-200">
      <div className="container mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">Admin Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-300">Monitor platform performance and manage operations</p>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl mb-8 border border-gray-200 dark:border-gray-700">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8 px-6 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm transition-all duration-200 flex items-center space-x-2 whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-green-500 text-green-600 dark:text-green-400'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Main Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatsCard
                title="Total Donations"
                value={stats.totalDonations}
                icon={Package}
                color="blue"
              />
              <StatsCard
                title="Successful Pickups"
                value={stats.totalPickups}
                icon={TrendingUp}
                color="green"
              />
              <StatsCard
                title="Food Saved"
                value={`${stats.totalFoodSaved} kg`}
                icon={Award}
                color="yellow"
              />
              <StatsCard
                title="Active NGOs"
                value={ngos.length}
                icon={Users}
                color="purple"
              />
            </div>

            {/* Quick Stats Grid */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Donation Status Chart */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Donation Status Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Top Performers */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Top Performers</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-4">Top Donors</h4>
                    {stats.topDonors.map((donor, index) => (
                      <div key={index} className="flex justify-between items-center py-3 px-4 bg-gray-50 dark:bg-gray-700 rounded-xl mb-2">
                        <span className="text-sm text-gray-600 dark:text-gray-300">{donor.name}</span>
                        <span className="text-sm font-medium text-green-600 dark:text-green-400">{donor.points} pts</span>
                      </div>
                    ))}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-4">Top NGOs</h4>
                    {stats.topNGOs.map((ngo, index) => (
                      <div key={index} className="flex justify-between items-center py-3 px-4 bg-gray-50 dark:bg-gray-700 rounded-xl mb-2">
                        <span className="text-sm text-gray-600 dark:text-gray-300">{ngo.name}</span>
                        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">{ngo.pickups} pickups</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                  <div className="bg-green-500 p-2 rounded-full">
                    <Package className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-white">New donation added</p>
                    <p className="text-xs text-gray-600 dark:text-gray-300">Fresh vegetables (5kg) in Manhattan</p>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">2 min ago</span>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                  <div className="bg-blue-500 p-2 rounded-full">
                    <Users className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-white">NGO registered</p>
                    <p className="text-xs text-gray-600 dark:text-gray-300">Community Kitchen joined the platform</p>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">1 hour ago</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-8">
            {/* Monthly Trends */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Monthly Trends</h3>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={monthlyData}>
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
                  <Line type="monotone" dataKey="donations" stroke="#10B981" strokeWidth={3} name="Donations" />
                  <Line type="monotone" dataKey="pickups" stroke="#3B82F6" strokeWidth={3} name="Pickups" />
                  <Line type="monotone" dataKey="impact" stroke="#F59E0B" strokeWidth={3} name="Impact Score" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Food Type Distribution */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Food Type Distribution</h3>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: 'none', 
                      borderRadius: '8px',
                      color: '#F9FAFB'
                    }} 
                  />
                  <Bar dataKey="value" fill="#10B981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="space-y-8">
            {/* NGO Management */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Registered NGOs</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Organization
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Pickups
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Rating
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {ngos.map((ngo) => (
                      <tr key={ngo.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{ngo.name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{ngo.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {ngo.location.address}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {ngo.totalPickups}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {ngo.rating}/5.0
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            ngo.verified 
                              ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' 
                              : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                          }`}>
                            {ngo.verified ? 'Verified' : 'Pending'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* AI Insights Tab */}
        {activeTab === 'ai' && <AIInsights />}

        {/* Leaderboard Tab */}
        {activeTab === 'leaderboard' && <Leaderboard />}

        {/* Impact Tab */}
        {activeTab === 'impact' && <ImpactTracker />}
      </div>
    </div>
  );
}