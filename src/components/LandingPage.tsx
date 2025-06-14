import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Users, TrendingUp, Award, MapPin, Bell, Sparkles, Globe, Leaf, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-600 via-green-700 to-blue-800 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-green-400 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-blue-400 rounded-full opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-yellow-400 rounded-full opacity-20 animate-pulse delay-2000"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <div className="bg-white bg-opacity-20 p-3 rounded-full">
                <Sparkles className="h-8 w-8 text-yellow-300" />
              </div>
              <span className="text-yellow-300 font-semibold">AI-Powered Platform</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Save Food. <span className="text-green-300">Save Lives.</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-green-100 leading-relaxed">
              Revolutionary platform connecting food donors with NGOs to reduce waste and feed communities using advanced AI insights
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                to="/register"
                className="group bg-white text-green-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <span>Start Donating</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/login"
                className="group border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-green-700 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span>Join as NGO</span>
                <Users className="h-5 w-5" />
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-3xl font-bold text-green-300">2.8K</div>
                <div className="text-sm text-green-100">Food Saved (kg)</div>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-3xl font-bold text-blue-300">1.4K</div>
                <div className="text-sm text-green-100">People Fed</div>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-3xl font-bold text-yellow-300">47</div>
                <div className="text-sm text-green-100">Active NGOs</div>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-3xl font-bold text-red-300">1.2T</div>
                <div className="text-sm text-green-100">CO₂ Reduced</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-800 transition-colors duration-200">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">How FoodSaver Works</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Simple, efficient, and impactful food redistribution</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group text-center p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 hover:scale-105">
              <div className="bg-gradient-to-br from-green-500 to-green-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Heart className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Donate Food</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Restaurants and individuals can easily upload surplus food details with expiry times and locations through our intuitive interface
              </p>
            </div>
            
            <div className="group text-center p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 hover:scale-105">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <MapPin className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Find & Connect</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                NGOs discover nearby donations on an interactive map and coordinate quick pickups with real-time notifications
              </p>
            </div>
            
            <div className="group text-center p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900 dark:to-yellow-800 hover:scale-105">
              <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Feed Communities</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Transform food waste into community support, feeding those in need while reducing environmental impact
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Sparkles className="h-8 w-8 text-purple-600" />
              <span className="text-purple-600 font-semibold">Powered by AI</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">Smart Predictions & Optimization</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Advanced AI algorithms for maximum impact</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-8">
                <div className="flex items-start space-x-4 group">
                  <div className="bg-gradient-to-br from-green-500 to-green-600 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Surplus Prediction</h3>
                    <p className="text-gray-600 dark:text-gray-300">AI analyzes patterns to forecast food surplus in different areas and optimal pickup times</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 group">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <Bell className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Smart Notifications</h3>
                    <p className="text-gray-600 dark:text-gray-300">Automated alerts for new donations, pickup reminders, and expiry warnings</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 group">
                  <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Gamification</h3>
                    <p className="text-gray-600 dark:text-gray-300">Points system, achievement badges, and leaderboards to encourage participation</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">Real-time Impact</h3>
              <div className="space-y-6">
                <div className="flex justify-between items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <Leaf className="h-6 w-6 text-green-600" />
                    <span className="text-gray-700 dark:text-gray-300">Food Saved</span>
                  </div>
                  <span className="text-2xl font-bold text-green-600">2,847 kg</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <Users className="h-6 w-6 text-blue-600" />
                    <span className="text-gray-700 dark:text-gray-300">People Fed</span>
                  </div>
                  <span className="text-2xl font-bold text-blue-600">1,423</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <Award className="h-6 w-6 text-yellow-600" />
                    <span className="text-gray-700 dark:text-gray-300">Active NGOs</span>
                  </div>
                  <span className="text-2xl font-bold text-yellow-600">47</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-red-50 dark:bg-red-900/20 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <Globe className="h-6 w-6 text-red-600" />
                    <span className="text-gray-700 dark:text-gray-300">CO₂ Reduced</span>
                  </div>
                  <span className="text-2xl font-bold text-red-600">1.2 tons</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Login Section */}
      <section className="py-20 bg-gradient-to-br from-green-600 to-blue-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Try the Demo</h2>
          <p className="text-xl mb-12 text-green-100">
            Experience FoodSaver with different user roles and see the impact in action
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm p-8 rounded-2xl hover:bg-opacity-20 transition-all duration-300 group">
              <div className="bg-green-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Donor Account</h3>
              <p className="text-green-100 mb-4">donor@foodsaver.com</p>
              <p className="text-sm text-green-200">Password: password</p>
            </div>
            
            <div className="bg-white bg-opacity-10 backdrop-blur-sm p-8 rounded-2xl hover:bg-opacity-20 transition-all duration-300 group">
              <div className="bg-blue-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">NGO Account</h3>
              <p className="text-green-100 mb-4">ngo@foodsaver.com</p>
              <p className="text-sm text-green-200">Password: password</p>
            </div>
            
            <div className="bg-white bg-opacity-10 backdrop-blur-sm p-8 rounded-2xl hover:bg-opacity-20 transition-all duration-300 group">
              <div className="bg-purple-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Admin Account</h3>
              <p className="text-green-100 mb-4">admin@foodsaver.com</p>
              <p className="text-sm text-green-200">Password: password</p>
            </div>
          </div>
          
          <Link
            to="/login"
            className="group inline-flex items-center space-x-2 bg-white text-green-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105"
          >
            <span>Try Demo Login</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}