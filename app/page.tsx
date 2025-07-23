'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, Users, Clock, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { StatsCard } from '@/components/StatsCard';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { storage } from '@/lib/utils/storage';
import { User } from '@/lib/types';

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedUser = storage.getUser();
    if (!storedUser || !storedUser.isAuthenticated) {
      router.push('/login');
    } else {
      setUser(storedUser);
    }
    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    storage.removeUser();
    router.push('/login');
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return null;
  }

  const appointments = storage.getAppointments();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-blue-600">HealthCare+</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user.username}</span>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.username}!
          </h2>
          <p className="text-lg text-gray-600">
            Manage your health appointments and stay connected with healthcare providers.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Appointments"
            value={appointments.length.toString()}
            icon={Calendar}
            color="bg-blue-500"
          />
          <StatsCard
            title="Active Doctors"
            value="4"
            icon={Users}
            color="bg-green-500"
          />
          <StatsCard
            title="Next Appointment"
            value={appointments.length > 0 ? "Today" : "None"}
            icon={Clock}
            color="bg-orange-500"
          />
          <StatsCard
            title="Health Score"
            value="85%"
            icon={TrendingUp}
            color="bg-purple-500"
          />
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Book Appointment Card */}
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Book New Appointment
              </h3>
              <p className="text-gray-600 mb-6">
                Schedule a consultation with our qualified healthcare professionals
              </p>
              <Button
                onClick={() => router.push('/appointment')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                Book Appointment
              </Button>
            </div>
          </Card>

          {/* Recent Appointments Card */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Appointments</h3>
            {appointments.length > 0 ? (
              <div className="space-y-3">
                {appointments.slice(-3).map((appointment) => (
                  <div
                    key={appointment.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{appointment.doctorName}</p>
                      <p className="text-sm text-gray-600">
                        {appointment.date} at {appointment.time}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium
                      ${appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                      {appointment.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No appointments yet</p>
                <p className="text-sm text-gray-400 mt-2">
                  Book your first appointment to get started
                </p>
              </div>
            )}
          </Card>
        </div>

        {/* Health Tips Section */}
        <Card className="mt-8 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Health Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">💧</span>
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Stay Hydrated</h4>
              <p className="text-sm text-gray-600">Drink at least 8 glasses of water daily</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🏃</span>
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Exercise Regularly</h4>
              <p className="text-sm text-gray-600">30 minutes of activity daily</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">😴</span>
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Get Quality Sleep</h4>
              <p className="text-sm text-gray-600">7-9 hours of sleep each night</p>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}