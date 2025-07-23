export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  image: string;
  rating: number;
  experience: string;
  location: string;
  availability: string[];
}

export interface Appointment {
  id: string;
  doctorId: number;
  doctorName: string;
  patientName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  notes?: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  createdAt: string;
}

export interface User {
  username: string;
  isAuthenticated: boolean;
}

export interface FormData {
  patientName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  notes?: string;
}