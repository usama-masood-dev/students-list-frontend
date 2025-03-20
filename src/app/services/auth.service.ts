import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth';

  constructor(private router: Router) {}

  // Signup method
  async signup(userData: any) {
    try {
      const response = await axios.post(`${this.apiUrl}/signup`, userData);
      return response.data;
    } catch (error) {
      console.error('Signup error', error);
      throw error;
    }
  }

  // Login method
  async login(credentials: any) {
    try {
      const response = await axios.post(`${this.apiUrl}/login`, credentials);
      return response.data;
    } catch (error) {
      console.error('Login error', error);
      throw error;
    }
  }

  // Logout method
  async logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getCurrentUserId(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.id;
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  }

  async getUserDetails() {
    const userId = this.getCurrentUserId();
    if (!userId) {
      return null;
    }

    try {
      const response = await axios.get(`${this.apiUrl}/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user details:', error);
      throw error;
    }
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
