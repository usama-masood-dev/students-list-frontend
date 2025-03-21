import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private apiUrl = 'http://localhost:5000/api/students';

  // Get All Students data
  async getStudents(page: number, limit: number) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('User not authenticated');
      }

      const response = await axios.get(
        `${this.apiUrl}?page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.log('Error fetching students list', error);
      throw error;
    }
  }

  // Create Student
  async addStudent(studentData: object) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('User not authenticated');
      }
      const response = await axios.post(`${this.apiUrl}`, studentData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log('Error adding student', error);
      throw error;
    }
  }

  // Update Student
  async editStudent(id: string, updatedData: object) {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${this.apiUrl}/${id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.log('Error updating the student', error);
      throw error;
    }
  }

  // Delete Student
  async deleteStudent(id: string) {
    try {
      const token = localStorage.getItem('token');

      const response = await axios.delete(`${this.apiUrl}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log('Error deleting the student', error);
      throw error;
    }
  }

  async getStudentById(id: string) {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${this.apiUrl}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log('Error fetching student', error);
      throw error;
    }
  }
}
