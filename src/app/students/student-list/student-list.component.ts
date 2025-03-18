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
  page = 1;
  itemsPerPage = 5;

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
      this.students = await this.studentService.getStudents();
    } catch (error) {
      console.log('Failed to load students', error);
    }
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
