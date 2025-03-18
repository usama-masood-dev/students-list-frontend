import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private apiUrl = 'http://localhost:5000/api/students';

  // Get All Students data
  async getStudents() {
    try {
      const response = await axios.get(`${this.apiUrl}`);
      return response.data;
    } catch (error) {
      console.log('Error fetching students list', error);
      throw error;
    }
  }

  // Create Student
  async addStudent(studentData: any) {
    try {
      const token = localStorage.getItem('token');
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
  async editStudent(id: string, updatedData: any) {
    try {
      const token = localStorage.getItem('token');
      console.log(`${this.apiUrl}/${id}`);
      const response = await axios.put(`${this.apiUrl}/${id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);
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
