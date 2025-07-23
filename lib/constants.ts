import { Doctor } from './types';

export const MOCK_DOCTORS: Doctor[] = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    image: "https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=300",
    rating: 4.9,
    experience: "15 years",
    location: "New York Medical Center",
    availability: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"]
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Neurologist",
    image: "https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=300",
    rating: 4.8,
    experience: "12 years",
    location: "City Hospital",
    availability: ["08:00", "09:00", "13:00", "14:00", "15:00"]
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialty: "Pediatrician",
    image: "https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=300",
    rating: 4.7,
    experience: "10 years",
    location: "Children's Medical Center",
    availability: ["09:00", "10:00", "11:00", "13:00", "14:00", "16:00"]
  },
  {
    id: 4,
    name: "Dr. David Wilson",
    specialty: "Orthopedic Surgeon",
    image: "https://images.pexels.com/photos/6789778/pexels-photo-6789778.jpeg?auto=compress&cs=tinysrgb&w=300",
    rating: 4.9,
    experience: "18 years",
    location: "Sports Medicine Clinic",
    availability: ["08:00", "10:00", "14:00", "15:00", "17:00"]
  }
];

export const TIME_SLOTS = [
  "08:00", "09:00", "10:00", "11:00", "12:00",
  "13:00", "14:00", "15:00", "16:00", "17:00"
];