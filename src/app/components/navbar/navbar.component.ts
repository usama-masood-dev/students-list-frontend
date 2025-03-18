import { ToastService } from './../../services/toast.service';
import { AuthService } from 'src/app/services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(
    private authService: AuthService,
    private toastService: ToastService
  ) {}

  isLoggedIn = !!localStorage.getItem('token');

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.toastService.showSuccess('LOGOUT_SUCCESS');
  }
}
