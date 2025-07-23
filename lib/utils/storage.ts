import { User, Appointment } from '../types';

export const storage = {
  getUser: (): User | null => {
    if (typeof window === 'undefined') return null;
    try {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Error getting user from storage:', error);
      return null;
    }
  },

  setUser: (user: User): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      console.error('Error setting user in storage:', error);
    }
  },

  removeUser: (): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Error removing user from storage:', error);
    }
  },

  getAppointments: (): Appointment[] => {
    if (typeof window === 'undefined') return [];
    try {
      const appointments = localStorage.getItem('appointments');
      return appointments ? JSON.parse(appointments) : [];
    } catch (error) {
      console.error('Error getting appointments from storage:', error);
      return [];
    }
  },

  addAppointment: (appointment: Appointment): void => {
    if (typeof window === 'undefined') return;
    try {
      const appointments = storage.getAppointments();
      appointments.push(appointment);
      localStorage.setItem('appointments', JSON.stringify(appointments));
    } catch (error) {
      console.error('Error adding appointment to storage:', error);
    }
  }
};