import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import { MapPin, Package, Clock, CheckCircle, Star, Navigation, Award, Users } from 'lucide-react';
import DonationMap from '../Maps/DonationMap';
import DonationList from '../Lists/DonationList';
import StatsCard from '../UI/StatsCard';

export default function NGODashboard() {
  const [activeTab, setActiveTab] = useState<'map' | 'donations' | 'pickups' | 'impact'>('map');
  const { user } = useAuth();
  const { donations, getNearbyDonations } = useData();

  const nearbyDonations = user?.location 
    ? getNearbyDonations(user.location, 20)
    : [];

  const reservedDonations = donations.filter(d => d.reservedBy === user?.id);
  const completedPickups = donations.filter(d => d.reservedBy === user?.id && d.status === 'picked_up');

  const ngoStats = {
    availableDonations: nearbyDonations.length,
    reservedDonations: reservedDonations.length,
    completedPickups: completedPickups.length,
    totalFoodCollected: completedPickups.reduce((sum, d) => sum + d.quantity, 0),
  };

  const impactMetrics = {
    peopleFed: ngoStats.completedPickups * 3,
    mealsProvided: ngoStats.completedPickups * 5,
    co2Saved: Math.round(ngoStats.totalFoodCollected * 0.4),
  };

  const tabs = [
    { id: 'map', label: 'Donation Map', icon: MapPin },
    { id: 'donations', label: 'Available', icon: Package },
    { id: 'pickups', label: 'My Pickups', icon: Clock },
    { id: 'impact', label: 'Impact', icon: Award },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors duration-200">
      <div className="container mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">NGO Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-300">Find and collect food donations in your area</p>
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

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Available Nearby"
            value={ngoStats.availableDonations}
            icon={Package}
            color="green"
          />
          <StatsCard
            title="Reserved"
            value={ngoStats.reservedDonations}
            icon={Clock}
            color="yellow"
          />
          <StatsCard
            title="Completed"
            value={ngoStats.completedPickups}
            icon={CheckCircle}
            color="blue"
          />
          <StatsCard
            title="Food Collected"
            value={`${ngoStats.totalFoodCollected} kg`}
            icon={Star}
            color="purple"
          />
        </div>

        {/* Map Tab */}
        {activeTab === 'map' && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Nearby Food Donations</h2>
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                <Navigation className="h-4 w-4" />
                <span>Real-time locations</span>
              </div>
            </div>
            <DonationMap donations={nearbyDonations} />
          </div>
        )}

        {/* Donations Tab */}
        {activeTab === 'donations' && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Available Donations</h2>
            <DonationList donations={nearbyDonations} showActions={true} userRole="ngo" />
          </div>
        )}

        {/* Pickups Tab */}
        {activeTab === 'pickups' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Reserved Donations</h2>
              <DonationList donations={reservedDonations} showActions={true} userRole="ngo" />
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Completed Pickups</h2>
              <DonationList donations={completedPickups} showActions={false} />
            </div>
          </div>
        )}

        {/* Impact Tab */}
        {activeTab === 'impact' && (
          <div className="space-y-8">
            {/* Impact Overview */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 text-white">
              <h2 className="text-2xl font-bold mb-6 flex items-center space-x-2">
                <Award className="h-6 w-6" />
                <span>Your Community Impact</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">{impactMetrics.peopleFed}</div>
                  <p className="text-blue-100">People Fed</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">{impactMetrics.mealsProvided}</div>
                  <p className="text-blue-100">Meals Provided</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">{impactMetrics.co2Saved} kg</div>
                  <p className="text-blue-100">CO₂ Saved</p>
                </div>
              </div>
            </div>

            {/* Detailed Impact Metrics */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">Pickup Performance</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                    <span className="text-gray-700 dark:text-gray-300">Success Rate</span>
                    <span className="text-2xl font-bold text-green-600 dark:text-green-400">94%</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                    <span className="text-gray-700 dark:text-gray-300">Avg Response Time</span>
                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">23 min</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
                    <span className="text-gray-700 dark:text-gray-300">Rating</span>
                    <span className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">4.8/5</span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">Community Reach</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
                      <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-gray-800 dark:text-white">Families Served</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{Math.round(impactMetrics.peopleFed / 4)} families this month</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                      <MapPin className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-gray-800 dark:text-white">Coverage Area</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">5 km radius from your location</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}