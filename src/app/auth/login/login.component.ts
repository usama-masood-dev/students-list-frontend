import { ToastService } from './../../services/toast.service';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
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

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/students']);
      this.toastService.showInfo('ALREADY_LOGIN');
    }
  }

  async onlogin() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    try {
      const { email, password } = this.loginForm.value;

      const response = await this.authService.login({ email, password });

      localStorage.setItem('token', response.token);
      this.toastService.showSuccess('LOGIN_SUCCESS');

      this.router.navigate(['/students']);
    } catch (error) {
      console.log('Login failed:', error);
      this.toastService.showError('LOGIN_FAILED');
    }
  }
}
