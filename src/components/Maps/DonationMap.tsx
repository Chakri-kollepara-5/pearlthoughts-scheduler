import React from 'react';
import { MapPin, Package, Clock } from 'lucide-react';
import type { Donation } from '../../contexts/DataContext';

interface DonationMapProps {
  donations: Donation[];
}

export default function DonationMap({ donations }: DonationMapProps) {
  return (
    <div className="bg-gray-100 rounded-lg p-8 min-h-[400px] relative overflow-hidden">
      {/* Simulated Map Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full bg-gradient-to-br from-green-200 to-blue-200"></div>
      </div>
      
      {/* Map Markers */}
      <div className="relative z-10 space-y-4">
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Interactive Donation Map</h3>
          <p className="text-gray-600">Showing {donations.length} available donations in your area</p>
        </div>

        {/* Donation Markers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {donations.slice(0, 6).map((donation, index) => (
            <div
              key={donation.id}
              className="bg-white rounded-lg p-4 shadow-md border-l-4 border-green-500 hover:shadow-lg transition-shadow"
              style={{
                transform: `translate(${index * 20}px, ${index * 15}px)`,
              }}
            >
              <div className="flex items-start space-x-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <MapPin className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">{donation.foodName}</h4>
                  <p className="text-sm text-gray-600 mb-2">{donation.location.address}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Package className="h-3 w-3" />
                      <span>{donation.quantity} {donation.unit}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{new Date(donation.expiryTime).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Map Legend */}
        <div className="bg-white rounded-lg p-4 shadow-md mt-6">
          <h4 className="font-semibold text-gray-800 mb-3">Map Legend</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Available</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span>Reserved</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>Picked Up</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span>Expired</span>
            </div>
          </div>
        </div>

        {donations.length === 0 && (
          <div className="text-center py-8">
            <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No donations available in this area</p>
          </div>
        )}
      </div>
    </div>
  );
}