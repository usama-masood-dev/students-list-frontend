import { ToastService } from './../../services/toast.service';
import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
})
export class StudentListComponent implements OnInit {
  students: any[] = [];

  totalStudents = 0;
  totalPages = 0;
  page = 1;
  limit = 5;

  constructor(
    private studentService: StudentService,
    private toastService: ToastService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.loadStudents();
  }

  // Load Students
  async loadStudents() {
    try {
      const response = await this.studentService.getStudents(
        this.page,
        this.limit
      );

      this.students = response.students;
      this.totalStudents = response.totalStudents;
      this.totalPages = Math.ceil(this.totalStudents / this.limit);
    } catch (error) {
      console.log('Failed to load students', error);
    }
  }

  // Handle page changes
  changePage(newPage: number) {
    if (newPage < 1 || newPage > this.totalPages) return;
    this.page = newPage;
    this.loadStudents();
  }

  async deleteStudent(id: string) {
    if (confirm('Are you sure you want to delete this student data?')) {
      try {
        await this.studentService.deleteStudent(id);
        this.students = this.students.filter((student) => student._id !== id);
        this.toastService.showSuccess('STUDENT_DELETED');
      } catch (error) {
        console.log('Error deleting the student', error);
      }
    }
  }
}
