import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StudentService } from 'src/app/services/student.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
})
export class StudentListComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = [
    'index',
    'fullName',
    'fatherName',
    'contactNumber',
    'course',
    'actions',
  ];

  dataSource = new MatTableDataSource<any>();
  students: any[] = [];
  totalStudents = 0;
  page = 1;
  limit = 5;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private studentService: StudentService,
    private toastService: ToastService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.loadStudents();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  async loadStudents() {
    try {
      const response = await this.studentService.getStudents(
        this.page,
        this.limit
      );

      this.students = response.students;
      this.dataSource = new MatTableDataSource(this.students);
      this.totalStudents = response.totalStudents;

      setTimeout(() => {
        if (this.paginator && this.sort) {
          this.dataSource.sort = this.sort;
        }
      });
    } catch (error) {
      console.log('Failed to load students', error);
    }
  }

  onPageChange(event: any) {
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;
    this.loadStudents();
  }

  async deleteStudent(id: string) {
    if (confirm('Are you sure you want to delete this student data?')) {
      try {
        await this.studentService.deleteStudent(id);
        this.students = this.students.filter((student) => student._id !== id);
        this.dataSource.data = this.students;
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

  // Search Function
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
