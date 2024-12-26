import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailServiceService } from '../../services/email-service.service';
import { ToastServiceService } from '../../services/utilities/toast-service.service';
import { OverlayServiceService } from '../../services/utilities/overlay-service.service';
import { AuthenServiceService } from '../../services/authen-service.service';
import { SprinnerLoadingService } from '../../services/utilities/sprinner-loading.service';

@Component({
  selector: 'app-forgot-passowrd',
  templateUrl: './forgot-passowrd.component.html',
  styleUrls: [
    './forgot-passowrd.component.css',
    '../../../assets/styles/form.css'
  ]
})
export class ForgotPassowrdComponent implements OnInit {

  forgotPasswordForm!: FormGroup;

  // Variable contain status of confirm code button
  isConfirmCodeButtonVisible!: boolean;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private emailService: EmailServiceService,
    private authenService: AuthenServiceService,
    private toastMessageService: ToastServiceService,
    private overlayService: OverlayServiceService,
    private spinnerLoadingService: SprinnerLoadingService,
  ) {
    this.forgotPasswordForm = this.fb.group({
      email: [``, [Validators.required, Validators.email]],
      authenticationCode: [``, [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    const email = sessionStorage.getItem('email_to_forgot_pass') || '';
    if (email) {
      this.forgotPasswordForm.get('email')?.setValue(email);
      this.isConfirmCodeButtonVisible = true;
    } else {
      this.forgotPasswordForm.get('authenticationCode')?.disable();
    }
  }

  onSubmit() {

  }

  // Function to call service to send email code
  public sendCodeToEmail(): void {
    // Show spinner while send code to email of user
    this.spinnerLoadingService.open('Sending code, please wait...');

    // Get email from form
    const email = this.forgotPasswordForm.get('email')?.value;
    if (email) {
      // Active controls of form
      this.forgotPasswordForm.get('authenticationCode')?.enable();
      this.isConfirmCodeButtonVisible = true;

      // Save email to session storage
      sessionStorage.setItem('email_to_forgot_pass', email);

      // Call service to send email
      this.emailService.senCodeToEmail(email).subscribe({
        next: (res) => {
          this.spinnerLoadingService.close();
          this.toastMessageService.showSuccess(res.message);
        },
        error: (err) => {
          this.spinnerLoadingService.close();
          if (err.status === 500) {
            this.toastMessageService.showError(err.message);
          }
        }
      });
    }
  }

  // Function to confirm code
  public confirmCode(): void {
    // Save data to session storage and redirect to reset password form (no verfify)
    if (this.forgotPasswordForm.invalid) {
      return;
    }

    sessionStorage.setItem('code_email', this.forgotPasswordForm.get('authenticationCode')?.value);
    this.router.navigate(['./reset-password']);
  }

}
