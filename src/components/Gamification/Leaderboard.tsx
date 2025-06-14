import React from 'react';
import { useData } from '../../contexts/DataContext';
import { Trophy, Medal, Award, Star, TrendingUp } from 'lucide-react';

export default function Leaderboard() {
  const { getStatistics } = useData();
  const stats = getStatistics();

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Trophy className="h-6 w-6 text-yellow-500" />;
      case 2: return <Medal className="h-6 w-6 text-gray-400" />;
      case 3: return <Award className="h-6 w-6 text-amber-600" />;
      default: return <Star className="h-6 w-6 text-blue-500" />;
    }
  };

  const getBadgeColor = (rank: number) => {
    switch (rank) {
      case 1: return 'bg-gradient-to-r from-yellow-400 to-yellow-600';
      case 2: return 'bg-gradient-to-r from-gray-300 to-gray-500';
      case 3: return 'bg-gradient-to-r from-amber-400 to-amber-600';
      default: return 'bg-gradient-to-r from-blue-400 to-blue-600';
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Trophy className="h-8 w-8 text-yellow-500" />
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Leaderboard</h2>
        </div>
        <p className="text-gray-600 dark:text-gray-300">
          Celebrating our top contributors making a difference
        </p>
      </div>

      {/* Top Donors */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
            <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Top Donors</h3>
        </div>
        
        <div className="space-y-4">
          {stats.topDonors.map((donor, index) => (
            <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:shadow-md transition-all duration-300">
              <div className={`flex items-center justify-center w-12 h-12 rounded-full text-white font-bold ${getBadgeColor(index + 1)}`}>
                {index + 1}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 dark:text-white">{donor.name}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">{donor.points} points earned</p>
              </div>
              <div className="flex items-center space-x-2">
                {getRankIcon(index + 1)}
                <span className="text-lg font-bold text-green-600 dark:text-green-400">{donor.points}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top NGOs */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
            <Award className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Top NGOs</h3>
        </div>
        
        <div className="space-y-4">
          {stats.topNGOs.map((ngo, index) => (
            <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:shadow-md transition-all duration-300">
              <div className={`flex items-center justify-center w-12 h-12 rounded-full text-white font-bold ${getBadgeColor(index + 1)}`}>
                {index + 1}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 dark:text-white">{ngo.name}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">{ngo.pickups} successful pickups</p>
              </div>
              <div className="flex items-center space-x-2">
                {getRankIcon(index + 1)}
                <span className="text-lg font-bold text-blue-600 dark:text-blue-400">{ngo.pickups}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievement Badges */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Achievement Badges</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900 dark:to-yellow-800 rounded-xl">
            <Trophy className="h-8 w-8 text-yellow-600 dark:text-yellow-400 mx-auto mb-2" />
            <p className="text-sm font-semibold text-yellow-800 dark:text-yellow-200">Food Hero</p>
            <p className="text-xs text-yellow-600 dark:text-yellow-400">50+ donations</p>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900 dark:to-green-800 rounded-xl">
            <Medal className="h-8 w-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
            <p className="text-sm font-semibold text-green-800 dark:text-green-200">Eco Warrior</p>
            <p className="text-xs text-green-600 dark:text-green-400">100kg saved</p>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 rounded-xl">
            <Award className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
            <p className="text-sm font-semibold text-blue-800 dark:text-blue-200">Community Champion</p>
            <p className="text-xs text-blue-600 dark:text-blue-400">25+ pickups</p>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900 dark:to-purple-800 rounded-xl">
            <Star className="h-8 w-8 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
            <p className="text-sm font-semibold text-purple-800 dark:text-purple-200">Rising Star</p>
            <p className="text-xs text-purple-600 dark:text-purple-400">First week</p>
          </div>
        </div>
      </div>
    </div>
  );
}