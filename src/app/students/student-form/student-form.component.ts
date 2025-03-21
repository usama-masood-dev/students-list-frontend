import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss'],
})
export class StudentFormComponent implements OnInit {
  courses = [
    'Web Development',
    'Data Science',
    'Machine Learning',
    'UI UX Design',
  ];

  studentId: string | null = null;

  studentForm = new FormGroup({
    fullName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    fatherName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    contactNumber: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]{10,15}$/),
    ]),
    course: new FormControl(this.courses[0], [Validators.required]),
    updated_at: new FormControl(''),
  });

  constructor(
    private studentService: StudentService,
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.studentId = this.route.snapshot.paramMap.get('id');
    if (this.studentId) {
      this.loadStudentData();
    }
  }

  async loadStudentData() {
    try {
      const student = await this.studentService.getStudentById(this.studentId!);
      this.studentForm.setValue({
        fullName: student.fullName,
        fatherName: student.fatherName,
        contactNumber: student.contactNumber,
        course: student.course,
        updated_at: student.updated_at || Date.now().toString(),
      });
    } catch (error) {
      console.error('Error loading student data', error);
    }
  }

  async onSubmit() {
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
      return;
    }

    try {
      if (this.studentId) {
        this.studentForm.patchValue({ updated_at: Date.now().toString() });

        await this.studentService.editStudent(
          this.studentId,
          this.studentForm.value
        );
        this.toastService.showSuccess('STUDENT_UPDATED');
      } else {
        const studentData = {
          ...this.studentForm.value,
          created_at: Date.now().toString(),
          updated_at: Date.now().toString(),
        };

        await this.studentService.addStudent(studentData);
        this.toastService.showSuccess('STUDENT_ADDED');
      }

      this.router.navigate(['/students']);
    } catch (error) {
      console.error('Error saving student:', error);
      this.toastService.showError('INVALID_DATA');
    }
  }
}
