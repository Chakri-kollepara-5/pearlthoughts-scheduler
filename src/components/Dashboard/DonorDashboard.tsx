import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import { Plus, Package, Clock, MapPin, Award, TrendingUp, Trophy, Target, Zap } from 'lucide-react';
import DonationForm from '../Forms/DonationForm';
import DonationList from '../Lists/DonationList';
import StatsCard from '../UI/StatsCard';

export default function DonorDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'donate' | 'history' | 'impact'>('overview');
  const { user } = useAuth();
  const { getDonationsByDonor, getStatistics } = useData();

  const myDonations = getDonationsByDonor(user?.id || '');
  const stats = getStatistics();

  const myStats = {
    totalDonations: myDonations.length,
    activeDonations: myDonations.filter(d => d.status === 'available').length,
    completedDonations: myDonations.filter(d => d.status === 'picked_up').length,
    totalFoodDonated: myDonations.reduce((sum, d) => sum + d.quantity, 0),
  };

  const impactMetrics = {
    peopleFed: myStats.completedDonations * 3, // Estimate 3 people per donation
    co2Saved: Math.round(myStats.totalFoodDonated * 0.4), // Estimate CO2 savings
    waterSaved: Math.round(myStats.totalFoodDonated * 12), // Estimate water savings
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Package },
    { id: 'donate', label: 'New Donation', icon: Plus },
    { id: 'history', label: 'My Donations', icon: Clock },
    { id: 'impact', label: 'My Impact', icon: Award },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors duration-200">
      <div className="container mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">Welcome back, {user?.name}!</h1>
          <p className="text-gray-600 dark:text-gray-300">Make a difference by sharing your surplus food</p>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl mb-8 border border-gray-200 dark:border-gray-700">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm transition-all duration-200 flex items-center space-x-2 ${
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
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatsCard
                title="Total Donations"
                value={myStats.totalDonations}
                icon={Package}
                color="blue"
              />
              <StatsCard
                title="Active Donations"
                value={myStats.activeDonations}
                icon={Clock}
                color="green"
              />
              <StatsCard
                title="Food Donated"
                value={`${myStats.totalFoodDonated} kg`}
                icon={TrendingUp}
                color="yellow"
              />
              <StatsCard
                title="Impact Points"
                value={user?.points || 0}
                icon={Award}
                color="purple"
              />
            </div>

            {/* Impact Summary */}
            <div className="bg-gradient-to-br from-green-600 to-blue-600 rounded-2xl shadow-xl p-8 text-white">
              <h2 className="text-2xl font-bold mb-6 flex items-center space-x-2">
                <Trophy className="h-6 w-6" />
                <span>Your Impact</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">{impactMetrics.peopleFed}</div>
                  <p className="text-green-100">People Fed</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">{impactMetrics.co2Saved} kg</div>
                  <p className="text-green-100">CO₂ Saved</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">{impactMetrics.waterSaved} L</div>
                  <p className="text-green-100">Water Saved</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Quick Actions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <button
                  onClick={() => setActiveTab('donate')}
                  className="group p-6 border-2 border-dashed border-green-300 dark:border-green-600 rounded-2xl hover:border-green-400 dark:hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-300 text-center"
                >
                  <div className="bg-green-100 dark:bg-green-900 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Plus className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <span className="text-green-600 dark:text-green-400 font-medium">Add New Donation</span>
                </button>
                
                <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-2xl text-center bg-gray-50 dark:bg-gray-700/50">
                  <div className="bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <MapPin className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">View Nearby NGOs</span>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Coming soon</p>
                </div>
                
                <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-2xl text-center bg-gray-50 dark:bg-gray-700/50">
                  <div className="bg-yellow-100 dark:bg-yellow-900 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Target className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">Set Goals</span>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Track progress</p>
                </div>
              </div>
            </div>

            {/* Recent Donations */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Recent Donations</h2>
              <DonationList donations={myDonations.slice(0, 5)} showActions={false} />
              {myDonations.length > 5 && (
                <button
                  onClick={() => setActiveTab('history')}
                  className="mt-6 text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium flex items-center space-x-1"
                >
                  <span>View all donations</span>
                  <Zap className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Donate Tab */}
        {activeTab === 'donate' && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Create New Donation</h2>
            <DonationForm onSuccess={() => setActiveTab('history')} />
          </div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">My Donation History</h2>
            <DonationList donations={myDonations} showActions={true} />
          </div>
        )}

        {/* Impact Tab */}
        {activeTab === 'impact' && (
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Personal Impact Dashboard</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-xl">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">{impactMetrics.peopleFed}</div>
                  <p className="text-gray-600 dark:text-gray-300">People Fed</p>
                </div>
                <div className="text-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">{impactMetrics.co2Saved} kg</div>
                  <p className="text-gray-600 dark:text-gray-300">CO₂ Reduced</p>
                </div>
                <div className="text-center p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
                  <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">{impactMetrics.waterSaved} L</div>
                  <p className="text-gray-600 dark:text-gray-300">Water Saved</p>
                </div>
                <div className="text-center p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">{user?.points || 0}</div>
                  <p className="text-gray-600 dark:text-gray-300">Points Earned</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-xl p-6 text-white text-center">
                <h3 className="text-xl font-bold mb-2">Environmental Impact</h3>
                <p className="text-green-100">Your donations are equivalent to planting {Math.round(impactMetrics.co2Saved / 8)} trees!</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}