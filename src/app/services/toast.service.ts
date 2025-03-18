import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TOAST_MESSAGES } from '../utils/messages';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private snackbar: MatSnackBar) {}

  showSuccess(messageKey: keyof typeof TOAST_MESSAGES.SUCCESS) {
    this.snackbar.open(TOAST_MESSAGES.SUCCESS[messageKey], 'Close', {
      duration: 3000,
      panelClass: ['toast-success'],
    });
  }

  showError(messageKey: keyof typeof TOAST_MESSAGES.ERROR) {
    this.snackbar.open(TOAST_MESSAGES.ERROR[messageKey], 'Close', {
      duration: 3000,
      panelClass: ['toast-error'],
    });
  }

  showInfo(messageKey: keyof typeof TOAST_MESSAGES.INFO) {
    this.snackbar.open(TOAST_MESSAGES.INFO[messageKey], 'Close', {
      duration: 3000,
      panelClass: ['toast-info'],
    });
  }
}
