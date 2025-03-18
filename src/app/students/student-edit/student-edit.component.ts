import { ToastService } from './../../services/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from './../../services/student.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.scss'],
})
export class StudentEditComponent implements OnInit {
  courses = [
    'Web Development',
    'Data Science',
    'Machine Learning',
    'UI UX Design',
  ];

  studentId!: string;

  student = {
    fullName: '',
    fatherName: '',
    contactNumber: Number,
    course: '',
  };

  constructor(
    private studentService: StudentService,
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.studentId = this.route.snapshot.paramMap.get('id')!;
    this.fetchStudentData();
  }

  async fetchStudentData() {
    try {
      this.student = await this.studentService.getStudentById(this.studentId);
    } catch (error) {
      console.log('Error fetching student data', error);
    }
  }

  async onSubmit() {
    try {
      await this.studentService.editStudent(this.studentId, this.student);

      this.toastService.showSuccess('STUDENT_UPDATED');
      // Navigate back to student list
      this.router.navigate(['/students']);
    } catch (error) {
      console.error('Error updating student:', error);
    }
  }
}
