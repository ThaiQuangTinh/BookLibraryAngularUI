import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastServiceService } from '../../services/utilities/toast-service.service';
import { AuthenServiceService } from '../../services/authen-service.service';
import { Router } from '@angular/router';
import { OverlayServiceService } from '../../services/utilities/overlay-service.service';
import { SpinnerComponent } from '../spinner/spinner.component';
import { SprinnerLoadingService } from '../../services/utilities/sprinner-loading.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: [
    './reset-password.component.css',
    '../../../assets/styles/form.css'
  ]
})
export class ResetPasswordComponent {

  resetPasswordForm!: FormGroup;

  // Variables to show or hide password of two input control
  passwordVisible: boolean = false;

  repasswordVisible: boolean = false;

  constructor(
    private fb: FormBuilder,
    private toastMessageService: ToastServiceService,
    private authenService: AuthenServiceService,
    private router: Router,
    private overlayService: OverlayServiceService,
    private spinnerLoadingService: SprinnerLoadingService
  ) {
    // Initial form
    this.resetPasswordForm = this.fb.group({
      password: [``, [Validators.required, Validators.minLength(7)]],
      repassword: [``, [Validators.required, Validators.minLength(7)]]
    });
  }

  // Function to toggle status of password control
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  // Function to toggle status of re-password control
  toggleRePasswordVisibility() {
    this.repasswordVisible = !this.repasswordVisible;
  }

  // Function to check passwor dis match or not
  public isPasswordMatch(): boolean {
    // Get data from form
    const password = this.resetPasswordForm.get('password')?.value;
    const repassword = this.resetPasswordForm.get('repassword')?.value;

    return (password == repassword) ? true : false;
  }

  // Function to confirm reset password
  public confirmResetPassword(): void {
    // Check password is match or not
    if (!this.isPasswordMatch()) {
      this.toastMessageService.showWarning('Password does not match');
      return;
    }

    // Get necessary data form session storage
    const email = sessionStorage.getItem('email_to_forgot_pass');
    const code = sessionStorage.getItem('code_email');
    const newPassword = this.resetPasswordForm.get('password')?.value;

    // Check email and code is valid or not
    if (email && code) {
      // Call service to reset password
      this.authenService.resetPassword(code, email, newPassword).subscribe({
        next: (res) => {
          // Cleaer all data on session storage
          sessionStorage.removeItem('email_to_forgot_pass');
          sessionStorage.removeItem('code_email');

          // Show toast message and necessary notification
          this.toastMessageService.showSuccess(res.message);
          this.spinnerLoadingService.open('Validating in, please wait...');

          setTimeout(() => {
            this.spinnerLoadingService.close();
            this.router.navigate(['./login']);
          }, 2000);
        },
        error: (err) => {
          // Handle when error
          this.router.navigate(['./forgot-password']);
          this.toastMessageService.showError('Code is invalid');
        }
      });
    }

  }

}
