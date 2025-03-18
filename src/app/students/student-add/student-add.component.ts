import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.scss'],
})
export class StudentAddComponent {
  courses = [
    'Web Development',
    'Data Science',
    'Machine Learning',
    'UI UX Design',
  ];

  student = {
    fullName: '',
    fatherName: '',
    contactNumber: null,
    course: this.courses[0],
  };

  constructor(
    private studentService: StudentService,
    private router: Router,
    private toastService: ToastService
  ) {}

  async onSubmit() {
    try {
      const response = await this.studentService.addStudent(this.student);
      this.toastService.showSuccess('STUDENT_ADDED');
      this.router.navigate(['/students']);
    } catch (error) {
      console.log('Error adding student', error);
    }
  }
}
