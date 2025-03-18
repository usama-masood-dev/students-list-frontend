import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { StudentListComponent } from './students/student-list/student-list.component';
import { StudentEditComponent } from './students/student-edit/student-edit.component';
import { StudentAddComponent } from './students/student-add/student-add.component';
import { StudentDetailsComponent } from './students/student-details/student-details.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'students',
    component: StudentListComponent,
    canActivate: [authGuard],
  },
  {
    path: 'students/add',
    component: StudentAddComponent,
    canActivate: [authGuard],
  },
  {
    path: 'students/edit/:id',
    component: StudentEditComponent,
    canActivate: [authGuard],
  },
  {
    path: 'students/:id',
    component: StudentDetailsComponent,
    canActivate: [authGuard],
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
