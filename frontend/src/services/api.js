import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Members
export const getMembers = () => api.get('/members/');
export const getMember = (id) => api.get(`/members/${id}/`);
export const createMember = (data) => api.post('/members/', data);
export const updateMember = (id, data) => api.put(`/members/${id}/`, data);
export const deleteMember = (id) => api.delete(`/members/${id}/`);

// Events
export const getEvents = () => api.get('/events/');
export const getUpcomingEvents = () => api.get('/events/upcoming/');
export const getEvent = (id) => api.get(`/events/${id}/`);
export const createEvent = (data) => api.post('/events/', data);
export const updateEvent = (id, data) => api.put(`/events/${id}/`, data);
export const deleteEvent = (id) => api.delete(`/events/${id}/`);

// Sermons
export const getSermons = () => api.get('/sermons/');
export const getSermon = (id) => api.get(`/sermons/${id}/`);
export const createSermon = (data) => api.post('/sermons/', data);
export const updateSermon = (id, data) => api.put(`/sermons/${id}/`, data);
export const deleteSermon = (id) => api.delete(`/sermons/${id}/`);

// Donations
export const getDonations = () => api.get('/donations/');
export const getDonationStats = () => api.get('/donations/statistics/');
export const createDonation = (data) => api.post('/donations/', data);

// Ministries
export const getMinistries = () => api.get('/ministries/');
export const getMinistry = (id) => api.get(`/ministries/${id}/`);
export const createMinistry = (data) => api.post('/ministries/', data);
export const updateMinistry = (id, data) => api.put(`/ministries/${id}/`, data);
export const deleteMinistry = (id) => api.delete(`/ministries/${id}/`);

// Prayer Requests
export const getPrayerRequests = () => api.get('/prayer-requests/');
export const createPrayerRequest = (data) => api.post('/prayer-requests/', data);
export const updatePrayerRequest = (id, data) => api.put(`/prayer-requests/${id}/`, data);

// Announcements
export const getAnnouncements = () => api.get('/announcements/');
export const getActiveAnnouncements = () => api.get('/announcements/active/');

// Authentication
export const login = (credentials) => api.post('/auth/login/', credentials);
export const signup = (userData) => api.post('/auth/signup/', userData);
export const logout = () => api.post('/auth/logout/');
export const getCurrentUser = () => api.get('/auth/user/');

export default api;
