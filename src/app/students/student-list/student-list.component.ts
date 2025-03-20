import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { StudentService } from 'src/app/services/student.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
})
export class StudentListComponent implements OnInit {
  displayedColumns: string[] = [
    'index',
    'fullName',
    'fatherName',
    'contactNumber',
    'course',
    'actions',
  ];

  dataSource: any;
  students: any[] = [];
  totalStudents = 0;
  page = 1;
  limit = 5;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  constructor(
    private studentService: StudentService,
    private toastService: ToastService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.loadStudents();
  }

  async loadStudents() {
    try {
      const response = await this.studentService.getStudents(
        this.page,
        this.limit
      );
      this.dataSource = response.students;
      this.students = response.students;
      this.totalStudents = response.totalStudents;
      this.dataSource.paginator = this.paginator;
    } catch (error) {
      console.log('Failed to load students', error);
    }
  }

  onPageChange(event: any) {
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;

    this.loadStudents();
  }

  // Delete student
  async deleteStudent(id: string) {
    if (confirm('Are you sure you want to delete this student data?')) {
      try {
        await this.studentService.deleteStudent(id);
        this.dataSource = this.dataSource.filter(
          (student: any) => student._id !== id
        );
        this.toastService.showSuccess('STUDENT_DELETED');
        this.loadStudents();
      } catch (error) {
        console.log('Error deleting the student', error);
        this.toastService.showError('STUDENT_DELETE_FAILED');
      }
    }
  }

  get pageIndex(): number {
    return this.paginator ? this.paginator.pageIndex : 0;
  }

  get pageSize(): number {
    return this.paginator ? this.paginator.pageSize : 10;
  }
}
