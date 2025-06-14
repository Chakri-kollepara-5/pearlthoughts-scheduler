import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import { Package, Clock, MapPin, FileText } from 'lucide-react';
import toast from 'react-hot-toast';

interface DonationFormProps {
  onSuccess: () => void;
}

export default function DonationForm({ onSuccess }: DonationFormProps) {
  const { user } = useAuth();
  const { addDonation } = useData();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    foodName: '',
    quantity: '',
    unit: 'kg',
    foodType: 'fresh' as 'fresh' | 'cooked' | 'packaged' | 'beverages',
    expiryHours: '24',
    notes: '',
    address: user?.location?.address || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);

    try {
      const expiryTime = new Date();
      expiryTime.setHours(expiryTime.getHours() + parseInt(formData.expiryHours));

      addDonation({
        donorId: user.id,
        donorName: user.name,
        foodName: formData.foodName,
        quantity: parseFloat(formData.quantity),
        unit: formData.unit,
        foodType: formData.foodType,
        expiryTime: expiryTime.toISOString(),
        location: {
          lat: user.location?.lat || 40.7128 + (Math.random() - 0.5) * 0.1,
          lng: user.location?.lng || -74.0060 + (Math.random() - 0.5) * 0.1,
          address: formData.address,
        },
        status: 'available',
        notes: formData.notes,
      });

      toast.success('Donation created successfully!');
      onSuccess();
      
      // Reset form
      setFormData({
        foodName: '',
        quantity: '',
        unit: 'kg',
        foodType: 'fresh',
        expiryHours: '24',
        notes: '',
        address: user.location?.address || '',
      });

    } catch (error) {
      toast.error('Failed to create donation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Food Name */}
        <div>
          <label htmlFor="foodName" className="block text-sm font-medium text-gray-700 mb-2">
            Food Name *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Package className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="foodName"
              name="foodName"
              value={formData.foodName}
              onChange={handleChange}
              required
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="e.g., Fresh vegetables, Cooked rice"
            />
          </div>
        </div>

        {/* Quantity */}
        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
            Quantity *
          </label>
          <div className="flex space-x-2">
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
              min="0.1"
              step="0.1"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="0.0"
            />
            <select
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="kg">kg</option>
              <option value="lbs">lbs</option>
              <option value="portions">portions</option>
              <option value="liters">liters</option>
            </select>
          </div>
        </div>

        {/* Food Type */}
        <div>
          <label htmlFor="foodType" className="block text-sm font-medium text-gray-700 mb-2">
            Food Type *
          </label>
          <select
            id="foodType"
            name="foodType"
            value={formData.foodType}
            onChange={handleChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="fresh">Fresh (fruits, vegetables)</option>
            <option value="cooked">Cooked meals</option>
            <option value="packaged">Packaged/canned food</option>
            <option value="beverages">Beverages</option>
          </select>
        </div>

        {/* Expiry Time */}
        <div>
          <label htmlFor="expiryHours" className="block text-sm font-medium text-gray-700 mb-2">
            Best before (hours from now)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Clock className="h-5 w-5 text-gray-400" />
            </div>
            <select
              id="expiryHours"
              name="expiryHours"
              value={formData.expiryHours}
              onChange={handleChange}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="2">2 hours</option>
              <option value="6">6 hours</option>
              <option value="12">12 hours</option>
              <option value="24">24 hours</option>
              <option value="48">48 hours</option>
              <option value="72">72 hours</option>
            </select>
          </div>
        </div>
      </div>

      {/* Address */}
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
          Pickup Address *
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MapPin className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Enter pickup address"
          />
        </div>
      </div>

      {/* Notes */}
      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
          Additional Notes
        </label>
        <div className="relative">
          <div className="absolute top-3 left-3 pointer-events-none">
            <FileText className="h-5 w-5 text-gray-400" />
          </div>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={3}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Any special instructions or details about the food..."
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
        >
          {loading ? 'Creating...' : 'Create Donation'}
        </button>
      </div>
    </form>
  );
}