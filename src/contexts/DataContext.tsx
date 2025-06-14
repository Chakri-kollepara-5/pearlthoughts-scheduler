import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Donation {
  id: string;
  donorId: string;
  donorName: string;
  foodName: string;
  quantity: number;
  unit: string;
  foodType: 'fresh' | 'cooked' | 'packaged' | 'beverages';
  expiryTime: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  status: 'available' | 'reserved' | 'picked_up' | 'expired';
  createdAt: string;
  reservedBy?: string;
  reservedAt?: string;
  pickedUpAt?: string;
  notes?: string;
  imageUrl?: string;
}

export interface NGO {
  id: string;
  name: string;
  email: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  verified: boolean;
  totalPickups: number;
  rating: number;
  registrationDate: string;
}

export interface PredictionData {
  area: string;
  predictedSurplus: number;
  confidence: number;
  timeframe: string;
  foodTypes: string[];
}

interface DataContextType {
  donations: Donation[];
  ngos: NGO[];
  predictions: PredictionData[];
  addDonation: (donation: Omit<Donation, 'id' | 'createdAt'>) => void;
  updateDonation: (id: string, updates: Partial<Donation>) => void;
  getDonationsByDonor: (donorId: string) => Donation[];
  getNearbyDonations: (location: { lat: number; lng: number }, radius?: number) => Donation[];
  getStatistics: () => {
    totalDonations: number;
    totalPickups: number;
    totalFoodSaved: number;
    activeDonations: number;
    topDonors: { name: string; points: number }[];
    topNGOs: { name: string; pickups: number }[];
  };
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const SAMPLE_DONATIONS: Donation[] = [
  {
    id: '1',
    donorId: '1',
    donorName: 'John Doe',
    foodName: 'Fresh Vegetables',
    quantity: 5,
    unit: 'kg',
    foodType: 'fresh',
    expiryTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    location: { lat: 40.7128, lng: -74.0060, address: 'New York, NY' },
    status: 'available',
    createdAt: new Date().toISOString(),
    notes: 'Mixed seasonal vegetables, good condition',
  },
  {
    id: '2',
    donorId: '1',
    donorName: 'John Doe',
    foodName: 'Cooked Rice',
    quantity: 3,
    unit: 'kg',
    foodType: 'cooked',
    expiryTime: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
    location: { lat: 40.7580, lng: -73.9855, address: 'Manhattan, NY' },
    status: 'reserved',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    reservedBy: '2',
    reservedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
  },
];

const SAMPLE_NGOS: NGO[] = [
  {
    id: '2',
    name: 'Food Relief NYC',
    email: 'ngo@foodsaver.com',
    location: { lat: 40.7580, lng: -73.9855, address: 'Manhattan, NY' },
    verified: true,
    totalPickups: 45,
    rating: 4.8,
    registrationDate: '2024-02-10',
  },
  {
    id: '4',
    name: 'Community Kitchen',
    email: 'community@foodsaver.com',
    location: { lat: 40.6892, lng: -74.0445, address: 'Brooklyn, NY' },
    verified: true,
    totalPickups: 32,
    rating: 4.6,
    registrationDate: '2024-03-01',
  },
];

const SAMPLE_PREDICTIONS: PredictionData[] = [
  {
    area: 'Manhattan Financial District',
    predictedSurplus: 85,
    confidence: 0.89,
    timeframe: 'Next 24 hours',
    foodTypes: ['cooked', 'packaged'],
  },
  {
    area: 'Brooklyn Heights',
    predictedSurplus: 62,
    confidence: 0.76,
    timeframe: 'Next 48 hours',
    foodTypes: ['fresh', 'beverages'],
  },
];

export function DataProvider({ children }: { children: ReactNode }) {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [ngos] = useState<NGO[]>(SAMPLE_NGOS);
  const [predictions] = useState<PredictionData[]>(SAMPLE_PREDICTIONS);

  useEffect(() => {
    const savedDonations = localStorage.getItem('foodsaver_donations');
    if (savedDonations) {
      setDonations(JSON.parse(savedDonations));
    } else {
      setDonations(SAMPLE_DONATIONS);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('foodsaver_donations', JSON.stringify(donations));
  }, [donations]);

  const addDonation = (donation: Omit<Donation, 'id' | 'createdAt'>) => {
    const newDonation: Donation = {
      ...donation,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
    };
    setDonations(prev => [...prev, newDonation]);
  };

  const updateDonation = (id: string, updates: Partial<Donation>) => {
    setDonations(prev => prev.map(donation => 
      donation.id === id ? { ...donation, ...updates } : donation
    ));
  };

  const getDonationsByDonor = (donorId: string) => {
    return donations.filter(donation => donation.donorId === donorId);
  };

  const getNearbyDonations = (location: { lat: number; lng: number }, radius = 10) => {
    return donations.filter(donation => {
      const distance = calculateDistance(
        location.lat, location.lng,
        donation.location.lat, donation.location.lng
      );
      return distance <= radius && donation.status === 'available';
    });
  };

  const getStatistics = () => {
    const totalDonations = donations.length;
    const totalPickups = donations.filter(d => d.status === 'picked_up').length;
    const totalFoodSaved = donations
      .filter(d => d.status === 'picked_up')
      .reduce((sum, d) => sum + d.quantity, 0);
    const activeDonations = donations.filter(d => d.status === 'available').length;

    const donorStats = donations.reduce((acc, donation) => {
      if (!acc[donation.donorId]) {
        acc[donation.donorId] = { name: donation.donorName, count: 0 };
      }
      if (donation.status === 'picked_up') {
        acc[donation.donorId].count++;
      }
      return acc;
    }, {} as Record<string, { name: string; count: number }>);

    const topDonors = Object.values(donorStats)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)
      .map(d => ({ name: d.name, points: d.count * 10 }));

    const topNGOs = ngos
      .sort((a, b) => b.totalPickups - a.totalPickups)
      .slice(0, 5)
      .map(ngo => ({ name: ngo.name, pickups: ngo.totalPickups }));

    return {
      totalDonations,
      totalPickups,
      totalFoodSaved,
      activeDonations,
      topDonors,
      topNGOs,
    };
  };

  return (
    <DataContext.Provider value={{
      donations,
      ngos,
      predictions,
      addDonation,
      updateDonation,
      getDonationsByDonor,
      getNearbyDonations,
      getStatistics,
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}