import { ToastService } from './../../services/toast.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import axios from 'axios';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  signupForm = new FormGroup({
    fullName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {}

  async onSignup() {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }
    try {
      const { fullName, email, password } = this.signupForm.value;
      const response = await this.authService.signup({
        fullName,
        email,
        password,
      });

      this.toastService.showSuccess('SIGNUP_SUCCESS');
      this.router.navigate(['/students']);
    } catch (error: any) {
      console.log(error.response.status);
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 400) {
          this.signupForm.get('email')?.setErrors({ emailExists: true });
        }
      } else {
        console.log('Signup failed:', error);
        this.toastService.showError('INVALID_DATA');
      }
    }
  }
}
