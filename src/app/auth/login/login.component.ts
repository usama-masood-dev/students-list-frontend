import { ToastService } from './../../services/toast.service';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {}

  async onlogin() {
    try {
      const response = await this.authService.login({
        email: this.email,
        password: this.password,
      });

      localStorage.setItem('token', response.token);
      this.toastService.showSuccess('LOGIN_SUCCESS');

      this.router.navigate(['/students']);
    } catch (error) {
      console.log('Login failed:', error);
    }
  }
}
