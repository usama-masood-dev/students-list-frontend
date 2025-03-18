import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss'],
})
export class StudentDetailsComponent implements OnInit {
  studentId!: string;
  student: any = {};

  constructor(
    private studentService: StudentService,
    private router: Router,
    private route: ActivatedRoute
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

  backToList() {
    this.router.navigate(['/students']);
  }
}
