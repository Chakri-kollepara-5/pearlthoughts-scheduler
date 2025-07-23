'use client';

import { Doctor } from '@/lib/types';
import { Star, MapPin, Clock } from 'lucide-react';

interface DoctorCardProps {
  doctor: Doctor;
  onSelect: (doctor: Doctor) => void;
  isSelected: boolean;
}

export const DoctorCard = ({ doctor, onSelect, isSelected }: DoctorCardProps) => {
  return (
    <div
      onClick={() => onSelect(doctor)}
      className={`
        bg-white rounded-xl shadow-sm border-2 p-6 cursor-pointer transition-all duration-200 hover:shadow-md
        ${isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-100 hover:border-gray-200'}
      `}
    >
      <div className="flex items-start space-x-4">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-16 h-16 rounded-full object-cover"
          onError={(e) => {
            e.currentTarget.src = 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=300';
          }}
        />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{doctor.name}</h3>
          <p className="text-blue-600 font-medium mb-2">{doctor.specialty}</p>
          
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span>{doctor.rating}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{doctor.experience}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-1 mt-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{doctor.location}</span>
          </div>
        </div>
      </div>
      
      {isSelected && (
        <div className="mt-4 pt-4 border-t border-blue-100">
          <p className="text-sm text-blue-600 font-medium">Selected for appointment</p>
        </div>
      )}
    </div>
  );
};