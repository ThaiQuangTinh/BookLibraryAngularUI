import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastServiceService } from '../../services/utilities/toast-service.service';
import { Router } from '@angular/router';
import { EmailServiceService } from '../../services/email-service.service';
import { OverlayServiceService } from '../../services/utilities/overlay-service.service';
import { AuthenServiceService } from '../../services/authen-service.service';
import { SprinnerLoadingService } from '../../services/utilities/sprinner-loading.service';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: [
    './verify-account.component.css',
    '../../../assets/styles/form.css'
  ]
})
export class VerifyAccountComponent implements OnInit {

  verifyAccountForm!: FormGroup;

  // Variables bellow to save data from token 
  imageUrl!: string;

  fullName!: string;

  email!: string;

  // Variable control status of the confrim code button
  isConfirmCodeButtonVisible: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private emailService: EmailServiceService,
    private authenService: AuthenServiceService,
    private toastMessageService: ToastServiceService,
    private overlayService: OverlayServiceService,
    private spinnerLoadingService: SprinnerLoadingService
  ) {
    // Initial form
    this.verifyAccountForm = this.fb.group({
      activationCode: [``, [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    // Disable input to enter code
    this.verifyAccountForm.get('activationCode')?.disable();

    // Get data of token from local storage
    const image_url = sessionStorage.getItem('image_url');
    const fullname = sessionStorage.getItem('fullname');
    const email = sessionStorage.getItem('email');

    // Set imgae, fullname, .. for UI
    if (fullname && email) {
      this.imageUrl = `http://localhost:8100${image_url}`.trim();
      this.fullName = fullname;
      this.email = email;
    }
  }

  // Function to send code to email of user, purpose to verify account
  public onSendCodeToVerifyAcc(): void {
    // Handle form control
    this.verifyAccountForm.get('activationCode')?.enable();
    this.isConfirmCodeButtonVisible = true;

    // Show spinner loading while send code to email of user
    this.spinnerLoadingService.open('Sending code, please wait');

    // Call service to send code
    this.emailService.senCodeToEmail(this.email).subscribe({
      next: (res) => {
        this.spinnerLoadingService.close();
        this.toastMessageService.showSuccess(res.message);
      },
      error: (err) => {
        if (err.status === 500) {
          this.spinnerLoadingService.close();
          this.toastMessageService.showError(err.message);
        }
      }
    })
  }

  // Call service to verify code
  public validateCodeToVerifyAcc(): void {
    // Get necessary data 
    const code = this.verifyAccountForm?.get('activationCode')?.value.trim();
    const authenToken = sessionStorage.getItem('authen_token');

    // Show spinner loading while verify code
    this.spinnerLoadingService.open('Validating code, please wait...');

    // Check code and authen token is valid or not
    if (code && authenToken) {
      // Call service to active account
      this.authenService.activeAccount(code, authenToken).subscribe({
        next: (res) => {
          this.spinnerLoadingService.close();

          // Get new token and update data into session storage
          const decodedData = this.authenService.decodeToken(res!.token);
          this.authenService.saveToken(res!.token, decodedData);

          // Navigate base on role
          switch (decodedData.roleId) {
            case 1: {
              this.navigateTo('./admin-dashboard');
              break;
            }
            case 2: {
              this.navigateTo('./librarian-dashboard/book-management');
              break;
            }
            case 3: {
              this.navigateTo('./reader-dashboard/home');
              break;
            }
          }

          this.toastMessageService.showSuccess('Verify account successfully');
        },
        error: (err) => {
          this.spinnerLoadingService.close();

          // Handle with status with response is returned from server
          if (err.status === 404) {
            this.toastMessageService.showError('Code is invalid!');
          } else if (err.status === 401) {
            this.toastMessageService.showError('Unauthorized');
          }
        }
      })
    }
  }

  // Function to navigate to component 
  private navigateTo(url: string) {
    this.router.navigate([`${url}`]).then(() => {
      window.location.reload()
    });
  }

}
