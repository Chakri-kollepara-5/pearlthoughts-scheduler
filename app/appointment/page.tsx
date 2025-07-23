'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Calendar, Clock, User, Phone, Mail, FileText, ArrowLeft, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { DoctorCard } from '@/components/DoctorCard';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { MOCK_DOCTORS, TIME_SLOTS } from '@/lib/constants';
import { appointmentSchema, AppointmentFormData } from '@/lib/utils/validation';
import { storage } from '@/lib/utils/storage';
import { Doctor, User as UserType, Appointment } from '@/lib/types';

export default function AppointmentBooking() {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch
  } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema)
  });

  const selectedDate = watch('date');
  const selectedTime = watch('time');

  useEffect(() => {
    const storedUser = storage.getUser();
    if (!storedUser || !storedUser.isAuthenticated) {
      router.push('/login');
    } else {
      setUser(storedUser);
      // Pre-fill user data
      setValue('patientName', storedUser.username);
    }
    setLoading(false);
  }, [router, setValue]);

  const handleDoctorSelect = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
  };

  const onSubmit = async (data: AppointmentFormData) => {
    if (!selectedDoctor) {
      alert('Please select a doctor');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      const appointment: Appointment = {
        id: `apt_${Date.now()}`,
        doctorId: selectedDoctor.id,
        doctorName: selectedDoctor.name,
        patientName: data.patientName,
        email: data.email,
        phone: data.phone,
        date: data.date,
        time: data.time,
        notes: data.notes,
        status: 'confirmed',
        createdAt: new Date().toISOString()
      };

      // Mock POST to /appointments
      storage.addAppointment(appointment);
      
      setIsSuccess(true);
      reset();
      setSelectedDoctor(null);

      // Redirect to dashboard after success
      setTimeout(() => {
        router.push('/');
      }, 3000);

    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('Failed to book appointment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return null;
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <Card className="p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Appointment Confirmed!</h2>
          <p className="text-gray-600 mb-4">
            Your appointment with {selectedDoctor?.name} has been successfully booked.
          </p>
          <p className="text-sm text-gray-500">
            Redirecting to dashboard in 3 seconds...
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => router.push('/')}
                variant="ghost"
                className="p-2"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-2xl font-bold text-blue-600">Book Appointment</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user.username}</span>
              <Button
                onClick={() => {
                  storage.removeUser();
                  router.push('/login');
                }}
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Doctor Selection */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Select a Doctor</h2>
            <div className="space-y-4">
              {MOCK_DOCTORS.map((doctor) => (
                <DoctorCard
                  key={doctor.id}
                  doctor={doctor}
                  onSelect={handleDoctorSelect}
                  isSelected={selectedDoctor?.id === doctor.id}
                />
              ))}
            </div>
          </div>

          {/* Appointment Form */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Appointment Details</h2>
            
            {selectedDoctor && (
              <Card className="p-4 mb-6 bg-blue-50 border-blue-200">
                <div className="flex items-center space-x-3">
                  <img
                    src={selectedDoctor.image}
                    alt={selectedDoctor.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{selectedDoctor.name}</h3>
                    <p className="text-blue-600">{selectedDoctor.specialty}</p>
                  </div>
                </div>
              </Card>
            )}

            <Card className="p-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Patient Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Patient Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      {...register('patientName')}
                      type="text"
                      placeholder="Enter patient name"
                      className={`pl-10 ${errors.patientName ? 'border-red-500' : ''}`}
                    />
                  </div>
                  {errors.patientName && (
                    <p className="mt-1 text-sm text-red-600">{errors.patientName.message}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      {...register('email')}
                      type="email"
                      placeholder="Enter email address"
                      className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      {...register('phone')}
                      type="tel"
                      placeholder="Enter phone number"
                      className={`pl-10 ${errors.phone ? 'border-red-500' : ''}`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                  )}
                </div>

                {/* Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Appointment Date
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      {...register('date')}
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                      className={`pl-10 ${errors.date ? 'border-red-500' : ''}`}
                    />
                  </div>
                  {errors.date && (
                    <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
                  )}
                </div>

                {/* Time Slot */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time Slot
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Clock className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      {...register('time')}
                      className={`pl-10 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${errors.time ? 'border-red-500' : ''}`}
                    >
                      <option value="">Select a time slot</option>
                      {selectedDoctor?.availability.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      )) || TIME_SLOTS.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.time && (
                    <p className="mt-1 text-sm text-red-600">{errors.time.message}</p>
                  )}
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Notes (Optional)
                  </label>
                  <div className="relative">
                    <div className="absolute top-3 left-3 pointer-events-none">
                      <FileText className="h-5 w-5 text-gray-400" />
                    </div>
                    <textarea
                      {...register('notes')}
                      rows={3}
                      placeholder="Any specific concerns or requirements..."
                      className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 resize-none"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={!selectedDoctor || isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Booking Appointment...
                    </div>
                  ) : (
                    'Book Appointment'
                  )}
                </Button>

                {!selectedDoctor && (
                  <p className="text-sm text-gray-500 text-center">
                    Please select a doctor to continue
                  </p>
                )}
              </form>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}