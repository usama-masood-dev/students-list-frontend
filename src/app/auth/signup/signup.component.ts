import { ToastService } from './../../services/toast.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  fullName = '';
  email = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {}

  async onSignup() {
    try {
      const response = await this.authService.signup({
        fullName: this.fullName,
        email: this.email,
        password: this.password,
      });

      this.toastService.showSuccess('SIGNUP_SUCCESS');
      this.router.navigate(['/login']);
    } catch (error) {
      console.log('Signup failed:', error);
    }
  }
}
