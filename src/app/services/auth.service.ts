import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

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
}
