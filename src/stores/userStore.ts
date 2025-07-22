import { defineStore } from 'pinia';
import { ref } from 'vue';
import { User } from '../models/User';

export const useUserStore = defineStore('user', () => {
  const currentUser = ref<User | null>(null);
  const isAuthenticated = ref(false);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch('/users.json');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const users: User[] = await response.json();
      const user = users.find(u => u.email === email && u.password === password);
      if (user) {
        currentUser.value = { ...user };
        isAuthenticated.value = true;
        localStorage.setItem('currentUser', JSON.stringify(user));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    currentUser.value = null;
    isAuthenticated.value = false;
    localStorage.removeItem('currentUser');
  };

  const loadUserFromStorage = () => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      currentUser.value = JSON.parse(storedUser) as User;
      isAuthenticated.value = true;
    }
  };

  return {
    currentUser,
    isAuthenticated,
    login,
    logout,
    loadUserFromStorage,
  };
});