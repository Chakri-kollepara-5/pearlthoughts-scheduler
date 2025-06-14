import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import { Clock, MapPin, Package, User, CheckCircle, XCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import toast from 'react-hot-toast';
import type { Donation } from '../../contexts/DataContext';

interface DonationListProps {
  donations: Donation[];
  showActions?: boolean;
  userRole?: 'donor' | 'ngo';
}

export default function DonationList({ donations, showActions = false, userRole }: DonationListProps) {
  const { user } = useAuth();
  const { updateDonation } = useData();

  const handleReserve = (donation: Donation) => {
    if (!user) return;
    
    updateDonation(donation.id, {
      status: 'reserved',
      reservedBy: user.id,
      reservedAt: new Date().toISOString(),
    });
    
    toast.success('Donation reserved successfully!');
  };

  const handlePickup = (donation: Donation) => {
    updateDonation(donation.id, {
      status: 'picked_up',
      pickedUpAt: new Date().toISOString(),
    });
    
    toast.success('Pickup completed!');
  };

  const handleCancel = (donation: Donation) => {
    updateDonation(donation.id, {
      status: 'available',
      reservedBy: undefined,
      reservedAt: undefined,
    });
    
    toast.success('Reservation cancelled');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'reserved': return 'bg-yellow-100 text-yellow-800';
      case 'picked_up': return 'bg-blue-100 text-blue-800';
      case 'expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getFoodTypeIcon = (type: string) => {
    return <Package className="h-4 w-4" />;
  };

  if (donations.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500">No donations found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {donations.map((donation) => (
        <div key={donation.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <div className="flex items-center space-x-2">
                  {getFoodTypeIcon(donation.foodType)}
                  <h3 className="text-lg font-semibold text-gray-800">{donation.foodName}</h3>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(donation.status)}`}>
                  {donation.status.replace('_', ' ').toUpperCase()}
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Package className="h-4 w-4" />
                  <span>{donation.quantity} {donation.unit}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>{donation.donorName}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span className="truncate">{donation.location.address}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>
                    Expires {formatDistanceToNow(new Date(donation.expiryTime), { addSuffix: true })}
                  </span>
                </div>
              </div>

              {donation.notes && (
                <p className="mt-3 text-sm text-gray-600 italic">"{donation.notes}"</p>
              )}
            </div>

            {showActions && userRole === 'ngo' && (
              <div className="ml-4 flex flex-col space-y-2">
                {donation.status === 'available' && (
                  <button
                    onClick={() => handleReserve(donation)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                  >
                    Reserve
                  </button>
                )}
                
                {donation.status === 'reserved' && donation.reservedBy === user?.id && (
                  <>
                    <button
                      onClick={() => handlePickup(donation)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center space-x-1"
                    >
                      <CheckCircle className="h-4 w-4" />
                      <span>Complete Pickup</span>
                    </button>
                    <button
                      onClick={() => handleCancel(donation)}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors flex items-center space-x-1"
                    >
                      <XCircle className="h-4 w-4" />
                      <span>Cancel</span>
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
          
          <div className="text-xs text-gray-500 border-t pt-3">
            Created {formatDistanceToNow(new Date(donation.createdAt), { addSuffix: true })}
            {donation.reservedAt && (
              <span className="ml-4">
                Reserved {formatDistanceToNow(new Date(donation.reservedAt), { addSuffix: true })}
              </span>
            )}
            {donation.pickedUpAt && (
              <span className="ml-4">
                Picked up {formatDistanceToNow(new Date(donation.pickedUpAt), { addSuffix: true })}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}