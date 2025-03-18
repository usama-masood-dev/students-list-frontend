import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { FormsModule } from '@angular/forms';
import { StudentListComponent } from './students/student-list/student-list.component';
import { StudentAddComponent } from './students/student-add/student-add.component';
import { StudentEditComponent } from './students/student-edit/student-edit.component';
import { StudentDetailsComponent } from './students/student-details/student-details.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    StudentListComponent,
    StudentAddComponent,
    StudentEditComponent,
    StudentDetailsComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    NgxPaginationModule,
    CommonModule,
    MatSnackBarModule,
    MatButtonModule,
    MatTableModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
