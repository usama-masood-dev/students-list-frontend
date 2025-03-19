import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from './../../services/toast.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  isLoggedIn = false;
  isSignupPage = false;
  isLoginPage = false;

  constructor(
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router
  ) {
    // Check login status
    this.isLoggedIn = !!localStorage.getItem('token');

    // Detect route changes
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isSignupPage = event.url === '/signup';
        this.isLoginPage = event.url === '/login';
      }
    });
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.toastService.showSuccess('LOGOUT_SUCCESS');
    this.router.navigate(['/login']);
  }
}
